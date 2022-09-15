/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { useBetContract } from '../../hooks/useContract';
import { BattleInfo, ProjectInfo } from '../../types';
import { getBattleBetInfo } from '../../utils/battle';

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 0.75rem;
  width: 100%;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const TeamWrapper = styled.div<{ firstTeam?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;

  ${({ firstTeam }) =>
    !firstTeam &&
    `
    flex-direction: row-reverse;
  `}
`;

const TeamImageWrapper = styled.div<{ color: string; image: string }>`
  width: 6rem;
  height: 6rem;
  border: 0.25rem solid ${({ color }) => color};
  background-image: url(${({ image }) => image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StatsItem = styled.div<{ firstTeam?: boolean }>`
  display: flex;
  align-items: center;
  margin: 0 1rem;

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

const InfoWrapper = styled.div`
  flex: 1;
`;

const StatusText = styled(Typography)`
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  white-space: nowrap;
`;

interface ITeamItem {
  color: string;
  project: ProjectInfo;
  ethStaked: number;
  nftStaked: number;
  firstTeam?: boolean;
}

const TeamItem: React.FC<ITeamItem> = ({ color, project, ethStaked, nftStaked, firstTeam }) => (
  <TeamWrapper firstTeam={firstTeam}>
    <TeamImageWrapper color={color} image={project.headerImage} />
    <div>
      <StatsItem firstTeam={firstTeam}>
        <NumberText type={TypographyType.REGULAR}>{nftStaked.toLocaleString()}</NumberText>
        <TeamLogo alt="" color={color} src={project.logo} />
      </StatsItem>
      <StatsItem firstTeam={firstTeam}>
        <NumberText type={TypographyType.REGULAR}>{ethStaked.toLocaleString()}</NumberText>
        <EthImg alt="" src={EthIcon} />
      </StatsItem>
    </div>
  </TeamWrapper>
);

interface IBattleItem {
  battleInfo: BattleInfo;
}

const BattleItem: React.FC<IBattleItem> = ({ battleInfo }) => {
  const betContract = useBetContract();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [totalBetAmountA, setTotalBetAmountA] = useState(0);
  const [totalBetAmountB, setTotalBetAmountB] = useState(0);
  const [totalNftStakedA, setTotalNftStakedA] = useState(0);
  const [totalNftStakedB, setTotalNftStakedB] = useState(0);
  const [winnerSet, setWinnerSet] = useState(false);
  const [winner, setWinner] = useState(false);
  const [refundStatus, setRefundStatus] = useState(false);

  const updateBetInfo = useCallback(async () => {
    const res = await getBattleBetInfo(betContract, battleInfo);

    if (res.totalBetAmountA !== undefined) {
      setTotalBetAmountA(res.totalBetAmountA);
    }
    if (res.totalBetAmountB !== undefined) {
      setTotalBetAmountB(res.totalBetAmountB);
    }
    if (res.totalNftStakedA !== undefined) {
      setTotalNftStakedA(res.totalNftStakedA);
    }
    if (res.totalNftStakedB !== undefined) {
      setTotalNftStakedB(res.totalNftStakedB);
    }
    if (res.winnerSet !== undefined) {
      setWinnerSet(res.winnerSet);
    }
    if (res.winner !== undefined) {
      setWinner(res.winner);
    }
    if (res.refundStatus !== undefined) {
      setRefundStatus(res.refundStatus);
    }
  }, [betContract, battleInfo]);

  useEffect(() => {
    updateBetInfo();
  }, [betContract, battleInfo]);

  return (
    <Container onClick={() => navigate(`/battle/${battleInfo.id}`)}>
      <TeamItem
        color={theme.colors.orange1}
        ethStaked={totalBetAmountA}
        firstTeam
        nftStaked={totalNftStakedA}
        project={battleInfo.projectL}
      />

      <InfoWrapper>
        <StatusText type={TypographyType.BOLD_SUBTITLE}>
          {refundStatus ? (
            <span>Refund Active</span>
          ) : new Date(battleInfo.startDate) > new Date() ? (
            <span>Not Started</span>
          ) : (
            <Countdown date={new Date(battleInfo.endDate)}>
              <span>
                {winnerSet
                  ? !winner
                    ? `${battleInfo?.projectL.subName} wins`
                    : `${battleInfo?.projectR.subName} wins`
                  : 'Finalizing...'}
              </span>
            </Countdown>
          )}
        </StatusText>
      </InfoWrapper>

      <TeamItem
        color={theme.colors.blue1}
        ethStaked={totalBetAmountB}
        nftStaked={totalNftStakedB}
        project={battleInfo.projectR}
      />
    </Container>
  );
};

export default BattleItem;
