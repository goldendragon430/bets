/* eslint-disable no-console */
import React from 'react';

import styled from 'styled-components';

import ClaimSection from './claim_section';
import FeaturedFight from './featured_fight';
import SocialSection from './social_section';

const Container = styled.div`
  width: 100%;
  // max-width: 100%;
  // width: 150vh;
  background: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => `${theme.media_width.upToExtraLarge} {
    padding: 0 15%;
  }`};
`;

const Featured: React.FC = () => (
  <Container>
    <ClaimSection />
    <FeaturedFight />
    <SocialSection />
  </Container>
);

export default Featured;
