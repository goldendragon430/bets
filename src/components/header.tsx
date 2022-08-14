/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import CloseIcon from '../assets/images/close.svg';
import EthIcon from '../assets/images/eth_icon.svg';
import HamburgerIcon from '../assets/images/hamburger.svg';
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};

  ${({ theme }) => `${theme.media_width.upToMedium} {
    padding: 1rem 2rem;
  }`};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const LinkWrapper = styled(Flex)`
  margin-left: 1rem;

  ${({ theme }) => `${theme.media_width.upToSmall} {
    display: none;
  }`}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text1};
  padding: 1rem;
  white-space: nowrap;

  &:active,
  &:hover {
    color: ${({ theme }) => theme.colors.text1};
  }
`;

const Logo = styled.img`
  height: 3rem;
`;

const ButtonWrapper = styled(Flex)`
  ${({ theme }) => `${theme.media_width.upToMedium} {
    display: none;
  }`}
`;

const BalanceImg = styled.img`
  height: 5rem;
`;

const MenuButton = styled.img`
  display: none;
  cursor: pointer;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    display: block;
  }`}
`;

const MobileView = styled.div<{ show: boolean }>`
  display: none;
  background: ${({ theme }) => theme.colors.black};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ theme, show }) => `${theme.media_width.upToLarge} {
    display: ${show ? 'flex' : 'none'};
  }`}
`;

const MobileLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.img`
  cursor: pointer;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 4rem;
  right: calc(4rem + 12px);
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

const Header: React.FC = () => {
  const [showMobileView, setShowMobileView] = useState(false);

  const handleClose = () => {
    setShowMobileView(false);
  };

  return (
    <Container>
      <Flex>
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
      </Flex>

      <ButtonWrapper>
        <Flex style={{ marginRight: '1rem' }}>
          <BalanceImg alt="" src={EthIcon} />
          <Typography shadow type={TypographyType.BOLD_TITLE}>
            3.25
          </Typography>
        </Flex>
        <WalletButton />
      </ButtonWrapper>

      <MenuButton alt="" onClick={() => setShowMobileView(true)} src={HamburgerIcon} />

      <MobileView show={showMobileView}>
        <MobileLinkWrapper>
          {ROUTES.map((link, key) => (
            <StyledLink key={key} onClick={handleClose} to={link.route}>
              <Typography shadow type={TypographyType.REGULAR_TITLE}>
                {link.name}
              </Typography>
            </StyledLink>
          ))}
        </MobileLinkWrapper>

        <Flex style={{ marginBottom: '1rem', paddingRight: '1rem' }}>
          <BalanceImg alt="" src={EthIcon} />
          <Typography shadow type={TypographyType.BOLD_TITLE}>
            3.25
          </Typography>
        </Flex>

        <WalletButton />

        <CloseButton alt="" onClick={handleClose} src={CloseIcon} />
      </MobileView>
    </Container>
  );
};

export default Header;
