/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import alchemy from '../constants/alchemy';
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
  updateUsername: (name: string) => void;
  selectNft: (metadata: NFTMetadata | undefined) => void;
}

const ProfileContext = React.createContext<Maybe<IProfileContext>>(null);

export const ProfileProvider = ({ children = null as any }) => {
  const { account } = useWallet();

  const [username, setUsername] = useState<string>('PROFILE NAME');
  const [selNft, setSelNft] = useState<NFTMetadata | undefined>(undefined);
  const [winnerRank, setWinnerRank] = useState(346);
  const [abpRank, setAbpRank] = useState(543);
  const [battlesInProgress, setBattlesInProgress] = useState(4);
  const [battlesWon, setBattlesWon] = useState(15);
  const [totalEthEarned, setTotalEthEarned] = useState(332);
  const [userNfts, setUserNfts] = useState<NFTMetadata[]>([]);

  const updateTimer = useRef<NodeJS.Timeout | null>(null);

  const updateTotalInfo = () => {
    updateUserNftList();

    if (updateTimer.current) {
      clearTimeout(updateTimer.current);
    }
    updateTimer.current = setTimeout(() => {
      updateTotalInfo();
    }, 10000);
  };

  useEffect(() => {
    updateTotalInfo();
  }, [account]);

  const updateUserNftList = useCallback(async () => {
    if (account) {
      const res = await alchemy.nft.getNftsForOwner(account);
      setUserNfts(res.ownedNfts);
    } else {
      setUserNfts([]);
    }
  }, [account]);

  const updateUsername = (name: string) => {
    setUsername(name);
  };

  const selectNft = (metadata: NFTMetadata | undefined) => {
    setSelNft(metadata);
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
        updateUsername,
        selectNft,
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
