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

export const getNftStakedStatus = (tokenIds: number[], side: boolean, battleId: string) =>
  http.post(`/v1/battles/get_nft_staked_status`, { tokenIds, side, battleId });

export const getActiveTotalNftStakedAmount = (battleId: string) =>
  http.get(`/v1/battles/get_active_total_nft_staked_amount/${battleId}`);

export const getLeaderboard = () => http.get(`/v1/battles/get_leaderboard`);

export const getBattleEventsById = (battleId: string) => http.get(`/v1/battles/get_battle_events/${battleId}`);

export const getProfile = (account: string) => http.get(`/v1/users/get_profile/${account}`);

export const updateProfileInfo = (account: string, data: any) => http.post(`/v1/users/update_profile/${account}`, data);
