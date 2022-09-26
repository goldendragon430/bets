/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import CloseIcon from '../assets/images/close.svg';
import DiscordIcon from '../assets/images/discord.svg';
import EthIcon from '../assets/images/eth_icon1.svg';
import HamburgerIcon from '../assets/images/hamburger.svg';
import LogoIcon from '../assets/images/logo.svg';
import SolIcon from '../assets/images/sol_icon.svg';
import TwitterIcon from '../assets/images/twitter.svg';
import { useProfile } from '../contexts/profile_context';
import { useWallet } from '../contexts/wallet_context';
import { getNftImageUrl } from '../utils';
import LinkButton from './common/link_button';
import ProfileImage from './common/profile_image';
import Toggle from './common/toggle';
import { Typography, TypographyType } from './common/typography';
import ProfileModal from './modals/profile_modal';
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

const StyledA = styled.a`
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
  margin: 0 1rem;

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

const UserProfile = styled(ProfileImage)`
  margin: 0 1rem;
  width: 2.5rem !important;
  height: 2.5rem !important;
  min-width: 2.5rem !important;
  min-height: 2.5rem !important;
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
  {
    name: 'How it works',
    route: 'https://alphabetsgg.notion.site/alphabetsgg/How-to-Play-a21b75c6b65c4bb9828c1fd9d0962424',
    href: true,
  },
];

const Header: React.FC = () => {
  const { account } = useWallet();
  const { selNft } = useProfile();

  const [showMobileView, setShowMobileView] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleClose = () => {
    setShowMobileView(false);
  };

  const handleToggleChange = (value: number) => {
    if (value === 1 && process.env.REACT_APP_SOL_VERSION_LINK) {
      window.location.href = process.env.REACT_APP_SOL_VERSION_LINK;
    }
  };

  const handleClickProfile = () => {
    handleClose();
    setShowProfileModal(true);
  };

  const getSocialIcons = () => (
    <Flex style={{ padding: '2rem' }}>
      <Toggle
        contents={[<img alt="" src={EthIcon} />, <img alt="" src={SolIcon} />]}
        onValueChange={handleToggleChange}
        style={{ margin: '0 1rem' }}
        value={0}
      />
      <SocialIcon href="https://twitter.com/AlphaBetsGG">
        <img alt="" src={TwitterIcon} />
      </SocialIcon>
      <SocialIcon href="https://discord.gg/alphabets">
        <img alt="" src={DiscordIcon} />
      </SocialIcon>
      {account && (
        <UserProfile onClick={handleClickProfile} userImg={selNft && getNftImageUrl(selNft.rawMetadata?.image || '')} />
      )}
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
              {link.href ? (
                <StyledA href={link.route} target="_blank">
                  <Typography shadow type={TypographyType.REGULAR}>
                    {link.name}
                  </Typography>
                </StyledA>
              ) : (
                <StyledLink to={link.route}>
                  <Typography shadow type={TypographyType.REGULAR}>
                    {link.name}
                  </Typography>
                </StyledLink>
              )}
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
          {ROUTES.map((link, key) =>
            link.href ? (
              <StyledA href={link.route} key={key} onClick={handleClose} target="_blank">
                <Typography shadow type={TypographyType.REGULAR_TITLE}>
                  {link.name}
                </Typography>
              </StyledA>
            ) : (
              <StyledLink key={key} onClick={handleClose} to={link.route}>
                <Typography shadow type={TypographyType.REGULAR_TITLE}>
                  {link.name}
                </Typography>
              </StyledLink>
            )
          )}
        </MobileLinkWrapper>

        {getSocialIcons()}

        <WalletButton />

        <CloseButton alt="" onClick={handleClose} src={CloseIcon} />
      </MobileView>

      <ProfileModal onClose={() => setShowProfileModal(false)} visible={showProfileModal} />
    </Container>
  );
};

export default Header;
