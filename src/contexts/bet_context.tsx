/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

import { TEAM_COLLECTION_A_ADDRESS, TEAM_COLLECTION_B_ADDRESS } from '../constants/addresses';
import { useBetContract } from '../hooks/useContract';
import { NFTMetadata } from '../types';
import { isExpired } from '../utils';
import { useWallet } from './wallet_context';

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

export interface IBetContext {
  totalBetAmountA: number;
  totalBetAmountB: number;
  totalNftStakedA: number;
  totalNftStakedB: number;
  updateBetInfo: () => void;
  userBetAmountA: number;
  userBetAmountB: number;
  updateUserInfo: () => void;
  userNftListA: NFTMetadata[];
  userNftListB: NFTMetadata[];
  updateUserNftList: () => void;
  endTime: number;
  updateEndTime: () => void;
  placeBet: (amount: number, side: boolean) => Promise<boolean>;
  getRewardPotential: (side: boolean) => number;
  getChance: (side: boolean) => number;
  stakeNft: (tokenIds: number[], side: boolean) => Promise<boolean>;
  claimAmount: number;
  claim: () => void;
}

const BetContext = React.createContext<Maybe<IBetContext>>(null);

export const BetProvider = ({ children = null as any }) => {
  const { account, updateBalance } = useWallet();
  const betContract = useBetContract();

  const [endTime, setEndTime] = useState(0);
  const [totalBetAmountA, setTotalBetAmountA] = useState(0);
  const [totalBetAmountB, setTotalBetAmountB] = useState(0);
  const [totalNftStakedA, setTotalNftStakedA] = useState(0);
  const [totalNftStakedB, setTotalNftStakedB] = useState(0);
  const [userBetAmountA, setUserBetAmountA] = useState(0);
  const [userBetAmountB, setUserBetAmountB] = useState(0);
  const [userNftListA, setUserNftListA] = useState<NFTMetadata[]>([]);
  const [userNftListB, setUserNftListB] = useState<NFTMetadata[]>([]);
  const [claimAmount, setClaimAmount] = useState(0);

  const updateTimer = useRef<NodeJS.Timeout | null>(null);

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
    try {
      if (betContract) {
        await betContract.estimateGas.totalBettedAmountA();
        const totalAmountA = await betContract.totalBettedAmountA();
        setTotalBetAmountA(Number(ethers.utils.formatEther(totalAmountA)));

        await betContract.estimateGas.totalBettedAmountB();
        const totalAmountB = await betContract.totalBettedAmountB();
        setTotalBetAmountB(Number(ethers.utils.formatEther(totalAmountB)));

        await betContract.estimateGas.totalNftStakedA();
        const nftStakedA = await betContract.totalNftStakedA();
        setTotalNftStakedA(Number(nftStakedA));

        await betContract.estimateGas.totalNftStakedB();
        const nftStakedB = await betContract.totalNftStakedB();
        setTotalNftStakedB(Number(nftStakedB));
      } else {
        setTotalBetAmountA(0);
        setTotalBetAmountB(0);
        setTotalNftStakedA(0);
        setTotalNftStakedB(0);
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
      setTotalBetAmountA(0);
      setTotalBetAmountB(0);
      setTotalNftStakedA(0);
      setTotalNftStakedB(0);
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

    if (isExpired(endTime)) {
      try {
        if (betContract && account) {
          await betContract.estimateGas.getClaimableAmount(account);
          const amount = await betContract.getClaimableAmount(account);
          setClaimAmount(Number(ethers.utils.formatEther(amount)));
        } else {
          setClaimAmount(0);
        }
      } catch (err: any) {
        toast.error(err.reason || err.error?.message || err.message);
        setClaimAmount(0);
      }
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

  const updateUserNftList = useCallback(async () => {
    if (account) {
      try {
        const nfts = await alchemy.nft.getNftsForOwner(account, {
          contractAddresses: [TEAM_COLLECTION_A_ADDRESS, TEAM_COLLECTION_B_ADDRESS],
        });
        setUserNftListA(
          nfts.ownedNfts.filter(
            (item) => item.contract.address.toLowerCase() === TEAM_COLLECTION_A_ADDRESS.toLowerCase()
          )
        );
        setUserNftListB(
          nfts.ownedNfts.filter(
            (item) => item.contract.address.toLowerCase() === TEAM_COLLECTION_B_ADDRESS.toLowerCase()
          )
        );
      } catch (e) {
        console.error(e);
        setUserNftListA([]);
        setUserNftListB([]);
      }
    } else {
      setUserNftListA([]);
      setUserNftListB([]);
    }
  }, [account]);

  useEffect(() => {
    updateUserNftList();
  }, [account]);

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

  const claim = async () => {
    try {
      if (betContract && account) {
        await betContract.estimateGas.claim();
        const tx = await betContract.claim();
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
    <BetContext.Provider
      value={{
        totalBetAmountA,
        totalBetAmountB,
        totalNftStakedA,
        totalNftStakedB,
        updateBetInfo,
        userBetAmountA,
        userBetAmountB,
        updateUserInfo,
        userNftListA,
        userNftListB,
        updateUserNftList,
        endTime,
        updateEndTime,
        placeBet,
        getRewardPotential,
        getChance,
        stakeNft,
        claimAmount,
        claim,
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
