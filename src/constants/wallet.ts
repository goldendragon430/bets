// eslint-disable-next-line import/no-extraneous-dependencies
import { AbstractConnector } from '@web3-react/abstract-connector';

import METAMASK_ICON from '../assets/images/wallets/metamask.png';
import WALLET_CONNECT_ICON from '../assets/images/wallets/wallet_connect.svg';
import { injected, walletconnect } from '../connectors';

export interface WalletInfo {
  connector: AbstractConnector;
  name: string;
  icon: string;
  description: string;
  href: string | null;
  color: string;
  primary?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    icon: METAMASK_ICON,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    icon: WALLET_CONNECT_ICON,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
  },
};
