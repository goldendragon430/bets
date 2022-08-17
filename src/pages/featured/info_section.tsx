import Countdown from 'react-countdown';

import styled from 'styled-components';

import Chart from '../../components/chart';
import { Typography, TypographyType } from '../../components/common/typography';
import { useBet } from '../../contexts/bet_context';
import { useTheme } from '../../contexts/theme_context';

const InfoWrapper = styled.div`
  flex: 1;
  z-index: 1;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 100%;
  }`}
`;

const NumberText = styled(Typography)`
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  white-space: nowrap;
  padding: 0.8rem 0;
  height: 7rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

const ChanceWrapper = styled(Wrapper)`
  background: linear-gradient(
    90deg,
    ${({ theme }) => `${theme.colors.red1}80`} 0%,
    rgba(0, 0, 0, 0) 50%,
    ${({ theme }) => `${theme.colors.blue1}80`} 100%
  );
  width: 100%;
`;

const LeftTeam = styled.div`
  flex: 1;
  text-align: right;

  p {
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
    font-size: 2rem;
  }
`;

const Stats = styled.div<{ color: string }>`
  width: 100%;
  background: ${({ color }) => `${color}80`};
  box-shadow: 0px 0px 1rem ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;

  p {
    text-transform: none;
  }
`;

const InfoSection = () => {
  const { theme } = useTheme();
  const { getRewardPotential, getChance, totalBetAmountA, totalBetAmountB, endTime } = useBet();

  const chanceA = getChance(false);
  const chanceB = getChance(true);

  return (
    <InfoWrapper>
      <NumberText type={TypographyType.BOLD_TITLE}>
        {endTime > 0 && (
          <Countdown date={endTime * 1000}>
            <span>Expired!</span>
          </Countdown>
        )}
      </NumberText>

      <Wrapper>
        <LeftTeam>
          <Stats color={theme.colors.red1}>
            <Typography type={TypographyType.BOLD_SUBTITLE}>{getRewardPotential(false).toFixed(2)}x</Typography>
          </Stats>
        </LeftTeam>
        <MidTeam>
          <Typography type={TypographyType.REGULAR_BODY}>reward potential</Typography>
        </MidTeam>
        <RightTeam>
          <Stats color={theme.colors.blue1}>
            <Typography type={TypographyType.BOLD_SUBTITLE}>{getRewardPotential(true).toFixed(2)}x</Typography>
          </Stats>
        </RightTeam>
      </Wrapper>

      <ChanceWrapper>
        <LeftTeam>
          <Typography type={TypographyType.BOLD_SUBTITLE}>{Math.round(chanceA * 100)}%</Typography>
        </LeftTeam>
        <MidTeam>
          <Typography type={TypographyType.REGULAR_BODY}>chances</Typography>
        </MidTeam>
        <RightTeam>
          <Typography type={TypographyType.BOLD_SUBTITLE}>
            {chanceB > 0 ? 100 - Math.round(chanceA * 100) : 0}%
          </Typography>
        </RightTeam>
      </ChanceWrapper>

      <Wrapper>
        <Chart
          prize={totalBetAmountA + totalBetAmountB}
          value={chanceA === 0 && chanceB === 0 ? 50 : Math.round(chanceA * 100)}
        />
      </Wrapper>
    </InfoWrapper>
  );
};

export default InfoSection;
