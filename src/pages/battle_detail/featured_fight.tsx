/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React, { useState } from 'react';

import styled from 'styled-components';

import BetModal from '../../components/modals/bet_modal';
import StakeModal from '../../components/modals/stake_modal';
import SuccessModal from '../../components/modals/success_modal';
import { useTheme } from '../../contexts/theme_context';
import { BattleDetailType } from '../../types';
import InfoSection from './info_section';
import TeamSection from './team_section';

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 2rem;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    flex-direction: column;
    align-items: center;
    padding: 0;
  }`};
`;

const FeaturedFight: React.FC<BattleDetailType> = (props) => {
  const {
    battleInfo,
    totalBetAmountA,
    totalBetAmountB,
    totalNftStakedA,
    totalNftStakedB,
    getRewardPotential,
    placeBet,
    userNftListA,
    userNftListB,
    stakeNft,
  } = props;
  const { theme } = useTheme();

  const [selectA, setSelectA] = useState(true);
  const [showBetModal, setShowBetModal] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);

  const handleShowBet = (teamA: boolean) => {
    setSelectA(teamA);
    setShowBetModal(true);
  };

  const handleShowStake = (teamA: boolean) => {
    setSelectA(teamA);
    setShowStakeModal(true);
  };

  const handleBet = async (amount: number) => {
    const res = await placeBet(amount, !selectA);
    if (res) {
      setBetAmount(amount);
      setStakedAmount(0);
      setShowBetModal(false);
      setShowSuccessModal(true);
    }
  };

  const handleStake = async (tokenIds: number[]) => {
    const res = await stakeNft(tokenIds, !selectA);
    if (res) {
      setBetAmount(0);
      setStakedAmount(tokenIds.length);
      setShowStakeModal(false);
      setShowSuccessModal(true);
    }
  };

  return battleInfo ? (
    <Container>
      <TeamSection
        battleInfo={battleInfo}
        color={theme.colors.green1}
        ethStaked={totalBetAmountA}
        firstTeam
        nftStaked={totalNftStakedA}
        onBet={() => handleShowBet(true)}
        onStake={() => handleShowStake(true)}
        project={battleInfo.projectL}
      />

      <InfoSection {...props} />

      <TeamSection
        battleInfo={battleInfo}
        color={theme.colors.blue1}
        ethStaked={totalBetAmountB}
        nftStaked={totalNftStakedB}
        onBet={() => handleShowBet(false)}
        onStake={() => handleShowStake(false)}
        project={battleInfo.projectR}
      />

      <BetModal
        color={selectA ? theme.colors.green1 : theme.colors.blue1}
        endTime={battleInfo.endDate}
        fontColor={theme.colors.black}
        onBet={handleBet}
        onClose={() => setShowBetModal(false)}
        rewardPotential={getRewardPotential(!selectA)}
        teamLogo={selectA ? battleInfo.projectL.logo : battleInfo.projectR.logo}
        visible={showBetModal}
      />

      <StakeModal
        color={selectA ? theme.colors.green1 : theme.colors.blue1}
        endTime={battleInfo.endDate}
        fontColor={theme.colors.black}
        nftContractAddress={selectA ? battleInfo.projectL.contract : battleInfo.projectR.contract}
        nfts={selectA ? userNftListA : userNftListB}
        onClose={() => setShowStakeModal(false)}
        onStake={handleStake}
        visible={showStakeModal}
      />

      <SuccessModal
        color={selectA ? theme.colors.green1 : theme.colors.blue1}
        ethStaked={betAmount}
        nftStaked={stakedAmount}
        onClose={() => setShowSuccessModal(false)}
        teamLogo={selectA ? battleInfo.projectL.logo : battleInfo.projectR.logo}
        visible={showSuccessModal}
      />
    </Container>
  ) : null;
};

export default FeaturedFight;
