/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import { Typography, TypographyType } from '../../components/common/typography';
import { TwitterFeed } from '../../types';
import { formatTime } from '../../utils';

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div<{ color: string }>`
  width: 100%;
  height: 60rem;
  overflow-x: hidden;
  overflow-y: auto;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${({ color }) => `${color}88`} 100%);

  // -ms-overflow-style: none; /* Internet Explorer 10+ */
  // scrollbar-width: none; /* Firefox */
  // &::-webkit-scrollbar {
  //   display: none; /* Safari and Chrome */
  // }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffffff10;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
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
  cursor: pointer;
`;

const UserContent = styled.div`
  display: flex;
  align-items: flex-start;
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
  color: ${({ theme, blue }) => (blue ? '#1DA1F2' : theme.colors.white)};
`;

const MediaContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  video,
  img {
    width: 30%;

    ${({ theme }) => `${theme.media_width.upToMedium} {
      width: 50%;
    }`};

    ${({ theme }) => `${theme.media_width.upToSmall} {
      width: 70%;
    }`};

    ${({ theme }) => `${theme.media_width.upToExtraSmall} {
      width: 100%;
    }`};
  }
`;

interface ITweetList {
  tweets: TwitterFeed[];
  color: string;
}

const TweetList: React.FC<ITweetList> = ({ tweets, color }) => {
  const handleClickTweetItem = (item: TwitterFeed) => {
    window.open(`https://twitter.com/web/status/${item.id}`, '_blank')?.focus();
  };

  return (
    <Container>
      <Wrapper color={color}>
        {tweets.map((item, key) => {
          const parts = item.text.split(' ');
          return (
            <TweetItem color={color} key={key} onClick={() => handleClickTweetItem(item)}>
              <UserContent>
                <UserImage userImg={item.userInfo.profile_image_url} />
                <div>
                  <NameContent>
                    <Typography type={TypographyType.REGULAR}>{item.userInfo.name}</Typography>
                    &nbsp;
                    <UsernameText type={TypographyType.REGULAR_BODY2}>@{item.userInfo.username}</UsernameText>
                    &nbsp;
                    <UsernameText type={TypographyType.REGULAR_BODY2}> · {formatTime(item.createdAt)}</UsernameText>
                  </NameContent>

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

                  {item.media.length > 0 && (
                    <MediaContent>
                      {item.media[0].type === 'video' ? (
                        <video controls poster={item.media[0].preview_image_url}>
                          {item.media[0].variants?.map((variant, index) => (
                            <source key={index} src={variant.url} type={variant.content_type} />
                          ))}
                        </video>
                      ) : (
                        <img alt="" src={item.media[0].url} />
                      )}
                    </MediaContent>
                  )}
                </div>
              </UserContent>
            </TweetItem>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default TweetList;
