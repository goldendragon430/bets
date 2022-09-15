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
  network: process.env.REACT_APP_NETWORK === 'mainnet' ? Network.ETH_MAINNET : Network.ETH_GOERLI,
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
        const totalAmountA = await betContract.totalBettedAmount(battleInfo.battleId, false);
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
        const totalAmountB = await betContract.totalBettedAmount(battleInfo.battleId, true);
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
  const getRefundStatus = async () => {
    if (betContract && battleInfo) {
      try {
        const _refundStatus = await betContract.refundStatus(battleInfo.battleId);
        return _refundStatus;
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
    getRefundStatus(),
  ]);
  return {
    totalBetAmountA: res[0],
    totalBetAmountB: res[1],
    totalNftStakedA: res[2].totalNftStakedA,
    totalNftStakedB: res[2].totalNftStakedB,
    winnerSet: res[3],
    winner: res[4],
    refundStatus: res[5],
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
        const userAmountA = await betContract.betAmount(battleInfo.battleId, account, false);
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
        const userAmountB = await betContract.betAmount(battleInfo.battleId, account, true);
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
  const getStakedNfts = async (nfts: NFTMetadata[], side: boolean) => {
    let result = nfts;
    try {
      const res = await getNftStakedStatus(
        nfts.map((item) => Number(item.tokenId)),
        side,
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
        false
      );
      const nftsB = await getStakedNfts(
        nfts.ownedNfts.filter(
          (item) => item.contract.address.toLowerCase() === battleInfo.projectR.contract.toLowerCase()
        ),
        true
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

export const getUserClaimInfo = async (
  betContract: ethers.Contract | null,
  account: Maybe<string>,
  battleInfo: BattleInfo | null
) => {
  const getClaimableAmount = async () => {
    if (betContract && account && battleInfo) {
      try {
        const amount = await betContract.getClaimableAmount(battleInfo.battleId, account);
        return Number(ethers.utils.formatEther(amount));
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };
  const getClaimableABPAmount = async () => {
    if (betContract && account && battleInfo) {
      try {
        const amount = await betContract.getClaimableABPAmount(battleInfo.battleId, account);
        return Number(ethers.utils.formatEther(amount));
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };
  const getRefundClaimStatus = async () => {
    if (betContract && account && battleInfo) {
      try {
        const amount = await betContract.refundClaimStatus(battleInfo.battleId, account);
        return Number(ethers.utils.formatEther(amount));
      } catch (err: any) {
        console.error(err.reason || err.error?.message || err.message);
        return undefined;
      }
    } else {
      return 0;
    }
  };

  const res = await Promise.all([getClaimableAmount(), getClaimableABPAmount(), getRefundClaimStatus()]);
  return {
    claimAmount: res[0],
    claimABPAmount: res[1],
    refundClaimStatus: res[2],
  };
};

export const getChanceValue = (
  totalBetAmountA: number,
  totalBetAmountB: number,
  totalNftStakedA: number,
  totalNftStakedB: number,
  side: boolean
) => {
  const chanceA = totalNftStakedA * 100 + totalBetAmountA * 1000;
  const chanceB = totalNftStakedB * 100 + totalBetAmountB * 1000;
  const totalChance = chanceA + chanceB;

  if (!side) {
    return chanceA > 0 ? chanceA / totalChance : 0;
  }
  return chanceB > 0 ? chanceB / totalChance : 0;
};
