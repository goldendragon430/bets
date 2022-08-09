/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import CrossIcon from '../../assets/images/cross.svg';
import EthIcon from '../../assets/images/eth_icon.svg';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';

const Container = styled.div`
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
  background: ${({ theme }) => theme.colors.purple2};
  box-shadow: 0px 0px 44px ${({ theme }) => theme.colors.purple1};
`;

const ChartFrame2 = styled(Circle)`
  width: 75%;
  height: 75%;
  background: ${({ theme }) => theme.colors.purple1};
`;

const ChartWrapper = styled(Circle)`
  width: 70%;
  height: 70%;
`;

const PiePiece = styled(Circle)<{ color: string; index: number }>`
  width: 100%;
  height: 100%;
  background: ${({ color }) => color};
  box-shadow: inset 0px 4px 33px ${({ theme }) => theme.colors.grey1};
  clip-path: polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan((36 * Math.PI) / 180)}% 0%);
  transform: translate(-50%, -50%) rotate(${({ index }) => 36 * index - 72}deg);
`;

const PieLine = styled.div<{ index: number }>`
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  background: ${({ theme }) => `${theme.colors.grey1}10`};
  border: 1px solid ${({ theme }) => `${theme.colors.grey1}20`};
  box-shadow: 0px 0px 11px ${({ theme }) => theme.colors.grey1}, inset 0px 0px 11px ${({ theme }) => theme.colors.grey1};
  transform: rotate(${({ index }) => 36 * index - 72}deg);
`;

const PieLabelWrapper = styled.div<{ index: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(${({ index }) => 36 * index - 54}deg);
`;

const StyledLabel = styled(Typography)`
  color: ${({ theme }) => theme.colors.black};
  position: absolute;
  top: 7.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: none;
  font-size: 1rem;

  ${({ theme }) => `${theme.media_width.upToExtraLarge} {
    font-size: 1.5rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToMedium} {
    font-size: 0.9rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToSmall} {
    font-size: 0.6rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToExtraSmall} {
    font-size: 0.5rem;
  }`}
`;

const ChartFrame3 = styled(Circle)`
  width: 50%;
  height: 50%;
  background: ${({ theme }) => theme.colors.purple3};
`;

const ChartFrame4 = styled(Circle)`
  width: 30%;
  height: 30%;
  background: ${({ theme }) => theme.colors.purple2};
  box-shadow: 0px 0px 44px #ee2dff;
`;

const CrossImg = styled.img`
  position: absolute;
  width: 36%;
  height: 36%;
  top: 32%;
  left: 32%;
`;

const ChartFrame5 = styled(Circle)`
  width: 10%;
  height: 10%;
  background: ${({ theme }) => theme.colors.purple1};
  box-shadow: 0px 0px 22px #ee2dff;
`;

const EthImg = styled.img`
  position: absolute;
  width: 14%;
  height: 14%;
  top: 43%;
  left: 43%;
`;

const BoldText = styled(Typography)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;

  ${({ theme }) => `${theme.media_width.upToExtraLarge} {
    font-size: 2.5rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToMedium} {
    font-size: 1.5rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToSmall} {
    font-size: 1rem;
  }`}

  ${({ theme }) => `${theme.media_width.upToExtraSmall} {
    font-size: 0.8rem;
  }`}
`;

const PrizeText = styled(BoldText)`
  top: 40%;
`;

const ValueText = styled(BoldText)`
  top: 60%;
`;

const BLUE_COUNT = 3;

const ChartSection: React.FC = () => {
  const { theme } = useTheme();

  const getDataByIndex = (index: number) => {
    const colorA = BLUE_COUNT < 5 ? theme.colors.blue1 : theme.colors.red1;
    const colorB = BLUE_COUNT < 5 ? theme.colors.red1 : theme.colors.blue1;
    // eslint-disable-next-line no-nested-ternary
    const isBlue = index >= BLUE_COUNT * 2 ? false : index % 2 === 0;
    const color = isBlue ? colorA : colorB;

    return { value: 1, color, title: isBlue ? '4.07x' : '1.18x' };
  };

  const data = new Array(10).fill(0).map((_, index) => getDataByIndex(index));

  return (
    <Container>
      <ChartContainer>
        <div style={{ padding: '50%' }} />
        <ChartFrame1 />
        <ChartFrame2 />

        <ChartWrapper>
          {data.map((item, index) => (
            <PiePiece color={item.color} index={index} key={index} />
          ))}
          {data.map((_, index) => (
            <PieLine index={index} key={index} />
          ))}
          {data.map((item, index) => (
            <PieLabelWrapper index={index} key={index}>
              <StyledLabel shadow type={TypographyType.BOLD_SUBTITLE}>
                {item.title}
              </StyledLabel>
            </PieLabelWrapper>
          ))}
        </ChartWrapper>

        <ChartFrame3 />
        <ChartFrame4 />
        <CrossImg alt="" src={CrossIcon} />
        <ChartFrame5 />
        <EthImg alt="" src={EthIcon} />
        <PrizeText shadow type={TypographyType.BOLD_SUBTITLE}>
          Prize
        </PrizeText>
        <ValueText shadow type={TypographyType.BOLD_SUBTITLE}>
          1080
        </ValueText>
      </ChartContainer>
    </Container>
  );
};

export default ChartSection;
