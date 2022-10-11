/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';
import MyBetModal from '../../components/modals/my_bet_modal';
import { BET_CONTRACT_ADDRESS } from '../../constants';
import { DEFAULT_NETWORK } from '../../constants/chains';
import { useWallet } from '../../contexts/wallet_context';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useBetContract } from '../../hooks/useContract';
import { BattleDetailType } from '../../types';
import { getUserClaimInfo } from '../../utils/battle';

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
  margin-right: 2rem;
`;

const EthImg = styled.img`
  height: 6rem;
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
  const { winnerSet, battleInfo, refundStatus, userBetAmountA, userBetAmountB } = props;
  const { balance, account, updateBalance } = useWallet();
  const { chainId } = useActiveWeb3React();
  const betContract = useBetContract(BET_CONTRACT_ADDRESS[chainId || DEFAULT_NETWORK]);

  const [claimAmount, setClaimAmount] = useState(0);
  const [claimABPAmount, setClaimABPAmount] = useState(0);
  const [refundClaimStatus, setRefundClaimStatus] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [loadingBp, setLoadingBp] = useState(false);
  const [showBetModal, setShowBetModal] = useState(false);

  const updateClaimInfo = async () => {
    const res = await getUserClaimInfo(betContract, account, battleInfo);

    if (res.claimAmount !== undefined) {
      setClaimAmount(res.claimAmount);
    }
    if (res.claimABPAmount !== undefined) {
      setClaimABPAmount(res.claimABPAmount);
    }
    setRefundClaimStatus(res.refundClaimStatus);
  };

  useEffect(() => {
    updateClaimInfo();
  }, [winnerSet, refundStatus]);

  const handleClaim = async (abpClaim: boolean) => {
    try {
      if (betContract && account && battleInfo) {
        let tx;
        if (!abpClaim) {
          setLoading(true);
          await betContract.estimateGas.claimReward(battleInfo.battleId);
          tx = await betContract.claimReward(battleInfo.battleId);
        } else {
          setLoadingBp(true);
          await betContract.estimateGas.claimABP(battleInfo.battleId);
          tx = await betContract.claimABP(battleInfo.battleId);
        }
        const receipt = await tx.wait();
        if (receipt.status) {
          updateClaimInfo();
          updateBalance();
          toast.success('Claim Success');
        } else {
          toast.error('Claim Error');
        }
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
    }

    setLoading(false);
    setLoadingBp(false);
  };

  const handleRefund = async () => {
    try {
      if (betContract && account && battleInfo) {
        setLoading(true);
        await betContract.estimateGas.claimRefund(battleInfo.battleId);
        const tx = await betContract.claimRefund(battleInfo.battleId);
        const receipt = await tx.wait();
        if (receipt.status) {
          updateClaimInfo();
          updateBalance();
          toast.success('Refund Success');
        } else {
          toast.error('Refund Error');
        }
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
    }

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
          {claimABPAmount > 0 && (
            <Wrapper>
              <Typography type={TypographyType.REGULAR_TITLE}>{claimABPAmount.toLocaleString()} ABP </Typography>
              <Button disabled={loadingBp} onClick={() => handleClaim(true)} style={{ marginLeft: '1rem' }}>
                {loadingBp ? 'Claiming...' : 'Claim'}
              </Button>
            </Wrapper>
          )}

          {claimAmount > 0 && (
            <Wrapper>
              <Typography type={TypographyType.REGULAR_TITLE}>{claimAmount.toLocaleString()}</Typography>
              <EthImg alt="" src={EthIcon} />
              <Button disabled={loading} onClick={() => handleClaim(false)}>
                {loading ? 'Claiming...' : 'Claim'}
              </Button>
            </Wrapper>
          )}
        </Wrapper>
      )}

      {refundStatus && refundClaimStatus === 0 && userBetAmountA + userBetAmountB > 0 && (
        <Wrapper>
          <Typography type={TypographyType.REGULAR_TITLE}>
            {(userBetAmountA + userBetAmountB).toLocaleString()}
          </Typography>
          <EthImg alt="" src={EthIcon} />
          <Button disabled={loading} onClick={handleRefund}>
            {loading ? 'Refunding...' : 'Refund'}
          </Button>
        </Wrapper>
      )}

      <MyBetModal onClose={() => setShowBetModal(false)} visible={showBetModal} {...props} />
    </Container>
  );
};

export default ClaimSection;
