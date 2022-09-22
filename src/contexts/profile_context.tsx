/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import alchemy from '../constants/alchemy';
import { getProfile, updateProfileInfo } from '../services';
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
  updateProfile: (name: string, metadata: NFTMetadata | undefined) => void;
}

const ProfileContext = React.createContext<Maybe<IProfileContext>>(null);

export const ProfileProvider = ({ children = null as any }) => {
  const { account } = useWallet();

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
  }, [account]);

  const updateUserNftList = useCallback(async () => {
    if (account) {
      try {
        const res = await alchemy.nft.getNftsForOwner(account);
        setUserNfts(res.ownedNfts);
        return res.ownedNfts;
      } catch (e) {
        console.error(e);
      }
    }

    setUserNfts([]);
    return [] as NFTMetadata[];
  }, [account]);

  const getProfileInfo = useCallback(
    async (nfts: NFTMetadata[]) => {
      if (account) {
        try {
          const res = await getProfile(account);
          if (res.data.data) {
            setUsername(res.data.data.username);
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
    [account]
  );

  const updateProfile = async (name: string, metadata: NFTMetadata | undefined) => {
    setUsername(name);
    setSelNft(metadata);
    console.log(metadata);
    await updateProfileInfo(account || '', {
      username: name,
      contract: metadata?.contract.address.toLowerCase(),
      tokenId: metadata?.tokenId,
      image: metadata?.rawMetadata?.image,
    });
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
