/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import LogoIcon from '../assets/images/logo.svg';
import { Typography, TypographyType } from './common/typography';
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LinkWrapper = styled(Wrapper)`
  margin-left: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text1};
  padding: 1rem;

  &:active,
  &:hover {
    color: ${({ theme }) => theme.colors.text1};
  }
`;

const Logo = styled.img`
  height: 3rem;
`;

const ROUTES = [
  {
    name: 'How it works',
    route: '/guide',
  },
  {
    name: 'Upcoming',
    route: '/upcoming',
  },
  {
    name: 'Featured Fight',
    route: '/',
  },
];

const Header: React.FC = () => (
  <Container>
    <Wrapper>
      <Link to="/">
        <Logo alt="" src={LogoIcon} />
      </Link>

      <LinkWrapper>
        {ROUTES.map((link, key) => (
          <>
            {key > 0 && (
              <Typography key={`split_${key}`} shadow type={TypographyType.REGULAR}>
                /
              </Typography>
            )}
            <StyledLink key={key} to={link.route}>
              <Typography shadow type={TypographyType.REGULAR}>
                {link.name}
              </Typography>
            </StyledLink>
          </>
        ))}
      </LinkWrapper>
    </Wrapper>

    <Wrapper>
      <WalletButton />
    </Wrapper>
  </Container>
);

export default Header;
