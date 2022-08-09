/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URI,
  headers: {
    'Content-type': 'application/json',
  },
});

export const getTwitterFeeds = (tweet_id: string) => http.get(`/v1/twitter/get?tweet_id=${tweet_id}`);
