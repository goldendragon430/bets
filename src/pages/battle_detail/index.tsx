/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
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

  const updateInitInfo = useCallback(async () => {
    const res = await getBattleInitInfo(betContract);

    if (res.rakePercentage !== undefined) {
      setRakePercentage(res.rakePercentage);
    }
    if (res.nftStakersPercentage !== undefined) {
      setNftStakersPercentage(res.nftStakersPercentage);
    }
  }, [betContract]);

  useEffect(() => {
    updateInitInfo();
  }, [betContract]);

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

  const updateBetInfo = useCallback(async () => {
    const res = await getBattleBetInfo(betContract, battleInfo);

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
  }, [betContract, battleInfo]);

  useEffect(() => {
    updateBetInfo();
  }, [betContract, battleInfo]);

  const updateUserInfo = useCallback(async () => {
    const res = await getUserBetInfo(betContract, account, battleInfo);

    if (res.userBetAmountA !== undefined) {
      setUserBetAmountA(res.userBetAmountA);
    }
    if (res.userBetAmountB !== undefined) {
      setUserBetAmountB(res.userBetAmountB);
    }
  }, [account, betContract, battleInfo]);

  useEffect(() => {
    updateUserInfo();
  }, [account, betContract, battleInfo]);

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
      if (betContract && account && battleInfo) {
        await betContract.estimateGas.placeBet(battleInfo.battleId, side, account, {
          value: ethers.utils.parseEther(String(amount)),
        });
        const tx = await betContract.placeBet(battleInfo.battleId, side, account, {
          value: ethers.utils.parseEther(String(amount)),
        });
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
      if (betContract && account && battleInfo) {
        let tx;
        if (!side) {
          await betContract.estimateGas.stakeNftA(battleInfo.battleId, tokenIds);
          tx = await betContract.stakeNftA(battleInfo.battleId, tokenIds);
        } else {
          await betContract.estimateGas.stakeNftB(battleInfo.battleId, tokenIds);
          tx = await betContract.stakeNftB(battleInfo.battleId, tokenIds);
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

  return (
    <BattlePage
      battleInfo={battleInfo}
      getChance={getChance}
      getRewardPotential={getRewardPotential}
      placeBet={placeBet}
      stakeNft={stakeNft}
      totalBetAmountA={totalBetAmountA}
      totalBetAmountB={totalBetAmountB}
      totalNftStakedA={totalNftStakedA}
      totalNftStakedB={totalNftStakedB}
      updateBetInfo={updateBetInfo}
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
