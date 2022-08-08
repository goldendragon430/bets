/* eslint-disable no-console */
import React from 'react';

import styled from 'styled-components';

import BattleRemaining from './battle_remaining';
import FeaturedFight from './featured_fight';

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.black};
`;

const Featured: React.FC = () => (
  <Container>
    <BattleRemaining />
    <FeaturedFight />
  </Container>
);

export default Featured;
