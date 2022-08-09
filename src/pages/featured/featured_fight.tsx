/* eslint-disable no-console */
import React, { useState } from 'react';

import styled from 'styled-components';

import MarkImg1 from '../../assets/images/mark1.png';
import MarkImg2 from '../../assets/images/mark2.jpeg';
import TeamLogo1 from '../../assets/images/team_logo1.jpeg';
import TeamLogo2 from '../../assets/images/team_logo2.jpeg';
import TeamImg1 from '../../assets/images/team1.png';
import TeamImg2 from '../../assets/images/team2.png';
import { Typography, TypographyType } from '../../components/common/typography';
import BetModal from '../../components/modals/bet_modal';
import StakeModal from '../../components/modals/stake_modal';
import { useTheme } from '../../contexts/theme_context';
import { NFT_LIST1, NFT_LIST2 } from '../../mocks/nfts';
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

const ChanceWrapper = styled(Wrapper)`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.red1} 5%,
    rgba(0, 0, 0, 0) 50%,
    ${({ theme }) => theme.colors.blue1} 95%
  );
  width: calc(100% + 5rem);
  transform: translateX(-2.5rem);
  padding: 1.5rem 2.5rem;
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

  const [selectA, setSelectA] = useState(true);
  const [showBetModal, setShowBetModal] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);

  const handleBet = (teamA: boolean) => {
    setSelectA(teamA);
    setShowBetModal(true);
  };

  const handleStake = (teamA: boolean) => {
    setSelectA(teamA);
    setShowStakeModal(true);
  };

  return (
    <Container>
      <TeamSection
        color={theme.colors.red1}
        firstTeam
        onBet={() => handleBet(true)}
        onStake={() => handleStake(true)}
        teamImg={TeamImg1}
        teamName="MAYC"
      />

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

        <ChanceWrapper>
          <LeftTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>73%</Typography>
          </LeftTeam>
          <MidTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>chances</Typography>
          </MidTeam>
          <RightTeam>
            <Typography type={TypographyType.REGULAR_TITLE}>27%</Typography>
          </RightTeam>
        </ChanceWrapper>

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

      <TeamSection
        color={theme.colors.blue1}
        onBet={() => handleBet(false)}
        onStake={() => handleStake(false)}
        teamImg={TeamImg2}
        teamName="AZUKI"
      />

      <BetModal
        color={selectA ? theme.colors.red1 : theme.colors.blue1}
        onClose={() => setShowBetModal(false)}
        teamLogo={selectA ? TeamLogo1 : TeamLogo2}
        visible={showBetModal}
      />

      <StakeModal
        color={selectA ? theme.colors.red1 : theme.colors.blue1}
        nfts={selectA ? NFT_LIST1 : NFT_LIST2}
        onClose={() => setShowStakeModal(false)}
        visible={showStakeModal}
      />
    </Container>
  );
};

export default FeaturedFight;
