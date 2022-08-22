/* eslint-disable react/no-array-index-key */
import { useCallback, useMemo } from 'react';

import styled from 'styled-components';

import EthIcon from '../assets/images/eth_icon.svg';
import { useTheme } from '../contexts/theme_context';
import { Typography, TypographyType } from './common/typography';

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 50%;
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
`;

const ChartFrame1 = styled(Circle)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.black};
  // box-shadow: 0px 0px 44px ${({ theme }) => theme.colors.purple1};
`;

const ChartWrapper = styled(Circle)`
  @keyframes rotating {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  width: 90%;
  height: 90%;
  animation: rotating 20s linear infinite;
`;

const PieBg = styled(Circle)<{ color: string }>`
  width: 100%;
  height: 100%;
  background: ${({ color }) => color};
`;

const PiePiece = styled(Circle)<{ color: string; value: number; angle: number }>`
  width: 100%;
  height: 100%;
  background: ${({ color }) => color};
  clip-path: polygon(50% 50%, 50% 0%, ${({ value }) => 50 + 50 * Math.tan((value * Math.PI) / 180)}% 0%);
  transform: translate(-50%, -50%) rotate(${({ angle }) => `${angle}deg`});
`;

const PieLine = styled.div<{ angle: number }>`
  position: absolute;
  top: 0;
  left: 50%;
  height: 50%;
  background: ${({ theme }) => `${theme.colors.grey1}10`};
  border: 1px solid ${({ theme }) => `${theme.colors.grey1}20`};
  box-shadow: 0px 0px 11px ${({ theme }) => theme.colors.grey1}, inset 0px 0px 11px ${({ theme }) => theme.colors.grey1};
  transform: rotate(${({ angle }) => `${angle}deg`});
  transform-origin: bottom center;
`;

const PieShadow = styled(Circle)`
  width: 100%;
  height: 100%;
  box-shadow: inset 0px 4px 33px ${({ theme }) => theme.colors.grey1};
`;

const ChartFrame3 = styled(Circle)`
  width: 60%;
  height: 60%;
  background: ${({ theme }) => theme.colors.black};
`;

const EthImg = styled.img`
  position: absolute;
  width: 20%;
  height: 20%;
  top: 25%;
  left: 40%;
`;

const BoldText = styled(Typography)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ValueText = styled(BoldText)`
  top: 50%;
  font-size: 3rem;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    font-size: 5rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToExtraSmall} {
    font-size: 4rem;
  }`}
`;

const PrizeText = styled(BoldText)`
  top: 62%;
  font-size: 2rem;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    font-size: 3.5rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToExtraSmall} {
    font-size: 3rem;
  }`}
`;

interface IChart {
  value: number;
  prize: number;
}

const Chart: React.FC<IChart> = ({ value, prize }) => {
  const { theme } = useTheme();

  const getPieceCount = useCallback(() => {
    const redValue = Math.max(Math.min(Number(value) || 0, 100), 0);
    if (redValue <= 12.5 || redValue >= 87.5) {
      return 2;
    }
    if (redValue <= 25 || redValue >= 75) {
      return 4;
    }
    return 8;
  }, [value]);

  const getDataByIndex = useCallback(
    (index: number) => {
      let redValue = Math.max(Math.min(Number(value) || 0, 100), 0);
      redValue = Math.max(Math.min(redValue, 96), 4);

      const pieceAngle = 360 / getPieceCount();
      const isRed = redValue > 50;

      const multiplier = 8 / getPieceCount();

      redValue = (isRed ? redValue - (100 - 100 / multiplier) : redValue) * multiplier;

      const color = index % 2 === 0 ? theme.colors.green1 : theme.colors.blue1;
      const pieceValue = index % 2 === 0 ? (pieceAngle / 100) * redValue : (pieceAngle / 100) * (100 - redValue);
      const angle = pieceAngle * Math.floor(index / 2) + (index % 2 === 0 ? 0 : (pieceAngle / 100) * redValue);

      return {
        color,
        value: pieceValue / multiplier,
        angle: angle / multiplier,
      };
    },
    [value, theme, getPieceCount]
  );

  const data = useMemo(
    () => new Array(getPieceCount() * 2).fill(0).map((_, index) => getDataByIndex(index)),
    [getPieceCount, getDataByIndex]
  );

  return (
    <ChartContainer>
      <div style={{ padding: '50%' }} />
      <ChartFrame1 />

      <ChartWrapper>
        <PieBg color={Number(value) > 50 ? theme.colors.green1 : theme.colors.blue1} />
        {data.map((item, index) => (
          <PiePiece angle={item.angle} color={item.color} key={index} value={item.value} />
        ))}
        {data.map((item, index) => (
          <PieLine angle={item.angle} key={index} />
        ))}
        <PieShadow />
      </ChartWrapper>

      <ChartFrame3 />
      <EthImg alt="" src={EthIcon} />
      <PrizeText shadow type={TypographyType.BOLD_SUBTITLE}>
        Prize
      </PrizeText>
      <ValueText shadow type={TypographyType.BOLD_SUBTITLE}>
        {Number(prize).toLocaleString()}
      </ValueText>
    </ChartContainer>
  );
};

export default Chart;
