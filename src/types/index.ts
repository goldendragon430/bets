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
  displayName: string;
  twitterID: string;
  num_owners: number;
  floor_price: number;
}

export interface BattleInfo {
  id: string;
  battleId: string;
  projectL: ProjectInfo;
  projectR: ProjectInfo;
  startDate: string;
  endDate: string;
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
}
