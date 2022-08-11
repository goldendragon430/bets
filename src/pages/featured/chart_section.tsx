/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import Input from '../../components/common/input';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';

const PIECE_COUNT = 100;

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
  animation: rotating 20s linear infinite;
`;

const PiePiece = styled(Circle)<{ color: string; index: number }>`
  width: 100%;
  height: 100%;
  background: ${({ color }) => color};
  box-shadow: inset 0px 4px 33px ${({ theme }) => theme.colors.grey1};
  clip-path: polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan(((360 / PIECE_COUNT) * Math.PI) / 180)}% 0%);
  transform: translate(-50%, -50%) rotate(${({ index }) => (360 / PIECE_COUNT) * (index - 1.5)}deg);
`;

const PieLine = styled.div<{ index: number }>`
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  background: ${({ theme }) => `${theme.colors.grey1}10`};
  border: 1px solid ${({ theme }) => `${theme.colors.grey1}20`};
  box-shadow: 0px 0px 11px ${({ theme }) => theme.colors.grey1}, inset 0px 0px 11px ${({ theme }) => theme.colors.grey1};
  transform: rotate(${({ index }) => (360 / PIECE_COUNT) * (index - 1.5)}deg);
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

  const getDataByIndex = (index: number) => {
    const redValue = Math.max(Math.min(Number(value) || 0, 100), 0);
    const redCount = Math.round((redValue / 100) * PIECE_COUNT);
    const blueCount = PIECE_COUNT - redCount;

    const smallCount = Math.min(redCount, blueCount);
    const colorA = redCount < blueCount ? theme.colors.red1 : theme.colors.blue1;
    const colorB = redCount < blueCount ? theme.colors.blue1 : theme.colors.red1;

    // eslint-disable-next-line no-nested-ternary
    const color = index < smallCount * 2 && index % 2 === 0 ? colorA : colorB;

    return { value: 1, color };
  };

  const data = new Array(PIECE_COUNT).fill(0).map((_, index) => getDataByIndex(index));

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
          {data.map((item, index) => (
            <PiePiece color={item.color} index={index} key={index} />
          ))}
          {data.map((_, index) => (
            <PieLine index={index} key={index} />
          ))}
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
