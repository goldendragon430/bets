/* eslint-disable no-console */
import React, { useState } from 'react';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';
import { useBet } from '../../contexts/bet_context';
import { isExpired } from '../../utils';

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
  const { claim, claimAmount, endTime } = useBet();

  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    setLoading(false);
    await claim();
    setLoading(true);
  };

  return isExpired(endTime) ? (
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
