/* eslint-disable no-console */
import React from 'react';

import styled from 'styled-components';

import MarkImg1 from '../../assets/images/mark1.png';
import MarkImg2 from '../../assets/images/mark2.jpeg';
import TeamLogo1 from '../../assets/images/team_logo1.jpeg';
import TeamLogo2 from '../../assets/images/team_logo2.jpeg';
import TeamImg1 from '../../assets/images/team1.png';
import TeamImg2 from '../../assets/images/team2.png';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import TeamSection from './team_section';

const Container = styled.div`
  width: 100%;
  margin-top: 4rem;
  display: flex;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    flex-direction: column;
    align-items: center;
  }`}
`;

const InfoWrapper = styled.div`
  flex: 1.5;
  z-index: 1;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 100%;
  }`}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
`;

const TeamLogo = styled.img<{ firstTeam?: boolean; color: string }>`
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
  ${({ firstTeam }) => (firstTeam ? `margin-left: 0.5rem;` : `margin-right: 0.5rem;`)}
`;

const LeftTeam = styled.div`
  flex: 1;
  padding-right: 0.5rem;
  text-align: right;
`;

const MidTeam = styled.div`
  flex: 1.5;
  text-align: center;
`;

const RightTeam = styled.div`
  flex: 1;
  padding-left: 0.5rem;
  text-align: left;
`;

const Stats = styled.div<{ firstTeam?: boolean; color: string }>`
  width: calc(100% + 2.5rem);
  ${({ firstTeam }) => firstTeam && `transform: translateX(-2.5rem);`}
  background: ${({ color }) => color};
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-transform: none;
  }

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 100%;
    transform: translateX(0);
  }`}
`;

const FeaturedFight: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <TeamSection color={theme.colors.red1} firstTeam teamImg={TeamImg1} teamName="MAYC" />

      <InfoWrapper>
        <Wrapper>
          <LeftTeam>
            <TeamLogo alt="" color={theme.colors.red1} firstTeam src={TeamLogo1} />
          </LeftTeam>
          <MidTeam />
          <RightTeam>
            <TeamLogo alt="" color={theme.colors.blue1} src={TeamLogo2} />
          </RightTeam>
        </Wrapper>

        <Wrapper>
          <LeftTeam>
            <Stats color={theme.colors.red1} firstTeam>
              <Typography shadow style={{ color: theme.colors.black }} type={TypographyType.BOLD_TITLE}>
                1.18x
              </Typography>
            </Stats>
          </LeftTeam>
          <MidTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>reward potential</Typography>
          </MidTeam>
          <RightTeam>
            <Stats color={theme.colors.blue1}>
              <Typography shadow style={{ color: theme.colors.black }} type={TypographyType.BOLD_TITLE}>
                4.07x
              </Typography>
            </Stats>
          </RightTeam>
        </Wrapper>

        <Wrapper>
          <LeftTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>73%</Typography>
          </LeftTeam>
          <MidTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>chances</Typography>
          </MidTeam>
          <RightTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>27%</Typography>
          </RightTeam>
        </Wrapper>

        <Wrapper>
          <LeftTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>5,634</Typography>
          </LeftTeam>
          <MidTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>nfts staked</Typography>
          </MidTeam>
          <RightTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>2,543</Typography>
          </RightTeam>
        </Wrapper>

        <Wrapper>
          <LeftTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>825</Typography>
          </LeftTeam>
          <MidTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>eth added</Typography>
          </MidTeam>
          <RightTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>225</Typography>
          </RightTeam>
        </Wrapper>

        <Wrapper>
          <LeftTeam>
            <TeamLogo alt="" color={theme.colors.red1} firstTeam src={MarkImg1} />
            <TeamLogo alt="" color={theme.colors.red1} firstTeam src={MarkImg2} />
          </LeftTeam>
          <MidTeam />
          <RightTeam>
            <TeamLogo alt="" color={theme.colors.blue1} src={MarkImg1} />
            <TeamLogo alt="" color={theme.colors.blue1} src={MarkImg2} />
          </RightTeam>
        </Wrapper>
      </InfoWrapper>

      <TeamSection color={theme.colors.blue1} teamImg={TeamImg2} teamName="AZUKI" />
    </Container>
  );
};

export default FeaturedFight;