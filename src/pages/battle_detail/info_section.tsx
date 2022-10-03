/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Chart from '../../components/chart';
import Button from '../../components/common/button';
import NumberText from '../../components/common/number_text';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { useWallet } from '../../contexts/wallet_context';
import { BattleDetailType } from '../../types';
import { isInProgress } from '../../utils';
import { getChanceValue } from '../../utils/battle';

const InfoWrapper = styled.div`
  flex: 1;
  z-index: 1;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }`}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    margin: 0;
  }`};
`;

const ChanceWrapper = styled(Wrapper)`
  background: linear-gradient(
    90deg,
    ${({ theme }) => `${theme.colors.orange1}80`} 0%,
    rgba(0, 0, 0, 0) 50%,
    ${({ theme }) => `${theme.colors.blue1}80`} 100%
  );
  width: 100%;
`;

const LeftTeam = styled.div`
  flex: 1;
  text-align: right;

  p {
    text-transform: none;
    font-size: 2rem;
  }
`;

const MidTeam = styled.div`
  flex: 1.2;
  text-align: center;
  padding: 0 0.5rem;
  p {
    text-transform: uppercase;
    font-style: italic;
  }
`;

const RightTeam = styled.div`
  flex: 1;
  text-align: left;

  p {
    text-transform: none;
    font-size: 2rem;
  }
`;

const StyledA = styled.a`
  color: ${({ theme }) => theme.colors.white};
`;

const NumberTextWrapper = styled(NumberText)`
  margin-bottom: 3rem;
  ${({ theme }) => `${theme.media_width.upToMedium} {
    margin-bottom: 0;
    display: none !important;
  }`};
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartWrapper = styled(Wrapper)`
  width: 80%;
  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 40%;
  }`}
`;

const ButtonWrapper = styled.div`
  width: 25%;
  margin: 0 2%;
  display: none;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    display: flex;
  }`}

  button {
    width: 100%;
    margin: 0.5rem 0;
  }
`;

interface IInfoSection extends BattleDetailType {
  onBet: (firstTeam: boolean) => void;
  onStake: (firstTeam: boolean) => void;
}

const InfoSection: React.FC<IInfoSection> = ({
  getRewardPotential,
  totalBetAmountA,
  totalBetAmountB,
  totalNftStakedA,
  totalNftStakedB,
  winnerSet,
  winner,
  battleInfo,
  refundStatus,
  onBet,
  onStake,
}) => {
  const { theme } = useTheme();
  const { account } = useWallet();

  const [chanceA, setChanceA] = useState(0);
  const [chanceB, setChanceB] = useState(0);

  useEffect(() => {
    setChanceA(getChanceValue(totalBetAmountA, totalBetAmountB, totalNftStakedA, totalNftStakedB, false));
    setChanceB(getChanceValue(totalBetAmountA, totalBetAmountB, totalNftStakedA, totalNftStakedB, true));
  }, [totalBetAmountA, totalBetAmountB, totalNftStakedA, totalNftStakedB]);

  return (
    <InfoWrapper>
      <NumberTextWrapper battleInfo={battleInfo} refundStatus={refundStatus} winner={winner} winnerSet={winnerSet} />

      <ChanceWrapper>
        <LeftTeam>
          <Typography type={TypographyType.BOLD_SUBTITLE}>{getRewardPotential(false, 0).toFixed(2)}x</Typography>
        </LeftTeam>
        <MidTeam>
          <Typography type={TypographyType.REGULAR_BODY}>
            <StyledA
              href="https://alphabetsgg.notion.site/alphabetsgg/How-to-Play-a21b75c6b65c4bb9828c1fd9d0962424#d1584553cf974f54b3384ae3a188e173"
              target="_blank"
            >
              reward potential
            </StyledA>
          </Typography>
        </MidTeam>
        <RightTeam>
          <Typography type={TypographyType.BOLD_SUBTITLE}>{getRewardPotential(true, 0).toFixed(2)}x</Typography>
        </RightTeam>
      </ChanceWrapper>

      <ChanceWrapper>
        <LeftTeam>
          <Typography type={TypographyType.BOLD_SUBTITLE}>{Math.round(chanceA * 100)}%</Typography>
        </LeftTeam>
        <MidTeam>
          <Typography type={TypographyType.REGULAR_BODY}>
            <StyledA
              href="https://alphabetsgg.notion.site/alphabetsgg/How-to-Play-a21b75c6b65c4bb9828c1fd9d0962424#46563f41d1e0442f8ad3bd725fae2785"
              target="_blank"
            >
              chances
            </StyledA>
          </Typography>
        </MidTeam>
        <RightTeam>
          <Typography type={TypographyType.BOLD_SUBTITLE}>
            {chanceB > 0 ? 100 - Math.round(chanceA * 100) : 0}%
          </Typography>
        </RightTeam>
      </ChanceWrapper>

      <BottomWrapper>
        {battleInfo && account && (
          <ButtonWrapper>
            <Button
              color={theme.colors.orange1}
              disabled={!isInProgress(new Date(battleInfo.startDate), new Date(battleInfo.endDate))}
              fontColor={theme.colors.black}
              onClick={() => onStake(true)}
            >
              Stake
            </Button>
            <Button
              color={theme.colors.orange1}
              disabled={!isInProgress(new Date(battleInfo.startDate), new Date(battleInfo.endDate))}
              fontColor={theme.colors.black}
              onClick={() => onBet(true)}
            >
              Bet
            </Button>
          </ButtonWrapper>
        )}

        <ChartWrapper>
          <Chart
            prize={totalBetAmountA + totalBetAmountB}
            value={chanceA === 0 && chanceB === 0 ? 50 : Math.round(chanceA * 100)}
          />
        </ChartWrapper>

        {battleInfo && account && (
          <ButtonWrapper>
            <Button
              color={theme.colors.blue1}
              disabled={!isInProgress(new Date(battleInfo.startDate), new Date(battleInfo.endDate))}
              fontColor={theme.colors.black}
              onClick={() => onStake(false)}
            >
              Stake
            </Button>
            <Button
              color={theme.colors.blue1}
              disabled={!isInProgress(new Date(battleInfo.startDate), new Date(battleInfo.endDate))}
              fontColor={theme.colors.black}
              onClick={() => onBet(false)}
            >
              Bet
            </Button>
          </ButtonWrapper>
        )}
      </BottomWrapper>
    </InfoWrapper>
  );
};

export default InfoSection;
