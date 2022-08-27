/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ethers } from 'ethers';

import { useWallet } from '../../contexts/wallet_context';
import { useBetContract } from '../../hooks/useContract';
import { getBattleById } from '../../services';
import { BattleInfo, NFTMetadata } from '../../types';
import { getBattleBetInfo, getBattleInitInfo, getUserBetInfo, getUserNftList } from '../../utils/battle';
import BattlePage from './battle';

const BattleDetail: React.FC = () => {
  const { battleId } = useParams();
  const { account, updateBalance } = useWallet();

  const [battleInfo, setBattleInfo] = useState<BattleInfo | null>(null);
  const [startTime, setStartTime] = useState(0);
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

  const betContract = useBetContract();

  const updateTimer = useRef<NodeJS.Timeout | null>(null);

  const updateBattleInfo = useCallback(async () => {
    try {
      if (battleId) {
        const info = await getBattleById(battleId);
        setBattleInfo(info.data.data as BattleInfo);
      }
    } catch (err: any) {
      console.error(err.message);
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
    const res = await getBattleInitInfo(betContract);

    if (res.startTime !== undefined) {
      setStartTime(res.startTime);
    }
    if (res.endTime !== undefined) {
      setEndTime(res.endTime);
    }
    if (res.rakePercentage !== undefined) {
      setRakePercentage(res.rakePercentage);
    }
    if (res.nftStakersPercentage !== undefined) {
      setNftStakersPercentage(res.nftStakersPercentage);
    }
  }, [betContract]);

  const updateBetInfo = useCallback(async () => {
    const res = await getBattleBetInfo(betContract, battleId);

    if (res.totalBetAmountA !== undefined) {
      setTotalBetAmountA(res.totalBetAmountA);
    }
    if (res.totalBetAmountB !== undefined) {
      setTotalBetAmountB(res.totalBetAmountB);
    }
    if (res.totalNftStakedA !== undefined) {
      setTotalNftStakedA(res.totalNftStakedA);
    }
    if (res.totalNftStakedB !== undefined) {
      setTotalNftStakedB(res.totalNftStakedB);
    }
    if (res.winnerSet !== undefined) {
      setWinnerSet(res.winnerSet);
    }
    if (res.winner !== undefined) {
      setWinner(res.winner);
    }
  }, [betContract]);

  useEffect(() => {
    updateInitInfo();
    updateBetInfo();
  }, [betContract]);

  const updateUserInfo = useCallback(async () => {
    const res = await getUserBetInfo(betContract, account);

    if (res.userBetAmountA !== undefined) {
      setUserBetAmountA(res.userBetAmountA);
    }
    if (res.userBetAmountB !== undefined) {
      setUserBetAmountB(res.userBetAmountB);
    }
  }, [account, betContract]);

  useEffect(() => {
    updateUserInfo();
  }, [betContract, account]);

  const updateUserNftList = useCallback(async () => {
    const res = await getUserNftList(account, battleInfo);

    if (res.userNftListA !== undefined) {
      setUserNftListA(res.userNftListA);
    }
    if (res.userNftListB !== undefined) {
      setUserNftListB(res.userNftListB);
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

  const getChance = useCallback(
    (side: boolean) => {
      const chanceA = totalNftStakedA * 100 + totalBetAmountA * 1000;
      const chanceB = totalNftStakedB * 100 + totalBetAmountB * 1000;
      const totalChance = chanceA + chanceB;

      if (!side) {
        return chanceA > 0 ? chanceA / totalChance : 0;
      }
      return chanceB > 0 ? chanceB / totalChance : 0;
    },
    [totalBetAmountA, totalBetAmountB, totalNftStakedA, totalNftStakedB]
  );

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
        console.error(err.reason || err.error?.message || err.message);
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
      startTime={startTime}
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
