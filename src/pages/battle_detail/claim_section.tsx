/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';
import MyBetModal from '../../components/modals/my_bet_modal';
import { useWallet } from '../../contexts/wallet_context';
import { BattleDetailType } from '../../types';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  width: 100%;
  padding: 0.5rem 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EthImg = styled.img`
  height: 6rem;
  margin-right: 1rem;
`;

const BalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
`;

const BalanceImg = styled.img`
  height: 4rem;
`;

const ClaimSection: React.FC<BattleDetailType> = (props) => {
  const { claim, claimAmount, winnerSet, updateClaimAmount } = props;
  const { balance } = useWallet();

  const [loading, setLoading] = useState(false);
  const [showBetModal, setShowBetModal] = useState(false);

  useEffect(() => {
    updateClaimAmount();
  }, [winnerSet]);

  const handleClaim = async () => {
    setLoading(true);
    await claim();
    setLoading(false);
  };

  return (
    <Container>
      <BalanceWrapper onClick={() => setShowBetModal(true)}>
        <Typography shadow type={TypographyType.BOLD_SUBTITLE}>
          {balance.toLocaleString()}
        </Typography>
        <BalanceImg alt="" src={EthIcon} />
      </BalanceWrapper>

      {winnerSet && (
        <Wrapper>
          <Typography type={TypographyType.REGULAR_TITLE}>{claimAmount.toLocaleString()}</Typography>
          <EthImg alt="" src={EthIcon} />
          <Button disabled={loading || claimAmount <= 0} onClick={handleClaim}>
            {loading ? 'Claiming...' : 'Claim'}
          </Button>
        </Wrapper>
      )}

      <MyBetModal onClose={() => setShowBetModal(false)} visible={showBetModal} {...props} />
    </Container>
  );
};

export default ClaimSection;
