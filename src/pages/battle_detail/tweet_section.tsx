/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useTheme } from '../../contexts/theme_context';
import { getTwitterFeeds } from '../../services';
import { TwitterFeed } from '../../types';
import TweetList from './tweet_list';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4rem;
  background: ${({ theme }) => theme.colors.black};

  ${({ theme }) => `${theme.media_width.upToMedium} {
    flex-direction: column;
  }`}
`;

const TweetSection: React.FC = () => {
  const { theme } = useTheme();

  const [listA, setListA] = useState<TwitterFeed[]>([]);

  useEffect(() => {
    fetchTwitterA();
  }, []);

  const fetchTwitterA = async () => {
    try {
      const res = await getTwitterFeeds('1559998196587323396');
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

  return (
    <Container>
      <TweetList color={theme.colors.green2} tweets={listA} />
    </Container>
  );
};

export default TweetSection;
