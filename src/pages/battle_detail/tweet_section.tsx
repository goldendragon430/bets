/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';

import { getTwitterFeeds } from '../../services';
import { TwitterFeed } from '../../types';
import TweetList from './tweet_list';

interface ITweetSection {
  color: string;
}

const TweetSection: React.FC<ITweetSection> = ({ color }) => {
  const [listA, setListA] = useState<TwitterFeed[]>([]);

  useEffect(() => {
    fetchTwitterA();
  }, []);

  const fetchTwitterA = async () => {
    try {
      const res = await getTwitterFeeds('1563184041889001480');
      if (res && res.data && res.data.data) {
        const { data, includes } = res.data.data;
        setListA(
          data.map((item: any) => {
            const user = includes.users.find((_user: any) => _user.id === item.author_id);
            return {
              id: item.id,
              text: item.text,
              createdAt: new Date(item.created_at),
              name: user.name,
              username: user.username,
              profileImg: user.profile_image_url,
            };
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
