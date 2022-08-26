// import { useState } from 'react';

import styled from 'styled-components';

import Button from '../../components/common/button';
import Roomlio from '../../components/roomlio';
// import { Typography, TypographyType } from '../../components/common/typography';
import { useWallet } from '../../contexts/wallet_context';
import TweetSection from './tweet_section';

const Container = styled.div`
  width: 100%;
  padding: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    flex-direction: column;
  }`};
`;

const TabButton = styled(Button)`
  background: transparent;
  filter: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  text-shadow: none;
  font-family: ${({ theme }) => theme.typography.boldSubTitle.fontFamily};
  font-weight: ${({ theme }) => theme.typography.boldSubTitle.fontWeight};
  font-style: ${({ theme }) => theme.typography.boldSubTitle.fontStyle};
  font-size: ${({ theme }) => theme.typography.boldSubTitle.fontSize};
`;

// const Splitter = styled(Typography)`
//   ${({ theme }) => `${theme.media_width.upToMedium} {
//     display: none;
//   }`};
// `;

// const Splitter1 = styled(Typography)`
//   display: none;
//   ${({ theme }) => `${theme.media_width.upToMedium} {
//     display: block;
//   }`};
// `;

const SocialSection = () => {
  const { account } = useWallet();
  // const [showTweet, setShowTweet] = useState(false);

  return (
    <Container>
      <ButtonWrapper>
        {/* {account && (
          <>
            <TabButton onClick={() => setShowTweet(false)} shadow>
              Live chat
            </TabButton>
            <Splitter type={TypographyType.BOLD_TITLE}>|</Splitter>
            <Splitter1 type={TypographyType.BOLD_TITLE}>-</Splitter1>
          </>
        )} */}
        <TabButton shadow>Retweets</TabButton>
      </ButtonWrapper>

      {account && <Roomlio />}
      <TweetSection visible />
    </Container>
  );
};
export default SocialSection;
