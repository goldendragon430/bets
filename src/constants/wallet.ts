// eslint-disable-next-line import/no-extraneous-dependencies
import { AbstractConnector } from '@web3-react/abstract-connector';

import { injected } from '../connectors';

interface WalletInfo {
  connector: AbstractConnector;
  name: string;
  description: string;
  href: string | null;
  color: string;
  primary?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
};
