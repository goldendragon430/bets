import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_KEY,
  network: process.env.REACT_APP_NETWORK === 'mainnet' ? Network.ETH_MAINNET : Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

export default alchemy;
