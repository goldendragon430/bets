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
import { ProjectInfo } from '../../types';
import { isExpired } from '../../utils';

const TeamWrapper = styled.div`
  flex: 1;
  overflow: hidden;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 60%;
  }`}
`;

const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StatsItem = styled.div`
  display: flex;
  align-items: center;
`;

const TeamImageWrapper = styled.div<{ color: string }>`
  width: 100%;
  border: 0.5rem solid ${({ color }) => color};
  position: relative;
  margin-bottom: 1rem;

  img {
    width: 100%;
  }
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
  }
`;

const TeamLogo = styled.img<{ color: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
  margin: 1rem;
`;

const EthImg = styled.img`
  height: 6rem;
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
  project: ProjectInfo;
  nftStaked: number;
  ethStaked: number;
  endTime: number;
  onBet: () => void;
  onStake: () => void;
}

const TeamSection: React.FC<ITeamSection> = ({
  firstTeam,
  color,
  project,
  nftStaked,
  ethStaked,
  endTime,
  onBet,
  onStake,
}) => {
  const { theme } = useTheme();
  const { account } = useWallet();

  return (
    <TeamWrapper>
      <StatsWrapper>
        <StatsItem>
          <Typography type={TypographyType.REGULAR_TITLE}>{nftStaked.toLocaleString()}</Typography>
          <TeamLogo alt="" color={color} src={project.logo} />
        </StatsItem>
        <StatsItem>
          <Typography type={TypographyType.REGULAR_TITLE}>{ethStaked.toLocaleString()}</Typography>
          <EthImg alt="" src={EthIcon} />
        </StatsItem>
      </StatsWrapper>

      <TeamImageWrapper color={color}>
        <img alt="" src={project.headerImage} />
        <ButtonWrapper>
          <Button
            color={color}
            disabled={isExpired(endTime) || !account}
            fontColor={firstTeam ? theme.colors.white : theme.colors.black}
            onClick={onStake}
          >
            Stake
          </Button>
          <Button
            color={color}
            disabled={isExpired(endTime) || !account}
            fontColor={firstTeam ? theme.colors.white : theme.colors.black}
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
