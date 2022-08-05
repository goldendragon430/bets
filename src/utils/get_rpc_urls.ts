import { SupportedChainId } from '../constants/chains';
import { INFURA_NETWORK_URLS } from '../constants/infura';

/* eslint-disable import/prefer-default-export */
export const getRpcUrls = (chainId: SupportedChainId): [string] => {
  switch (chainId) {
    case SupportedChainId.MAINNET:
    case SupportedChainId.GOERLI:
      return [INFURA_NETWORK_URLS[chainId]];
    default:
  }
  // Our API-keyed URLs will fail security checks when used with external wallets.
  throw new Error('RPC URLs must use public endpoints');
};
