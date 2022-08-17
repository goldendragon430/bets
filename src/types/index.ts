import { OwnedNft } from 'alchemy-sdk';

export interface TwitterFeed {
  id: string;
  text: string;
  createdAt: Date;
  name: string;
  username: string;
  profileImg: string;
}

export interface TeamInfo {
  logo: string;
  ethStaked: number;
  nftStaked: number;
  color: string;
}

export interface NFTMetadata extends OwnedNft {
  staked?: boolean;
}
