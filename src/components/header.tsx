/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import CloseIcon from '../assets/images/close.svg';
import DiscordIcon from '../assets/images/discord.svg';
import EthIcon from '../assets/images/eth_icon.svg';
import HamburgerIcon from '../assets/images/hamburger.svg';
import LogoIcon from '../assets/images/logo.svg';
import TeamLogo1 from '../assets/images/team_logo1.jpeg';
import TeamLogo2 from '../assets/images/team_logo2.jpeg';
import TwitterIcon from '../assets/images/twitter.svg';
import { useBet } from '../contexts/bet_context';
import { useTheme } from '../contexts/theme_context';
import { useWallet } from '../contexts/wallet_context';
import { Typography, TypographyType } from './common/typography';
import MyBetModal from './modals/my_bet_modal';
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

  ${({ theme }) => `${theme.media_width.upToLarge} {
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

const MenuButton = styled.img`
  display: none;
  cursor: pointer;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    display: block;
  }`}
`;

const SocialIcon = styled.img`
  height: 2rem;
  margin: 0 0.5rem;
  cursor: pointer;
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

const BalanceWrapper = styled(Flex)`
  margin-left: 1rem;
  cursor: pointer;
`;

const BalanceImg = styled.img`
  height: 4rem;
`;

const ROUTES = [
  {
    name: 'Featured Fight',
    route: '/',
  },
  {
    name: 'Mint NFT',
    route: '/mint-nft',
  },
];

const Header: React.FC = () => {
  const { balance } = useWallet();
  const { theme } = useTheme();
  const { userBetAmountA, userBetAmountB } = useBet();

  const [showMobileView, setShowMobileView] = useState(false);
  const [showBetModal, setShowBetModal] = useState(false);

  const handleClose = () => {
    setShowMobileView(false);
  };

  const getSocialIcons = () => (
    <Flex style={{ padding: '2rem 1rem' }}>
      <SocialIcon alt="" src={TwitterIcon} />
      <SocialIcon alt="" src={DiscordIcon} />
      <BalanceWrapper onClick={() => setShowBetModal(true)}>
        <Typography shadow type={TypographyType.BOLD_SUBTITLE}>
          {balance.toLocaleString()}
        </Typography>
        <BalanceImg alt="" src={EthIcon} />
      </BalanceWrapper>
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
                  /
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

      <MyBetModal
        onClose={() => setShowBetModal(false)}
        teamA={{ logo: TeamLogo1, ethStaked: userBetAmountA, nftStaked: 0, color: theme.colors.red1 }}
        teamB={{ logo: TeamLogo2, ethStaked: userBetAmountB, nftStaked: 0, color: theme.colors.blue1 }}
        visible={showBetModal}
      />
    </Container>
  );
};

export default Header;
