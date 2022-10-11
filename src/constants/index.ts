/* eslint-disable import/prefer-default-export */
import { SupportedChainId } from './chains';

export const BACKEND_URI: {
  [chainId: number]: string;
} = {
  [SupportedChainId.MAINNET]: process.env.REACT_APP_BACKEND_API_URI_MAIN || '',
  [SupportedChainId.GOERLI]: process.env.REACT_APP_BACKEND_API_URI_GOERLI || '',
};

export const BET_CONTRACT_ADDRESS: {
  [chainId: number]: string;
} = {
  [SupportedChainId.MAINNET]: process.env.REACT_APP_BET_CONTRACT_ADDRESS_MAIN || '',
  [SupportedChainId.GOERLI]: process.env.REACT_APP_BET_CONTRACT_ADDRESS_GOERLI || '',
};

export const MIX_PANEL_TOKEN: {
  [chainId: number]: string;
} = {
  [SupportedChainId.MAINNET]: process.env.REACT_APP_MIX_PANEL_TOKEN_MAIN || '',
  [SupportedChainId.GOERLI]: process.env.REACT_APP_MIX_PANEL_TOKEN_GOERLI || '',
};
