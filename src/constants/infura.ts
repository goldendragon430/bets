import { SupportedChainId } from './chains';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY || '9aa3d95b3bc440fa88ea12eaa4456161';

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
// eslint-disable-next-line import/prefer-default-export
export const INFURA_NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
};
