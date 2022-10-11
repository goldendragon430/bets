/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BigNumber, ethers } from 'ethers';

import { mixpanelTracker } from '../../config/mixpanel';
import { BET_CONTRACT_ADDRESS } from '../../constants';
import { DEFAULT_NETWORK } from '../../constants/chains';
import { useBattle } from '../../contexts/battle_context';
import { useWallet } from '../../contexts/wallet_context';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useBetContract } from '../../hooks/useContract';
import { getBattleById, getBattleEventsById, getProfile } from '../../services';
import { BattleEvent, BattleInfo, NFTMetadata } from '../../types';
import { getBattleBetInfo, getUserBetInfo, getUserNftList } from '../../utils/battle';
import BattlePage from './battle';

const BattleDetail: React.FC = () => {
  const { battleId } = useParams();
  const navigate = useNavigate();
  const { account, updateBalance } = useWallet();
  const { rakePercentage, nftStakersPercentage } = useBattle();
  const { chainId } = useActiveWeb3React();
  const betContract = useBetContract(BET_CONTRACT_ADDRESS[chainId || DEFAULT_NETWORK]);

  const [battleInfo, setBattleInfo] = useState<BattleInfo | null>(null);
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
  const [refundStatus, setRefundStatus] = useState(false);
  const [battleEvents, setBattleEvents] = useState<BattleEvent[]>([]);

  const updateTimer = useRef<NodeJS.Timeout | null>(null);

  const updateBattleInfo = useCallback(async () => {
    try {
      if (battleId) {
        const info = await getBattleById(chainId, battleId);
        if (info && info.data.data) {
          setBattleInfo(info.data.data as BattleInfo);
        } else {
          navigate('/events');
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }, [battleId, chainId]);

  useEffect(() => {
    updateBattleInfo();
  }, [battleId, chainId]);

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
    const res = await getBattleBetInfo(betContract, battleInfo, chainId);

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
    if (res.refundStatus !== undefined) {
      setRefundStatus(res.refundStatus);
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
    const res = await getUserNftList(account, battleInfo, chainId);

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

  const getRewardPotential = (side: boolean, extraAmount: number) => {
    const betAmountA = totalBetAmountA + (!side ? extraAmount : 0);
    const betAmountB = totalBetAmountB + (side ? extraAmount : 0);
    const totalAmount = betAmountA + betAmountB;

    const rakeReward = (totalAmount * rakePercentage) / 1e4;
    const loserAmount = side ? betAmountA : betAmountB;
    const nftStakersReward = (loserAmount * (1e4 - rakePercentage) * nftStakersPercentage) / 1e8;
    const betsReward = totalAmount - rakeReward - nftStakersReward;

    if (!side) {
      return betAmountA > 0 ? betsReward / betAmountA : 0;
    }
    return betAmountB > 0 ? betsReward / betAmountB : 0;
  };

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
          if (mixpanelTracker[chainId || 0]) {
            mixpanelTracker[chainId || 0].track('PLACE_BET', {
              battleId: battleInfo.id,
              amount,
              side,
            });
          }
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
        await betContract.estimateGas.stakeNft(battleInfo.battleId, tokenIds, side);
        const tx = await betContract.stakeNft(battleInfo.battleId, tokenIds, side);
        const receipt = await tx.wait();
        if (receipt.status) {
          if (mixpanelTracker[chainId || 0]) {
            mixpanelTracker[chainId || 0].track('STAKE_NFT', {
              battleId: battleInfo.id,
              amount: tokenIds.length,
              side,
            });
          }
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

  const initBattleEvents = useCallback(async () => {
    if (!battleInfo) {
      return;
    }

    try {
      const res = await getBattleEventsById(chainId, battleInfo.battleId);
      if (res && res.data.data) {
        setBattleEvents(res.data.data);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }, [battleInfo]);

  useEffect(() => {
    initBattleEvents();
  }, [battleInfo]);

  useEffect(() => {
    if (!betContract || !battleInfo) {
      return;
    }

    betContract.on(
      'NFTStaked',
      async (_battleId: BigNumber, side: boolean, user: string, tokenIds: BigNumber[], detail: any) => {
        if (_battleId.toString() === battleInfo.battleId.toString()) {
          const txHash = detail.transactionHash.toLowerCase();
          if (battleEvents.findIndex((e) => e.txHash === txHash) === -1) {
            let userInfo;
            const res = await getProfile(chainId, user);
            if (res && res.data.data) {
              userInfo = { username: res.data.data.username };
            }

            const e: BattleEvent = {
              txHash,
              user,
              side,
              timestamp: Date.now(),
              amount: tokenIds.length,
              action: 'Staked',
              userInfo,
            };

            setBattleEvents([...battleEvents, e]);
          }
        }
      }
    );

    betContract.on(
      'Betted',
      async (_battleId: BigNumber, user: string, amount: BigNumber, side: boolean, detail: any) => {
        if (_battleId.toString() === battleInfo.battleId.toString()) {
          const txHash = detail.transactionHash.toLowerCase();
          if (battleEvents.findIndex((e) => e.txHash === txHash) === -1) {
            let userInfo;
            const res = await getProfile(chainId, user);
            if (res && res.data.data) {
              userInfo = { username: res.data.data.username };
            }

            const e: BattleEvent = {
              txHash,
              user,
              side,
              timestamp: Date.now(),
              amount: Number(ethers.utils.formatEther(amount)),
              action: 'Betted',
              userInfo,
            };

            setBattleEvents([...battleEvents, e]);
          }
        }
      }
    );

    // eslint-disable-next-line consistent-return
    return () => {
      betContract.removeAllListeners();
    };
  }, [betContract, battleInfo, battleEvents]);

  return (
    <BattlePage
      battleEvents={battleEvents}
      battleInfo={battleInfo}
      getRewardPotential={getRewardPotential}
      placeBet={placeBet}
      refundStatus={refundStatus}
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
