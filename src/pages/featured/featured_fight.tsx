/* eslint-disable no-console */
import React, { useState } from 'react';

import styled from 'styled-components';

import TeamLogo1 from '../../assets/images/team_logo1.jpeg';
import TeamLogo2 from '../../assets/images/team_logo2.jpeg';
import TeamImg1 from '../../assets/images/team1.png';
import TeamImg2 from '../../assets/images/team2.png';
import BetModal from '../../components/modals/bet_modal';
import StakeModal from '../../components/modals/stake_modal';
import SuccessModal from '../../components/modals/success_modal';
import { useTheme } from '../../contexts/theme_context';
import { NFT_LIST1, NFT_LIST2 } from '../../mocks/nfts';
import InfoSection from './info_section';
import TeamSection from './team_section';

const Container = styled.div`
  width: 100%;
  padding: 4rem;
  display: flex;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    flex-direction: column;
    align-items: center;
    padding: 4rem 0;
  }`}
`;

const FeaturedFight: React.FC = () => {
  const { theme } = useTheme();

  const [selectA, setSelectA] = useState(true);
  const [showBetModal, setShowBetModal] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
        ethStaked={825}
        firstTeam
        nftStaked={5634}
        onBet={() => handleBet(true)}
        onStake={() => handleStake(true)}
        teamImg={TeamImg1}
        teamLogo={TeamLogo1}
        teamName="MAYC"
      />

      <InfoSection />

      <TeamSection
        color={theme.colors.blue1}
        ethStaked={225}
        nftStaked={2543}
        onBet={() => handleBet(false)}
        onStake={() => handleStake(false)}
        teamImg={TeamImg2}
        teamLogo={TeamLogo2}
        teamName="AZUKI"
      />

      <BetModal
        color={selectA ? theme.colors.red1 : theme.colors.blue1}
        fontColor={selectA ? theme.colors.white : theme.colors.black}
        onBet={() => {
          setShowBetModal(false);
          setShowSuccessModal(true);
        }}
        onClose={() => setShowBetModal(false)}
        rewardPotential={selectA ? 1.18 : 4.07}
        teamLogo={selectA ? TeamLogo1 : TeamLogo2}
        visible={showBetModal}
      />

      <StakeModal
        color={selectA ? theme.colors.red1 : theme.colors.blue1}
        fontColor={selectA ? theme.colors.white : theme.colors.black}
        nfts={selectA ? NFT_LIST1 : NFT_LIST2}
        onClose={() => setShowStakeModal(false)}
        onStake={() => {
          setShowStakeModal(false);
          setShowSuccessModal(true);
        }}
        visible={showStakeModal}
      />

      <SuccessModal
        color={selectA ? theme.colors.red1 : theme.colors.blue1}
        ethStaked={3.25}
        nftStaked={2}
        onClose={() => setShowSuccessModal(false)}
        teamLogo={selectA ? TeamLogo1 : TeamLogo2}
        visible={showSuccessModal}
      />
    </Container>
  );
};

export default FeaturedFight;
