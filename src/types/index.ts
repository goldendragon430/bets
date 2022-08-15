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
