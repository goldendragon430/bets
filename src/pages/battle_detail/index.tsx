/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

import { useWallet } from '../../contexts/wallet_context';
import { useBetContract } from '../../hooks/useContract';
import { getActiveTotalNftStakedAmount, getBattleById, getNftStakedStatus } from '../../services';
import { BattleInfo, NFTMetadata } from '../../types';
import BattlePage from './battle';

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const BattleDetail: React.FC = () => {
  const { battleId } = useParams();
  const { account, updateBalance } = useWallet();

  const [battleInfo, setBattleInfo] = useState<BattleInfo | null>(null);
  const [endTime, setEndTime] = useState(0);
  const [rakePercentage, setRakePercentage] = useState(0);
  const [nftStakersPercentage, setNftStakersPercentage] = useState(0);
  const [totalBetAmountA, setTotalBetAmountA] = useState(0);
  const [totalBetAmountB, setTotalBetAmountB] = useState(0);
  const [totalNftStakedA, setTotalNftStakedA] = useState(0);
  const [totalNftStakedB, setTotalNftStakedB] = useState(0);
  const [userBetAmountA, setUserBetAmountA] = useState(0);
  const [userBetAmountB, setUserBetAmountB] = useState(0);
  const [userNftListA, setUserNftListA] = useState<NFTMetadata[]>([]);
  const [userNftListB, setUserNftListB] = useState<NFTMetadata[]>([]);
  const [claimAmount, setClaimAmount] = useState(0);
  const [winnerSet, setWinnerSet] = useState(false);
  const [winner, setWinner] = useState(false);

  const betContract = useBetContract(battleInfo?.betContractAddress);

  const updateTimer = useRef<NodeJS.Timeout | null>(null);

  const updateBattleInfo = useCallback(async () => {
    try {
      if (battleId) {
        const info = await getBattleById(battleId);
        setBattleInfo(info.data.data as BattleInfo);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [battleId]);

  useEffect(() => {
    updateBattleInfo();
  }, [battleId]);

  const updateTotalInfo = () => {
    updateBalance();
    updateBetInfo();
    updateUserInfo();
    updateUserNftList();

    if (updateTimer.current) {
      clearTimeout(updateTimer.current);
    }
    updateTimer.current = setTimeout(() => {
      updateTotalInfo();
    }, 10000);
  };

  const updateInitInfo = useCallback(async () => {
    const getEndTime = async () => {
      if (betContract) {
        try {
          const betEndTime = await betContract.betEndTime();
          setEndTime(Number(betEndTime));
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setEndTime(0);
        }
      } else {
        setEndTime(0);
      }
    };
    const getRakePercentage = async () => {
      if (betContract) {
        try {
          const rakePercent = await betContract.rakePercentage();
          setRakePercentage(Number(rakePercent));
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setRakePercentage(0);
        }
      } else {
        setRakePercentage(0);
      }
    };
    const getNftStakersPercentage = async () => {
      if (betContract) {
        try {
          const nftStakersPercent = await betContract.nftStakersPercentage();
          setNftStakersPercentage(Number(nftStakersPercent));
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setNftStakersPercentage(0);
        }
      } else {
        setNftStakersPercentage(0);
      }
    };

    getEndTime();
    getRakePercentage();
    getNftStakersPercentage();
  }, [betContract]);

  const updateBetInfo = useCallback(async () => {
    const getTotalBetAmountA = async () => {
      if (betContract) {
        try {
          const totalAmountA = await betContract.totalBettedAmountA();
          setTotalBetAmountA(Number(ethers.utils.formatEther(totalAmountA)));
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setTotalBetAmountA(0);
        }
      } else {
        setTotalBetAmountA(0);
      }
    };
    const getTotalBetAmountB = async () => {
      if (betContract) {
        try {
          const totalAmountB = await betContract.totalBettedAmountB();
          setTotalBetAmountB(Number(ethers.utils.formatEther(totalAmountB)));
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setTotalBetAmountB(0);
        }
      } else {
        setTotalBetAmountB(0);
      }
    };
    const getTotalNftStaked = async () => {
      try {
        const res = await getActiveTotalNftStakedAmount(battleId || '');
        if (res.data.data) {
          setTotalNftStakedA(Number(res.data.data.collectionA));
          setTotalNftStakedB(Number(res.data.data.collectionB));
          return;
        }
      } catch (err: any) {
        toast.error(err.message);
      }
      setTotalNftStakedA(0);
      setTotalNftStakedB(0);
    };
    const getWinnerSet = async () => {
      if (betContract) {
        try {
          const _winnerSet = await betContract.winnerSet();
          setWinnerSet(_winnerSet);
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setWinnerSet(false);
        }
      } else {
        setWinnerSet(false);
      }
    };
    const getWinner = async () => {
      if (betContract) {
        try {
          const _winner = await betContract.winner();
          setWinner(_winner);
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setWinner(false);
        }
      } else {
        setWinner(false);
      }
    };

    getTotalBetAmountA();
    getTotalBetAmountB();
    getTotalNftStaked();
    getWinnerSet();
    getWinner();
  }, [betContract]);

  useEffect(() => {
    updateInitInfo();
    updateBetInfo();
  }, [betContract]);

  const updateUserInfo = useCallback(async () => {
    const getUserBetAmountA = async () => {
      if (betContract && account) {
        try {
          const userAmountA = await betContract.getUserBettedAmount(account, false);
          setUserBetAmountA(Number(ethers.utils.formatEther(userAmountA)));
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setUserBetAmountA(0);
        }
      } else {
        setUserBetAmountA(0);
      }
    };
    const getUserBetAmountB = async () => {
      if (betContract && account) {
        try {
          const userAmountB = await betContract.getUserBettedAmount(account, true);
          setUserBetAmountB(Number(ethers.utils.formatEther(userAmountB)));
        } catch (err: any) {
          toast.error(err.reason || err.error?.message || err.message);
          setUserBetAmountB(0);
        }
      } else {
        setUserBetAmountB(0);
      }
    };
    getUserBetAmountA();
    getUserBetAmountB();
  }, [account, betContract]);

  useEffect(() => {
    updateUserInfo();
  }, [betContract, account]);

  const updateUserNftList = useCallback(async () => {
    const getStakedNfts = async (nfts: NFTMetadata[], contractAddresses: string) => {
      let result = nfts;
      try {
        const res = await getNftStakedStatus(
          nfts.map((item) => Number(item.tokenId)),
          contractAddresses,
          battleId || ''
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

        setUserNftListA(nftsA);
        setUserNftListB(nftsB);
      } catch (e) {
        console.error(e);
        setUserNftListA([]);
        setUserNftListB([]);
      }
    } else {
      setUserNftListA([]);
      setUserNftListB([]);
    }
  }, [account, battleInfo]);

  useEffect(() => {
    updateUserNftList();
  }, [account, battleInfo]);

  const getRewardPotential = (side: boolean) => {
    const totalAmount = totalBetAmountA + totalBetAmountB;

    const rakeReward = (totalAmount * rakePercentage) / 1e4;
    const loserAmount = side ? totalBetAmountA : totalBetAmountB;
    const nftStakersReward = (loserAmount * (1e4 - rakePercentage) * nftStakersPercentage) / 1e8;
    const betsReward = totalAmount - rakeReward - nftStakersReward;

    if (!side) {
      return totalBetAmountA > 0 ? betsReward / totalBetAmountA : 0;
    }
    return totalBetAmountB > 0 ? betsReward / totalBetAmountB : 0;
  };

  const getChance = (side: boolean) => {
    const chanceA = 0 * 100 + totalBetAmountA * 1000;
    const chanceB = 0 * 100 + totalBetAmountB * 1000;
    const totalChance = chanceA + chanceB;

    if (!side) {
      return chanceA > 0 ? chanceA / totalChance : 0;
    }
    return chanceB > 0 ? chanceB / totalChance : 0;
  };

  const placeBet = async (amount: number, side: boolean) => {
    try {
      if (betContract && account) {
        await betContract.estimateGas.placeBet(side, account, { value: ethers.utils.parseEther(String(amount)) });
        const tx = await betContract.placeBet(side, account, { value: ethers.utils.parseEther(String(amount)) });
        const receipt = await tx.wait();
        if (receipt.status) {
          updateTotalInfo();
          return true;
        }
        toast.error('Place bet error');
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
    }
    return false;
  };

  const stakeNft = async (tokenIds: number[], side: boolean) => {
    try {
      if (betContract && account) {
        let tx;
        if (!side) {
          await betContract.estimateGas.stakeNftA(tokenIds);
          tx = await betContract.stakeNftA(tokenIds);
        } else {
          await betContract.estimateGas.stakeNftB(tokenIds);
          tx = await betContract.stakeNftB(tokenIds);
        }
        const receipt = await tx.wait();
        if (receipt.status) {
          updateTotalInfo();
          return true;
        }
        toast.error('NFT Staking Error');
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
    }
    return false;
  };

  const updateClaimAmount = async () => {
    if (winnerSet) {
      try {
        if (betContract && account) {
          const amount = await betContract.getClaimableAmount(account);
          setClaimAmount(Number(ethers.utils.formatEther(amount)));
        } else {
          setClaimAmount(0);
        }
      } catch (err: any) {
        toast.error(err.reason || err.error?.message || err.message);
        setClaimAmount(0);
      }
    } else {
      setClaimAmount(0);
    }
  };

  const claim = async () => {
    try {
      if (betContract && account) {
        await betContract.estimateGas.claimReward();
        const tx = await betContract.claimReward();
        const receipt = await tx.wait();
        if (receipt.status) {
          updateTotalInfo();
          toast.success('Claim Success');
        }
        toast.error('Claim Error');
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
    }
  };

  return (
    <BattlePage
      battleInfo={battleInfo}
      claim={claim}
      claimAmount={claimAmount}
      endTime={endTime}
      getChance={getChance}
      getRewardPotential={getRewardPotential}
      placeBet={placeBet}
      stakeNft={stakeNft}
      totalBetAmountA={totalBetAmountA}
      totalBetAmountB={totalBetAmountB}
      totalNftStakedA={totalNftStakedA}
      totalNftStakedB={totalNftStakedB}
      updateBetInfo={updateBetInfo}
      updateClaimAmount={updateClaimAmount}
      updateUserInfo={updateUserInfo}
      updateUserNftList={updateUserNftList}
      userBetAmountA={userBetAmountA}
      userBetAmountB={userBetAmountB}
      userNftListA={userNftListA}
      userNftListB={userNftListB}
      winner={winner}
      winnerSet={winnerSet}
    />
  );
};

export default BattleDetail;
