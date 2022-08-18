/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import { Typography, TypographyType } from '../../components/common/typography';
import { TwitterFeed } from '../../types';
import { formatTime } from '../../utils';

const Container = styled.div<{ color: string }>`
  width: 100%;
  height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${({ color }) => `${color}88`} 100%);
`;

const TweetItem = styled.div<{ color: string }>`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid ${({ color }) => color};
`;

const UserContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 0.5rem;
`;

const UserImage = styled.div<{ userImg?: string }>`
  width: 4rem;
  height: 4rem;
  min-width: 4rem;
  border-radius: 50%;
  margin-right: 1rem;
  background: ${({ theme, userImg }) => (userImg ? `url(${userImg})` : theme.colors.grey3)};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const NameContent = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const UsernameText = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey2};
`;

const ContentText = styled(Typography)`
  // white-space: nowrap;
`;

const FilteredText = styled.span<{ blue?: boolean }>`
  color: ${({ theme, blue }) => (blue ? theme.colors.blue2 : theme.colors.white)};
`;

interface ITweetList {
  tweets: TwitterFeed[];
  color: string;
}

const TweetList: React.FC<ITweetList> = ({ tweets, color }) => (
  <Container color={color}>
    {tweets.map((item, key) => {
      const parts = item.text.split(' ');
      return (
        <TweetItem color={color} key={key}>
          <UserContent>
            <UserImage userImg={item.profileImg} />
            <div>
              <NameContent>
                <Typography type={TypographyType.REGULAR}>{item.name}</Typography>
                &nbsp;
                <UsernameText type={TypographyType.REGULAR_BODY2}> · {formatTime(item.createdAt)}</UsernameText>
              </NameContent>
              <UsernameText type={TypographyType.REGULAR_BODY2}>@{item.username}</UsernameText>
            </div>
          </UserContent>
          <ContentText type={TypographyType.REGULAR}>
            {parts.map((word, index) =>
              word.startsWith('https://') || word.startsWith('http://') ? (
                <a href={word} key={index} rel="noreferrer" target="_blank">
                  <FilteredText style={{ textDecoration: 'underline' }}>{word} </FilteredText>
                </a>
              ) : (
                <FilteredText blue={word[0] === '@' || word[0] === '#'} key={index}>
                  {word}{' '}
                </FilteredText>
              )
            )}
          </ContentText>
        </TweetItem>
      );
    })}
  </Container>
);

export default TweetList;
