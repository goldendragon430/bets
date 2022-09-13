/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import CloseIcon from '../assets/images/close.svg';
import DiscordIcon from '../assets/images/discord.svg';
import HamburgerIcon from '../assets/images/hamburger.svg';
import LogoIcon from '../assets/images/logo.svg';
import TwitterIcon from '../assets/images/twitter.svg';
import LinkButton from './common/link_button';
import { Typography, TypographyType } from './common/typography';
import WalletButton from './wallet_button';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  height: 6.25rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};

  ${({ theme }) => `${theme.media_width.upToLarge} {
    padding: 1rem;
  }`};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const LinkWrapper = styled(Flex)`
  // margin-left: 1rem;

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
  height: 2rem;
`;

const ButtonWrapper = styled(Flex)`
  ${({ theme }) => `${theme.media_width.upToMedium} {
    display: none;
  }`}
`;

const MenuButton = styled.img`
  display: none;
  cursor: pointer;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    display: block;
  }`}
`;

const SocialIcon = styled(LinkButton)`
  margin: 0 0.5rem;

  img {
    height: 2rem;
  }
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
    name: 'Main',
    route: '/',
  },
  {
    name: 'Rank',
    route: '/rank',
  },
  {
    name: 'Events',
    route: '/events',
  },
];

const Header: React.FC = () => {
  const [showMobileView, setShowMobileView] = useState(false);

  const handleClose = () => {
    setShowMobileView(false);
  };

  const getSocialIcons = () => (
    <Flex style={{ padding: '2rem' }}>
      <SocialIcon href="https://twitter.com/AlphaBetsGG">
        <img alt="" src={TwitterIcon} />
      </SocialIcon>
      <SocialIcon href="https://discord.gg/alphabets">
        <img alt="" src={DiscordIcon} />
      </SocialIcon>
    </Flex>
  );

  return (
    <Container>
      <Flex>
        <Link to="/">
          <Logo alt="" src={LogoIcon} />
        </Link>

        <LinkWrapper>
          {ROUTES.map((link, key) => (
            <Flex key={key}>
              {key > 0 && (
                <Typography shadow type={TypographyType.REGULAR}>
                  |
                </Typography>
              )}
              <StyledLink to={link.route}>
                <Typography shadow type={TypographyType.REGULAR}>
                  {link.name}
                </Typography>
              </StyledLink>
            </Flex>
          ))}
        </LinkWrapper>
      </Flex>

      <ButtonWrapper>
        {getSocialIcons()}
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

        {getSocialIcons()}

        <WalletButton />

        <CloseButton alt="" onClick={handleClose} src={CloseIcon} />
      </MobileView>
    </Container>
  );
};

export default Header;
