/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from 'axios';

import { BACKEND_URI } from '../constants';
import { SupportedChainId } from '../constants/chains';

const http: { [chainId: number]: AxiosInstance } = {
  [SupportedChainId.MAINNET]: axios.create({
    baseURL: BACKEND_URI[SupportedChainId.MAINNET],
    headers: {
      'Content-type': 'application/json',
    },
  }),
  [SupportedChainId.GOERLI]: axios.create({
    baseURL: BACKEND_URI[SupportedChainId.GOERLI],
    headers: {
      'Content-type': 'application/json',
    },
  }),
};

export const getTwitterFeeds = (chainId: number | undefined, keyword: string) =>
  chainId && http[chainId] && http[chainId].get(`/v1/twitter/get?keyword=${keyword}`);

export const getActiveBattleIds = (chainId: number | undefined) =>
  chainId && http[chainId] && http[chainId].get(`/v1/battles/get_active_battle_ids`);

export const getBattleHistory = (chainId: number | undefined) =>
  chainId && http[chainId] && http[chainId].get(`/v1/battles/get_battle_histories`);

export const getBattleById = (chainId: number | undefined, battleId: string) =>
  chainId && http[chainId] && http[chainId].get(`/v1/battles/get_battle_by_id/${battleId}`);

export const getNftStakedStatus = (chainId: number | undefined, tokenIds: number[], side: boolean, battleId: string) =>
  chainId && http[chainId] && http[chainId].post(`/v1/battles/get_nft_staked_status`, { tokenIds, side, battleId });

export const getActiveTotalNftStakedAmount = (chainId: number | undefined, battleId: string) =>
  chainId && http[chainId] && http[chainId].get(`/v1/battles/get_active_total_nft_staked_amount/${battleId}`);

export const getLeaderboard = (chainId: number | undefined) =>
  chainId && http[chainId] && http[chainId].get(`/v1/battles/get_leaderboard`);

export const getBattleEventsById = (chainId: number | undefined, battleId: string) =>
  chainId && http[chainId] && http[chainId].get(`/v1/battles/get_battle_events/${battleId}`);

export const getNonce = (chainId: number | undefined, account: string) =>
  chainId && http[chainId] && http[chainId].get(`/v1/users/get_nonce/${account}/nonce`);

export const getProfile = (chainId: number | undefined, account: string) =>
  chainId && http[chainId] && http[chainId].get(`/v1/users/get_profile/${account}`);

export const updateProfileInfo = (chainId: number | undefined, account: string, data: any) =>
  chainId && http[chainId] && http[chainId].post(`/v1/users/update_profile/${account}`, data);
