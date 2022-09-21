/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useContext, useState } from 'react';

export interface IProfileContext {
  username: string;
  userImg: string | undefined;
  winnerRank: number;
  abpRank: number;
  battlesInProgress: number;
  battlesWon: number;
  totalEthEarned: number;
  updateUsername: (name: string) => void;
}

const ProfileContext = React.createContext<Maybe<IProfileContext>>(null);

export const ProfileProvider = ({ children = null as any }) => {
  const [username, setUsername] = useState<string>('PROFILE NAME');
  const [userImg, setUserImg] = useState<string | undefined>(undefined);
  const [winnerRank, setWinnerRank] = useState(346);
  const [abpRank, setAbpRank] = useState(543);
  const [battlesInProgress, setBattlesInProgress] = useState(4);
  const [battlesWon, setBattlesWon] = useState(15);
  const [totalEthEarned, setTotalEthEarned] = useState(332);

  const updateUsername = (name: string) => {
    setUsername(name);
  };

  return (
    <ProfileContext.Provider
      value={{
        username,
        userImg,
        winnerRank,
        abpRank,
        battlesInProgress,
        battlesWon,
        totalEthEarned,
        updateUsername,
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
