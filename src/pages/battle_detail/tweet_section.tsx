/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useTheme } from '../../contexts/theme_context';
import { getTwitterFeeds } from '../../services';
import { TwitterFeed } from '../../types';
import TweetList from './tweet_list';

const Container = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.black};

  ${({ theme }) => `${theme.media_width.upToMedium} {
    flex-direction: column;
  }`}

  ${({ visible }) => !visible && `display: none;`}
`;

interface ITweetSection {
  visible: boolean;
}

const TweetSection: React.FC<ITweetSection> = ({ visible }) => {
  const { theme } = useTheme();

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

  return (
    <Container visible={visible}>
      <TweetList color={theme.colors.green2} tweets={listA} />
    </Container>
  );
};

export default TweetSection;
