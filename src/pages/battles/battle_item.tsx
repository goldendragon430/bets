/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import SocialIcon1 from '../../assets/images/social1.svg';
import SocialIcon2 from '../../assets/images/social2.svg';
import LinkButton from '../../components/common/link_button';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { useBetContract } from '../../hooks/useContract';
import { BattleInfo } from '../../types';
import { getBattleBetInfo, getChanceValue } from '../../utils/battle';
import TeamItem from './team_item';

const Container = styled.div`
  border: 0.25rem solid ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 1rem ${({ theme }) => theme.colors.white};
  width: 100%;
  margin: 2rem 1rem;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusText = styled(Typography)<{ textColor: string }>`
  -webkit-text-stroke: 2px ${({ textColor }) => textColor};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  white-space: nowrap;
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 1rem;
`;

const InfoWrapper = styled(TeamWrapper)`
  flex: 2;
`;

const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  img {
    height: 2rem;
  }
`;

const SocialButton = styled(LinkButton)`
  margin: 0 1rem;
`;

const WinnerWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 5rem;
  }
`;

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
  const [chanceA, setChanceA] = useState(0);
  const [chanceB, setChanceB] = useState(0);

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

  useEffect(() => {
    setChanceA(getChanceValue(totalBetAmountA, totalBetAmountB, totalNftStakedA, totalNftStakedB, false));
    setChanceB(getChanceValue(totalBetAmountA, totalBetAmountB, totalNftStakedA, totalNftStakedB, true));
  }, [totalBetAmountA, totalBetAmountB, totalNftStakedA, totalNftStakedB]);

  return (
    <Container onClick={() => navigate(`/battle/${battleInfo.id}`)}>
      <Content>
        <TeamItem
          chance={Math.round(chanceA * 100)}
          color={theme.colors.orange1}
          ethStaked={totalBetAmountA}
          firstTeam
          nftStaked={totalNftStakedA}
          project={battleInfo.projectL}
          winner={winner}
          winnerSet={winnerSet}
        />

        <TeamItem
          chance={chanceB > 0 ? 100 - Math.round(chanceA * 100) : 0}
          color={theme.colors.blue1}
          ethStaked={totalBetAmountB}
          nftStaked={totalNftStakedB}
          project={battleInfo.projectR}
          winner={winner}
          winnerSet={winnerSet}
        />
      </Content>

      <Content>
        <TeamWrapper>
          <Typography color={theme.colors.orange1} shadow type={TypographyType.BOLD_TITLE}>
            {battleInfo.projectL.subName}
          </Typography>
          <SocialWrapper>
            <SocialButton href={battleInfo.projectL.twitterID}>
              <img alt="" src={SocialIcon1} />
            </SocialButton>
            <SocialButton href={battleInfo.projectL.openSeaLink}>
              <img alt="" src={SocialIcon2} />
            </SocialButton>
            {/* <img alt="" src={SocialIcon3} /> */}
          </SocialWrapper>
        </TeamWrapper>

        <InfoWrapper>
          <StatusText
            textColor={winnerSet ? (winner ? theme.colors.blue1 : theme.colors.orange1) : theme.colors.white}
            type={TypographyType.BOLD_SUBTITLE}
          >
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

          {!refundStatus && winnerSet && (
            <WinnerWrapper>
              <img alt="" src={EthIcon} />
              <Typography type={TypographyType.BOLD_TITLE}>
                {(totalBetAmountA + totalBetAmountB).toLocaleString()}
              </Typography>
            </WinnerWrapper>
          )}
        </InfoWrapper>

        <TeamWrapper>
          <Typography color={theme.colors.blue1} shadow type={TypographyType.BOLD_TITLE}>
            {battleInfo.projectR.subName}
          </Typography>
          <SocialWrapper>
            <SocialButton href={battleInfo.projectR.twitterID}>
              <img alt="" src={SocialIcon1} />
            </SocialButton>
            <SocialButton href={battleInfo.projectR.openSeaLink}>
              <img alt="" src={SocialIcon2} />
            </SocialButton>
            {/* <img alt="" src={SocialIcon3} /> */}
          </SocialWrapper>
        </TeamWrapper>
      </Content>
    </Container>
  );
};

export default BattleItem;
