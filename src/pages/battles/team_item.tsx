import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import { Typography, TypographyType } from '../../components/common/typography';
import { ProjectInfo } from '../../types';

const TeamWrapper = styled.div<{ firstTeam?: boolean; winnerSet: boolean; isWinner: boolean; color: string }>`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 1rem;
  ${({ winnerSet, isWinner, color, firstTeam, theme }) =>
    winnerSet && isWinner
      ? `
      border-bottom: 2px solid ${color};
      ${firstTeam ? `border-right: 2px solid ${color};` : `border-left: 2px solid ${color};`}
    `
      : `
      border-bottom: 1px solid ${theme.colors.white};
      ${!winnerSet && firstTeam && `border-right: 1px solid ${theme.colors.white};`}
    `};

  ${({ firstTeam }) =>
    !firstTeam &&
    `
    flex-direction: row-reverse;
    text-align: right;
  `}
`;

const TeamImageWrapper = styled.div<{ color: string; image: string }>`
  width: 12rem;
  height: 12rem;
  border: 0.25rem solid ${({ color }) => color};
  background-image: url(${({ image }) => image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 2rem;
`;

const StatsWrapper = styled.div``;

const StatsItem = styled.div<{ firstTeam?: boolean }>`
  display: flex;
  align-items: center;
  margin: 1rem 2rem;

  ${({ firstTeam }) =>
    !firstTeam &&
    `
  justify-content: flex-end;
`}
`;

const NumberText = styled(Typography)`
  font-size: 1.5rem;

  ${({ theme }) => `${theme.media_width.upToMedium} {
  font-size: 1.875rem;
}`}
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

interface ITeamItem {
  color: string;
  project: ProjectInfo;
  ethStaked: number;
  nftStaked: number;
  chance: number;
  winnerSet: boolean;
  winner: boolean;
  firstTeam?: boolean;
  upcoming?: boolean;
}

const TeamItem: React.FC<ITeamItem> = ({
  color,
  project,
  ethStaked,
  nftStaked,
  chance,
  winner,
  winnerSet,
  firstTeam,
  upcoming,
}) => (
  <TeamWrapper color={color} firstTeam={firstTeam} isWinner={winnerSet && winner === !firstTeam} winnerSet={winnerSet}>
    <TeamImageWrapper color={color} image={project.headerImage} />
    {upcoming ? (
      <StatsWrapper>
        <StatsItem firstTeam={firstTeam}>
          <NumberText type={TypographyType.REGULAR}>{project.collectionSize.toLocaleString()} items</NumberText>
        </StatsItem>
        <StatsItem firstTeam={firstTeam}>
          <NumberText type={TypographyType.REGULAR}>{project.num_owners.toLocaleString()} owners</NumberText>
        </StatsItem>
        <StatsItem firstTeam={firstTeam}>
          <NumberText type={TypographyType.REGULAR}>{project.floor_price} floor price</NumberText>
        </StatsItem>
      </StatsWrapper>
    ) : (
      <StatsWrapper>
        <StatsItem firstTeam={firstTeam}>
          <NumberText type={TypographyType.REGULAR}>{nftStaked.toLocaleString()}</NumberText>
          <TeamLogo alt="" color={color} src={project.logo} />
        </StatsItem>
        <StatsItem firstTeam={firstTeam}>
          <NumberText type={TypographyType.REGULAR}>{ethStaked.toLocaleString()}</NumberText>
          <EthImg alt="" src={EthIcon} />
        </StatsItem>
        <StatsItem firstTeam={firstTeam}>
          <NumberText type={TypographyType.REGULAR}>{chance}%</NumberText>
        </StatsItem>
      </StatsWrapper>
    )}
  </TeamWrapper>
);

export default TeamItem;
