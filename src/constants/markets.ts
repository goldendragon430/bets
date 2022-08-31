/* eslint-disable import/prefer-default-export */
export interface SecondaryMarketInfo {
  name: string;
  contractAddress: string;
}

export const SECONDARY_MARKETS: SecondaryMarketInfo[] = [
  {
    name: 'OpenSea',
    contractAddress: '0x1E0049783F008A0085193E00003D00cd54003c71',
  },
  // {
  //   name: 'Rarible',
  //   contractAddress: '0x4feE7B061C97C9c496b01DbcE9CDb10c02f0a0Be',
  // },
  // {
  //   name: 'LooksRare',
  //   contractAddress: '0xf42aa99F011A1fA7CDA90E5E98b277E306BcA83e',
  // },
  // {
  //   name: 'SudoSwap',
  //   contractAddress: '0xb16c1342E617A5B6E4b631EB114483FDB289c0A4',
  // },
];
