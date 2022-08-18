/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';
import { useBet } from '../../contexts/bet_context';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 0 2rem;
`;

const EthImg = styled.img`
  height: 6rem;
  margin-right: 1rem;
`;

const ClaimSection: React.FC = () => {
  const { claim, claimAmount, winnerSet, updateClaimAmount } = useBet();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateClaimAmount();
  }, [winnerSet]);

  const handleClaim = async () => {
    setLoading(false);
    await claim();
    setLoading(true);
  };

  return winnerSet ? (
    <Container>
      <Typography type={TypographyType.REGULAR_TITLE}>{claimAmount.toLocaleString()}</Typography>
      <EthImg alt="" src={EthIcon} />
      <Button disabled={loading || claimAmount <= 0} onClick={handleClaim}>
        {loading ? 'Claiming...' : 'Claim'}
      </Button>
    </Container>
  ) : null;
};

export default ClaimSection;
