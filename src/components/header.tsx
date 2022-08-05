/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import LogoIcon from '../assets/images/logo.png';
import WalletButton from './wallet_button';

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

const Logo = styled.img`
  height: 2rem;
`;

const Header: React.FC = () => (
  <Container>
    <StyledLink to="/">
      <Logo alt="" src={LogoIcon} />
    </StyledLink>

    <WalletButton />
  </Container>
);

export default Header;
