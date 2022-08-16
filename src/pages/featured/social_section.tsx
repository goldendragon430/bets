import styled from 'styled-components';

import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';
import TweetSection from './tweet_section';

const Container = styled.div`
  width: 100%;
  padding: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
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

const SocialSection = () => (
  <Container>
    <ButtonWrapper>
      <TabButton shadow>Live chat</TabButton>
      <Typography type={TypographyType.BOLD_TITLE}>|</Typography>
      <TabButton shadow>Retweets</TabButton>
    </ButtonWrapper>
    <TweetSection />
  </Container>
);

export default SocialSection;
