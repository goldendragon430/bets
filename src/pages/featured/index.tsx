/* eslint-disable no-console */
import React from 'react';

import styled from 'styled-components';

import BattleRemaining from './battle_remaining';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.black};
`;

const Featured: React.FC = () => (
  <Container>
    <BattleRemaining />
  </Container>
);

export default Featured;
