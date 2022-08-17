/* eslint-disable import/no-extraneous-dependencies */
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';

export const getShortWalletAddress = (account: string) => `${account.slice(0, 6)}...${account.slice(-4)}`;

export const bnToDec = (bn: BigNumber, decimals = 18) => bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber();

export const decToBn = (dec: number, decimals = 18) => new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals));

export function formatTime(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);

  const mins = Math.round(diff / 60);
  const hours = Math.round(mins / 60);
  const days = Math.round(hours / 24);
  if (days > 0) {
    return `${days}d`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  if (mins > 0) {
    return `${mins}m`;
  }
  return `${diff}s`;
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function isExpired(time: number) {
  return Date.now() > time * 1000;
}
