/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useBetContract } from '../hooks/useContract';
import { getBattleInitInfo } from '../utils/battle';

export interface IBattleContext {
  rakePercentage: number;
  nftStakersPercentage: number;
}

const BattleContext = React.createContext<Maybe<IBattleContext>>(null);

export const BattleProvider = ({ children = null as any }) => {
  const betContract = useBetContract();

  const [rakePercentage, setRakePercentage] = useState(0);
  const [nftStakersPercentage, setNftStakersPercentage] = useState(0);

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

  return (
    <BattleContext.Provider
      value={{
        rakePercentage,
        nftStakersPercentage,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = () => {
  const context = useContext(BattleContext);

  if (!context) {
    throw new Error('Component rendered outside the provider tree');
  }

  return context;
};
