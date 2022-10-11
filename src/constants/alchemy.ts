import { Alchemy, Network } from 'alchemy-sdk';

import { SupportedChainId } from './chains';

const alchemy: { [chainId: number]: Alchemy } = {
  [SupportedChainId.MAINNET]: new Alchemy({
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network: Network.ETH_MAINNET,
  }),
  [SupportedChainId.GOERLI]: new Alchemy({
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network: Network.ETH_GOERLI,
  }),
};

export default alchemy;
