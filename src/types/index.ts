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

export interface ProjectInfo {
  collectionSize: number;
  contract: string;
  headerImage: string;
  id: string;
  logo: string;
  magicEdenLink: string;
  name: string;
  openSeaLink: string;
  subName: string;
  twitterID: string;
}

export interface BattleInfo {
  id: string;
  projectL: ProjectInfo;
  projectR: ProjectInfo;
  startDate: string;
  endDate: string;
}
