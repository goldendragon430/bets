/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

import { getActiveTotalNftStakedAmount, getNftStakedStatus } from '../services';
import { BattleInfo, NFTMetadata } from '../types';

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

export const getBattleInitInfo = async (betContract: ethers.Contract | null) => {
  const getRakePercentage = async () => {
    if (betContract) {
      try {
        const rakePercent = await betContract.rakePercentage();
        return Number(rakePercent);
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };
  const getNftStakersPercentage = async () => {
    if (betContract) {
      try {
        const nftStakersPercent = await betContract.nftStakersPercentage();
        return Number(nftStakersPercent);
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };

  const res = await Promise.all([getRakePercentage(), getNftStakersPercentage()]);
  return {
    rakePercentage: res[0],
    nftStakersPercentage: res[1],
  };
};

export const getBattleBetInfo = async (betContract: ethers.Contract | null, battleInfo: BattleInfo | null) => {
  const getTotalBetAmountA = async () => {
    if (betContract && battleInfo) {
      try {
        const totalAmountA = await betContract.totalBettedAmountA(battleInfo.battleId);
        return Number(ethers.utils.formatEther(totalAmountA));
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };
  const getTotalBetAmountB = async () => {
    if (betContract && battleInfo) {
      try {
        const totalAmountB = await betContract.totalBettedAmountB(battleInfo.battleId);
        return Number(ethers.utils.formatEther(totalAmountB));
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };
  const getTotalNftStaked = async () => {
    if (battleInfo) {
      try {
        const res = await getActiveTotalNftStakedAmount(battleInfo.id);
        if (res.data.data) {
          return {
            totalNftStakedA: Number(res.data.data.collectionA),
            totalNftStakedB: Number(res.data.data.collectionB),
          };
        }
      } catch (err: any) {
        console.error(err.message);
        return { totalNftStakedA: undefined, totalNftStakedB: undefined };
      }
    }
    return { totalNftStakedA: 0, totalNftStakedB: 0 };
  };
  const getWinnerSet = async () => {
    if (betContract && battleInfo) {
      try {
        const _winnerSet = await betContract.winnerSet(battleInfo.battleId);
        return _winnerSet;
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return false;
    }
  };
  const getWinner = async () => {
    if (betContract && battleInfo) {
      try {
        const _winner = await betContract.winner(battleInfo.battleId);
        return _winner;
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return false;
    }
  };

  const res = await Promise.all([
    getTotalBetAmountA(),
    getTotalBetAmountB(),
    getTotalNftStaked(),
    getWinnerSet(),
    getWinner(),
  ]);
  return {
    totalBetAmountA: res[0],
    totalBetAmountB: res[1],
    totalNftStakedA: res[2].totalNftStakedA,
    totalNftStakedB: res[2].totalNftStakedB,
    winnerSet: res[3],
    winner: res[4],
  };
};

export const getUserBetInfo = async (
  betContract: ethers.Contract | null,
  account: Maybe<string>,
  battleInfo: BattleInfo | null
) => {
  const getUserBetAmountA = async () => {
    if (betContract && account && battleInfo) {
      try {
        const userAmountA = await betContract.getUserBettedAmount(battleInfo.battleId, account, false);
        return Number(ethers.utils.formatEther(userAmountA));
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };
  const getUserBetAmountB = async () => {
    if (betContract && account && battleInfo) {
      try {
        const userAmountB = await betContract.getUserBettedAmount(battleInfo.battleId, account, true);
        return Number(ethers.utils.formatEther(userAmountB));
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };

  const res = await Promise.all([getUserBetAmountA(), getUserBetAmountB()]);
  return {
    userBetAmountA: res[0],
    userBetAmountB: res[1],
  };
};

export const getUserNftList = async (account: Maybe<string>, battleInfo: BattleInfo | null) => {
  const getStakedNfts = async (nfts: NFTMetadata[], contractAddresses: string) => {
    let result = nfts;
    try {
      const res = await getNftStakedStatus(
        nfts.map((item) => Number(item.tokenId)),
        contractAddresses,
        battleInfo?.id || ''
      );
      result = nfts.map((item, index) => ({ ...item, staked: res.data.data[index].status }));
    } catch (err: any) {
      console.error(err);
    }
    return result;
  };

  if (account && battleInfo) {
    try {
      const nfts = await alchemy.nft.getNftsForOwner(account, {
        contractAddresses: [battleInfo.projectL.contract, battleInfo.projectR.contract],
      });
      const nftsA = await getStakedNfts(
        nfts.ownedNfts.filter(
          (item) => item.contract.address.toLowerCase() === battleInfo.projectL.contract.toLowerCase()
        ),
        battleInfo.projectL.contract
      );
      const nftsB = await getStakedNfts(
        nfts.ownedNfts.filter(
          (item) => item.contract.address.toLowerCase() === battleInfo.projectR.contract.toLowerCase()
        ),
        battleInfo.projectR.contract
      );

      return { userNftListA: nftsA, userNftListB: nftsB };
    } catch (e) {
      console.error(e);
      return { userNftListA: undefined, userNftListB: undefined };
    }
  } else {
    return { userNftListA: [], userNftListB: [] };
  }
};
