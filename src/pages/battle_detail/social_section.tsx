// import { useState } from 'react';

import { useState } from 'react';

import styled from 'styled-components';

import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { BattleDetailType } from '../../types';
import EventList from './event_list';
import TweetSection from './tweet_section';

const Container = styled.div`
  width: 100%;
  padding: 4rem;

  ${({ theme }) => `${theme.media_width.upToSmall} {
    padding: 2rem;
  }`}
`;

const Wrapper = styled.div<{ visible?: boolean }>`
  width: 100%;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TabButton = styled(Button)<{ visible?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typography.boldSubTitle.fontFamily};
  font-weight: ${({ theme }) => theme.typography.boldSubTitle.fontWeight};
  font-style: ${({ theme }) => theme.typography.boldSubTitle.fontStyle};
  font-size: ${({ theme }) => theme.typography.boldSubTitle.fontSize};
  ${({ visible, theme }) =>
    !visible &&
    `
    color: ${theme.colors.grey2};
    filter: none;
  `}
  ${({ theme }) => `${theme.media_width.upToSmall} {
    font-size: 1.5rem;
  }`}
`;

const Splitter = styled(Typography)``;

const SocialSection: React.FC<BattleDetailType> = (props) => {
  const { theme } = useTheme();
  const [showTweet, setShowTweet] = useState(false);

  return (
    <Container>
      <ButtonWrapper>
        <TabButton onClick={() => setShowTweet(false)} shadow visible={!showTweet}>
          Live feed
        </TabButton>
        <Splitter color={theme.colors.grey2} type={TypographyType.BOLD_SUBTITLE}>
          |
        </Splitter>
        <TabButton onClick={() => setShowTweet(true)} shadow visible={showTweet}>
          Twitter feed
        </TabButton>
      </ButtonWrapper>

      <Wrapper visible={!showTweet}>
        <EventList color={theme.colors.grey2} {...props} />
      </Wrapper>
      <Wrapper visible={showTweet}>
        <TweetSection color={theme.colors.grey2} />
      </Wrapper>
    </Container>
  );
};
export default SocialSection;
