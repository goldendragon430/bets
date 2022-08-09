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
