/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ethers } from 'ethers';

import { useBetContract } from '../hooks/useContract';
import { useWallet } from './wallet_context';

export interface IBetContext {
  totalBetAmountA: number;
  totalBetAmountB: number;
  updateBetInfo: () => void;
  userBetAmountA: number;
  userBetAmountB: number;
  updateUserInfo: () => void;
  endTime: number;
  updateEndTime: () => void;
  placeBet: (amount: number, side: boolean) => Promise<boolean>;
  getRewardPotential: (side: boolean) => number;
  getChance: (side: boolean) => number;
}

const BetContext = React.createContext<Maybe<IBetContext>>(null);

export const BetProvider = ({ children = null as any }) => {
  const { account, updateBalance } = useWallet();
  const betContract = useBetContract();

  const [totalBetAmountA, setTotalBetAmountA] = useState(0);
  const [totalBetAmountB, setTotalBetAmountB] = useState(0);
  const [userBetAmountA, setUserBetAmountA] = useState(0);
  const [userBetAmountB, setUserBetAmountB] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const updateBetInfo = useCallback(async () => {
    try {
      if (betContract) {
        await betContract.estimateGas.totalBettedAmountA();
        const totalAmountA = await betContract.totalBettedAmountA();
        setTotalBetAmountA(Number(ethers.utils.formatEther(totalAmountA)));

        await betContract.estimateGas.totalBettedAmountB();
        const totalAmountB = await betContract.totalBettedAmountB();
        setTotalBetAmountB(Number(ethers.utils.formatEther(totalAmountB)));
      } else {
        setTotalBetAmountA(0);
        setTotalBetAmountB(0);
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
      setTotalBetAmountA(0);
      setTotalBetAmountB(0);
    }
  }, [betContract]);

  const updateEndTime = useCallback(async () => {
    try {
      if (betContract) {
        await betContract.estimateGas.betEndTime();
        const betEndTime = await betContract.betEndTime();
        setEndTime(Number(betEndTime));
      } else {
        setEndTime(0);
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
      setEndTime(0);
    }
  }, [betContract]);

  useEffect(() => {
    updateBetInfo();
    updateEndTime();
  }, [betContract]);

  const updateUserInfo = useCallback(async () => {
    try {
      if (betContract && account) {
        await betContract.estimateGas.getUserBettedAmount(account, false);
        const userAmountA = await betContract.getUserBettedAmount(account, false);
        setUserBetAmountA(Number(ethers.utils.formatEther(userAmountA)));

        await betContract.estimateGas.getUserBettedAmount(account, true);
        const userAmountB = await betContract.getUserBettedAmount(account, true);
        setUserBetAmountB(Number(ethers.utils.formatEther(userAmountB)));
      } else {
        setUserBetAmountA(0);
        setUserBetAmountB(0);
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
      setUserBetAmountA(0);
      setUserBetAmountB(0);
    }
  }, [account, betContract]);

  useEffect(() => {
    updateUserInfo();
  }, [betContract, account]);

  const placeBet = async (amount: number, side: boolean) => {
    try {
      if (betContract && account) {
        await betContract.estimateGas.placeBet(side, account, { value: ethers.utils.parseEther(String(amount)) });
        const tx = await betContract.placeBet(side, account, { value: ethers.utils.parseEther(String(amount)) });
        const receipt = await tx.wait();
        if (receipt.status) {
          updateBetInfo();
          updateUserInfo();
          updateBalance();
          return true;
        }
        toast.error('Place bet error');
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
    }
    return false;
  };

  const getRewardPotential = (side: boolean) => {
    const totalAmount = totalBetAmountA + totalBetAmountB;

    if (!side) {
      return totalBetAmountA > 0 ? totalAmount / totalBetAmountA : 0;
    }
    return totalBetAmountB > 0 ? totalAmount / totalBetAmountB : 0;
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

  return (
    <BetContext.Provider
      value={{
        totalBetAmountA,
        totalBetAmountB,
        updateBetInfo,
        userBetAmountA,
        userBetAmountB,
        updateUserInfo,
        endTime,
        updateEndTime,
        placeBet,
        getRewardPotential,
        getChance,
      }}
    >
      {children}
    </BetContext.Provider>
  );
};

export const useBet = () => {
  const context = useContext(BetContext);

  if (!context) {
    throw new Error('Component rendered outside the provider tree');
  }

  return context;
};
