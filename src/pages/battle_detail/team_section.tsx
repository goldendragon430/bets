/* eslint-disable no-console */
import React from 'react';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import SocialIcon1 from '../../assets/images/social1.svg';
import SocialIcon2 from '../../assets/images/social2.svg';
// import SocialIcon3 from '../../assets/images/social3.svg';
import Button from '../../components/common/button';
import LinkButton from '../../components/common/link_button';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { useWallet } from '../../contexts/wallet_context';
import { BattleInfo, ProjectInfo } from '../../types';
import { isInProgress } from '../../utils';

const TeamWrapper = styled.div`
  flex: 1;
  // overflow: hidden;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 60%;
  }`}
`;

const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 6rem;
`;

const StatsItem = styled.div`
  display: flex;
  align-items: center;
`;

const TeamImageWrapper = styled.div<{ color: string; image: string }>`
  width: 100%;
  border: 0.5rem solid ${({ color }) => color};
  position: relative;
  margin-bottom: 1rem;
  background-image: url(${({ image }) => image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;

  button {
    flex: 1;
    margin: 0.5rem;
    padding: 0.4rem 0.6rem;
    font-size: 1rem;
  }
`;

const TeamLogo = styled.img<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
  margin: 0.5rem;
`;

const EthImg = styled.img`
  height: 2rem;
  transform: scale(1.5);
`;

const NumberText = styled(Typography)`
  font-size: 1.5rem;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    font-size: 1.875rem;
  }`}
`;

const SocialWrapper = styled.div<{ firstTeam?: boolean }>`
  border-top: 1px solid ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: ${({ firstTeam }) => (firstTeam ? 'flex-end' : 'flex-start')};
  padding: 1rem 0;

  img {
    height: 2rem;
    ${({ firstTeam }) => (firstTeam ? 'margin-left: 1rem;' : 'margin-right: 1rem;')}
  }
`;

interface ITeamSection {
  firstTeam?: boolean;
  color: string;
  battleInfo: BattleInfo;
  project: ProjectInfo;
  nftStaked: number;
  ethStaked: number;
  onBet: () => void;
  onStake: () => void;
}

const TeamSection: React.FC<ITeamSection> = ({
  firstTeam,
  color,
  battleInfo,
  project,
  nftStaked,
  ethStaked,
  onBet,
  onStake,
}) => {
  const { theme } = useTheme();
  const { account } = useWallet();

  return (
    <TeamWrapper>
      <StatsWrapper>
        <StatsItem>
          <NumberText type={TypographyType.REGULAR}>{nftStaked.toLocaleString()}</NumberText>
          <TeamLogo alt="" color={color} src={project.logo} />
        </StatsItem>
        <StatsItem>
          <NumberText type={TypographyType.REGULAR}>{ethStaked.toLocaleString()}</NumberText>
          <EthImg alt="" src={EthIcon} />
        </StatsItem>
      </StatsWrapper>

      <TeamImageWrapper color={color} image={project.headerImage}>
        <div style={{ padding: '50%' }} />
        <ButtonWrapper>
          <Button
            color={color}
            disabled={!isInProgress(new Date(battleInfo.startDate), new Date(battleInfo.endDate)) || !account}
            fontColor={theme.colors.black}
            onClick={onStake}
          >
            Stake
          </Button>
          <Button
            color={color}
            disabled={!isInProgress(new Date(battleInfo.startDate), new Date(battleInfo.endDate)) || !account}
            fontColor={theme.colors.black}
            onClick={onBet}
          >
            Bet
          </Button>
        </ButtonWrapper>
      </TeamImageWrapper>

      <Typography
        color={color}
        shadow
        style={{ textAlign: firstTeam ? 'right' : 'left' }}
        type={TypographyType.BOLD_TITLE}
      >
        {project.subName}
      </Typography>

      <SocialWrapper firstTeam={firstTeam}>
        <LinkButton href={project.twitterID}>
          <img alt="" src={SocialIcon1} />
        </LinkButton>
        <LinkButton href={project.openSeaLink}>
          <img alt="" src={SocialIcon2} />
        </LinkButton>
        {/* <img alt="" src={SocialIcon3} /> */}
      </SocialWrapper>
    </TeamWrapper>
  );
};

export default TeamSection;
