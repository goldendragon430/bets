export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.GOERLI]: 'goerli',
};

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[];

export const DEFAULT_NETWORK =
  process.env.REACT_APP_NETWORK === 'mainnet' ? SupportedChainId.MAINNET : SupportedChainId.GOERLI;
