/* eslint-disable react/no-array-index-key */
import { useCallback, useMemo, useState } from 'react';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import Input from '../../components/common/input';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => `${theme.colors.red1}40`} 0%,
    rgba(0, 0, 0, 0) 50%,
    ${({ theme }) => `${theme.colors.blue1}40`} 100%
  );
  margin: 1rem 0;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    margin: 5rem 0;
  }`}
`;

const ChartContainer = styled.div`
  position: relative;
  width: 30%;
  background: ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  transform: scale(1.5);
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
`;

const ChartFrame1 = styled(Circle)`
  width: 80%;
  height: 80%;
  background: ${({ theme }) => theme.colors.black};
  box-shadow: 0px 0px 44px ${({ theme }) => theme.colors.purple1};
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

  width: 70%;
  height: 70%;
  // animation: rotating 20s linear infinite;
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
  width: 50%;
  height: 50%;
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
    font-size: 2.5rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToSmall} {
    font-size: 1.5rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToExtraSmall} {
    font-size: 1rem;
  }`}
`;

const PrizeText = styled(BoldText)`
  top: 62%;
  font-size: 2rem;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    font-size: 1.5rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToSmall} {
    font-size: 1rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToExtraSmall} {
    font-size: 0.7rem;
  }`}
`;

const RedInput = styled(Input)`
  position: absolute;
  top: 5%;
  left: 5%;
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

const ChartSection: React.FC = () => {
  const { theme } = useTheme();

  const [value, setValue] = useState('50');

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

      const color = index % 2 === 0 ? theme.colors.red1 : theme.colors.blue1;
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

  const handleChangeValue = (e: any) => {
    const res = e.target.value;
    if (res.length === 0) {
      setValue(res);
    } else {
      setValue(Math.max(Math.min(res, 100), 0).toString());
    }
  };

  return (
    <Container>
      <ChartContainer>
        <div style={{ padding: '50%' }} />
        <ChartFrame1 />

        <ChartWrapper>
          <PieBg color={Number(value) > 50 ? theme.colors.red1 : theme.colors.blue1} />
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
          1,080
        </ValueText>
      </ChartContainer>

      <RedInput max={100} min={0} onChange={handleChangeValue} type="number" value={value} />
    </Container>
  );
};

export default ChartSection;
