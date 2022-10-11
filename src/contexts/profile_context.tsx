/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import alchemy from '../constants/alchemy';
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import { getNonce, getProfile, updateProfileInfo } from '../services';
import { NFTMetadata } from '../types';
import { useWallet } from './wallet_context';

export interface IProfileContext {
  username: string;
  selNft: NFTMetadata | undefined;
  winnerRank: number;
  abpRank: number;
  battlesInProgress: number;
  battlesWon: number;
  totalEthEarned: number;
  userNfts: NFTMetadata[];
  updateProfile: (name: string, metadata: NFTMetadata | undefined) => Promise<boolean>;
}

const ProfileContext = React.createContext<Maybe<IProfileContext>>(null);

export const ProfileProvider = ({ children = null as any }) => {
  const { library } = useWeb3React();
  const { account } = useWallet();
  const { chainId } = useActiveWeb3React();

  const [username, setUsername] = useState<string>('User');
  const [selNft, setSelNft] = useState<NFTMetadata | undefined>(undefined);
  const [winnerRank, setWinnerRank] = useState(346);
  const [abpRank, setAbpRank] = useState(543);
  const [battlesInProgress, setBattlesInProgress] = useState(4);
  const [battlesWon, setBattlesWon] = useState(15);
  const [totalEthEarned, setTotalEthEarned] = useState(332);
  const [userNfts, setUserNfts] = useState<NFTMetadata[]>([]);

  const updateTimer = useRef<NodeJS.Timeout | null>(null);

  const updateTotalInfo = async () => {
    const res = await updateUserNftList();
    getProfileInfo(res);

    if (updateTimer.current) {
      clearTimeout(updateTimer.current);
    }
    updateTimer.current = setTimeout(() => {
      updateTotalInfo();
    }, 20000);
  };

  useEffect(() => {
    updateTotalInfo();
  }, [account, chainId]);

  const updateUserNftList = useCallback(async () => {
    if (account && chainId) {
      try {
        const res = await alchemy[chainId].nft.getNftsForOwner(account);
        setUserNfts(res.ownedNfts);
        return res.ownedNfts;
      } catch (e) {
        console.error(e);
      }
    }

    setUserNfts([]);
    return [] as NFTMetadata[];
  }, [account, chainId]);

  const getProfileInfo = useCallback(
    async (nfts: NFTMetadata[]) => {
      if (account) {
        try {
          const res = await getProfile(chainId, account);
          if (res && res.data.data) {
            setUsername(res.data.data.username);
            setWinnerRank(res.data.data.winnerRank);
            setAbpRank(res.data.data.abpRank);
            setBattlesInProgress(res.data.data.battlesInProgress);
            setBattlesWon(res.data.data.battlesWon);
            setTotalEthEarned(res.data.data.totalEthEarned);
            if (res.data.data.selectedNFT) {
              const result = nfts.find(
                (item) =>
                  item.contract.address.toLowerCase() === res.data.data.selectedNFT.contract?.toLowerCase() &&
                  item.tokenId === res.data.data.selectedNFT.tokenId
              );
              setSelNft(result);
            } else {
              setSelNft(undefined);
            }
            return;
          }
        } catch (e) {
          console.error(e);
        }

        setUsername(account);
        setSelNft(undefined);
      }
    },
    [account, chainId]
  );

  const updateProfile = async (name: string, metadata: NFTMetadata | undefined) => {
    try {
      const res = await getNonce(chainId, account || '');
      if (res) {
        const {
          data: { data: nonce },
        } = res;

        const signer = library.getSigner();
        const signature = await signer.signMessage(ethers.utils.toUtf8Bytes(`Nonce: ${nonce}`));

        await updateProfileInfo(chainId, account || '', {
          username: name,
          contract: metadata?.contract.address.toLowerCase(),
          tokenId: metadata?.tokenId,
          image: metadata?.rawMetadata?.image,
          signature,
        });

        setUsername(name);
        setSelNft(metadata);

        return true;
      }
    } catch (e: any) {
      toast.error(e.message);
    }
    return false;
  };

  return (
    <ProfileContext.Provider
      value={{
        username,
        selNft,
        winnerRank,
        abpRank,
        battlesInProgress,
        battlesWon,
        totalEthEarned,
        userNfts,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('Component rendered outside the provider tree');
  }

  return context;
};
