/* eslint-disable import/prefer-default-export */

import { TwitterFeed } from '../types';

export const TWEET_LIST = new Array(10).fill(1).map(
  (_, key) =>
    ({
      id: String(key),
      text: '#primates starting to love',
      createdAt: '3h',
      name: 'Ruopsso',
      username: 'ruru',
    } as TwitterFeed)
);
