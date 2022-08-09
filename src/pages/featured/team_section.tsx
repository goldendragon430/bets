/* eslint-disable no-console */
import React from 'react';

import styled from 'styled-components';

import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';

const TeamWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 1.5rem 0;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 60%;
  }`}
`;

const TeamImageWrapper = styled.div<{ firstTeam?: boolean; color: string }>`
  width: 125%;
  transform: translateX(${({ firstTeam }) => (firstTeam ? '-20%' : '0')});
  border: 0.5rem solid ${({ color }) => color};
  padding: 2rem;

  img {
    width: 100%;
  }

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 100%;
    transform: translateX(0);
  }`}
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  button {
    flex: 1;
    margin: 0.5rem;
  }
`;

interface ITeamSection {
  firstTeam?: boolean;
  color: string;
  teamName: string;
  teamImg: string;
  onBet: () => void;
  onStake: () => void;
}

const TeamSection: React.FC<ITeamSection> = ({ firstTeam, color, teamName, teamImg, onBet, onStake }) => (
  <TeamWrapper>
    <Typography
      color={color}
      shadow
      style={{ textAlign: firstTeam ? 'right' : 'left' }}
      type={TypographyType.BOLD_TITLE}
    >
      {teamName}
    </Typography>

    <TeamImageWrapper color={color} firstTeam={firstTeam}>
      <img alt="" src={teamImg} />
    </TeamImageWrapper>

    <ButtonWrapper>
      <Button color={color} onClick={onStake}>
        Stake
      </Button>
      <Button color={color} onClick={onBet}>
        Bet
      </Button>
    </ButtonWrapper>
  </TeamWrapper>
);

export default TeamSection;
