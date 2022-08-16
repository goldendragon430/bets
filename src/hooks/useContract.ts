import { useMemo } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Contract } from '@ethersproject/contracts';

import BetABI from '../abi/BetABI.json';
import { BET_CONTRACT_ADDRESS } from '../constants/addresses';
import { getContract } from '../utils';
import useActiveWeb3React from './useActiveWeb3React';

// returns null on errors
// eslint-disable-next-line import/prefer-default-export
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  // eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T;
}

export function useBetContract(withSignerIfPossible?: boolean): Contract | null {
  return useContract(BET_CONTRACT_ADDRESS, BetABI, withSignerIfPossible);
}