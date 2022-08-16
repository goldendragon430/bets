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
  placeBet: (amount: number, side: boolean) => Promise<boolean>;
}

const BetContext = React.createContext<Maybe<IBetContext>>(null);

export const BetProvider = ({ children = null as any }) => {
  const { account, updateBalance } = useWallet();
  const betContract = useBetContract();

  const [totalBetAmountA, setTotalBetAmountA] = useState(0);
  const [totalBetAmountB, setTotalBetAmountB] = useState(0);
  const [userBetAmountA, setUserBetAmountA] = useState(0);
  const [userBetAmountB, setUserBetAmountB] = useState(0);

  const updateBetInfo = useCallback(async () => {
    try {
      if (betContract) {
        await betContract.estimateGas.totalBettedAmountA();
        const totalAmountA = await betContract.totalBettedAmountA();
        setTotalBetAmountA(totalAmountA);

        await betContract.estimateGas.totalBettedAmountB();
        const totalAmountB = await betContract.totalBettedAmountB();
        setTotalBetAmountB(totalAmountB);
      } else {
        setTotalBetAmountA(0);
        setTotalBetAmountB(0);
      }
    } catch (err: any) {
      toast.error(err.message);
      setTotalBetAmountA(0);
      setTotalBetAmountB(0);
    }
  }, [betContract]);

  useEffect(() => {
    updateBetInfo();
  }, [betContract, updateBetInfo]);

  const updateUserInfo = useCallback(async () => {
    try {
      if (betContract && account) {
        await betContract.estimateGas.getUserBettedAmount(account, false);
        const userAmountA = await betContract.getUserBettedAmount(account, false);
        setUserBetAmountA(userAmountA);

        await betContract.estimateGas.getUserBettedAmount(account, true);
        const userAmountB = await betContract.getUserBettedAmount(account, true);
        setUserBetAmountB(userAmountB);
      } else {
        setUserBetAmountA(0);
        setUserBetAmountB(0);
      }
    } catch (err: any) {
      toast.error(err.message);
      setUserBetAmountA(0);
      setUserBetAmountB(0);
    }
  }, [account, betContract]);

  useEffect(() => {
    updateUserInfo();
  }, [betContract, account, updateUserInfo]);

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
      toast.error(err.message);
    }
    return false;
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
        placeBet,
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
