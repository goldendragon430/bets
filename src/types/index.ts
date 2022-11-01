import { OwnedNft } from 'alchemy-sdk';

interface TwitterFeedUserInfo {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

interface TwitterFeedMediaInfo {
  type: string;
  media_key: string;
  width: number;
  height: number;
  url?: string;
  preview_image_url?: string;
  variants?: {
    bit_rate: number;
    content_type: string;
    url: string;
  }[];
}

export interface TwitterFeed {
  id: string;
  text: string;
  createdAt: Date;
  userInfo: TwitterFeedUserInfo;
  media: TwitterFeedMediaInfo[];
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
  displayName: string;
  twitterID: string;
  num_owners: number;
  floor_price: number;
}

export enum BattleStatus {
  Created = 'Created',
  RequestRandomWords = 'RequestRandomWords',
  Fulfilled = 'Fulfilled',
  Finalized = 'Finalized',
  RefundSet = 'Refund',
  Determine = 'Determine',
}

export interface BattleInfo {
  id: string;
  battleId: string;
  projectL: ProjectInfo;
  projectR: ProjectInfo;
  startDate: string;
  endDate: string;
  status: BattleStatus;
}

export interface BattleDetailType {
  battleInfo: BattleInfo | null;
  totalBetAmountA: number;
  totalBetAmountB: number;
  totalNftStakedA: number;
  totalNftStakedB: number;
  updateBetInfo: () => void;
  userBetAmountA: number;
  userBetAmountB: number;
  updateUserInfo: () => void;
  userNftListA: NFTMetadata[];
  userNftListB: NFTMetadata[];
  updateUserNftList: () => void;
  winnerSet: boolean;
  winner: boolean;
  refundStatus: boolean;
  placeBet: (amount: number, side: boolean) => Promise<boolean>;
  getRewardPotential: (side: boolean, extraAmount: number) => number;
  stakeNft: (tokenIds: number[], side: boolean) => Promise<boolean>;
  battleEvents: BattleEvent[];
}

export interface BattleEvent {
  txHash: string;
  user: string;
  side: boolean;
  timestamp: number;
  amount: number;
  action: 'Betted' | 'Staked';
  userInfo?: {
    username: string;
  };
}
