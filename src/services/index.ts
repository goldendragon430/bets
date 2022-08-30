/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URI,
  headers: {
    'Content-type': 'application/json',
  },
});

export const getTwitterFeeds = (tweet_id: string) => http.get(`/v1/twitter/get?tweet_id=${tweet_id}`);

export const getActiveBattleIds = () => http.get(`/v1/battles/get_active_battle_ids`);

export const getBattleHistory = () => http.get(`/v1/battles/get_battle_histories`);

export const getBattleById = (battleId: string) => http.get(`/v1/battles/get_battle_by_id/${battleId}`);

export const getNftStakedStatus = (tokenIds: number[], contractAddress: string, battleId: string) =>
  http.post(`/v1/battles/get_nft_staked_status`, { tokenIds, contractAddress, battleId });

export const getActiveTotalNftStakedAmount = (battleId: string) =>
  http.get(`/v1/battles/get_active_total_nft_staked_amount/${battleId}`);

export const getLeaderboard = (battleId: string) => http.get(`/v1/battles/get_leaderboard/${battleId}`);
