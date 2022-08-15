import styled from 'styled-components';

import { Typography, TypographyType } from '../../components/common/typography';
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

  return (
    <InfoWrapper>
      <NumberText type={TypographyType.BOLD_TITLE}>00:10:23:38</NumberText>

      <Wrapper>
        <LeftTeam>
          <Stats color={theme.colors.red1}>
            <Typography type={TypographyType.BOLD_SUBTITLE}>1.18x</Typography>
          </Stats>
        </LeftTeam>
        <MidTeam>
          <Typography type={TypographyType.REGULAR_BODY}>reward potential</Typography>
        </MidTeam>
        <RightTeam>
          <Stats color={theme.colors.blue1}>
            <Typography type={TypographyType.BOLD_SUBTITLE}>4.07x</Typography>
          </Stats>
        </RightTeam>
      </Wrapper>

      <ChanceWrapper>
        <LeftTeam>
          <Typography type={TypographyType.BOLD_SUBTITLE}>73%</Typography>
        </LeftTeam>
        <MidTeam>
          <Typography type={TypographyType.REGULAR_BODY}>chances</Typography>
        </MidTeam>
        <RightTeam>
          <Typography type={TypographyType.BOLD_SUBTITLE}>27%</Typography>
        </RightTeam>
      </ChanceWrapper>
    </InfoWrapper>
  );
};

export default InfoSection;
