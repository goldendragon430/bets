/* eslint-disable no-console */
import React from 'react';

import styled from 'styled-components';

import FeaturedFight from './featured_fight';
import TweetSection from './tweet_section';

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.black};
`;

const Featured: React.FC = () => (
  <Container>
    <FeaturedFight />
    <TweetSection />
  </Container>
);

export default Featured;
