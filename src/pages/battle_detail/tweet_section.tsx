/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getTwitterFeeds } from '../../services';
import { TwitterFeed } from '../../types';
import TweetList from './tweet_list';

interface ITweetSection {
  color: string;
}

const TweetSection: React.FC<ITweetSection> = ({ color }) => {
  const { chainId } = useActiveWeb3React();

  const [listA, setListA] = useState<TwitterFeed[]>([]);

  useEffect(() => {
    fetchTwitterA();
  }, []);

  const fetchTwitterA = async () => {
    try {
      const res = await getTwitterFeeds(chainId, 'alphabets');
      if (res && res.data && res.data.data) {
        const { data, includes } = res.data.data;
        setListA(
          data.map((item: any) => {
            const userInfo = includes.users.find((_user: any) => _user.id === item.author_id);
            const media =
              includes.media?.filter((_media: any) => item.attachments?.media_keys.includes(_media.media_key)) || [];
            return {
              id: item.id,
              text: item.text,
              createdAt: new Date(item.created_at),
              userInfo,
              media,
            } as TwitterFeed;
          })
        );
      } else {
        setListA([]);
      }
    } catch (e) {
      setListA([]);
    }
  };

  return <TweetList color={color} tweets={listA} />;
};

export default TweetSection;
