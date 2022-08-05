/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Typography, TypographyType } from './common/typography';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  height: 6.25rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text1};

  ${({ theme }) => `${theme.media_width.upToMedium} {
    padding: 1rem 2rem;
  }`}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text1};
`;

const Header: React.FC = () => (
  <Container>
    <StyledLink to="/">
      <Typography type={TypographyType.BOLD_TITLE}>Honorous Bet</Typography>
    </StyledLink>
  </Container>
);

export default Header;
