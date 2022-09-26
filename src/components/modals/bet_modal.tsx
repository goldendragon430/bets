/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useEffect, useState } from 'react';

import { Modal } from 'antd';
import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import { useWallet } from '../../contexts/wallet_context';
import Button from '../common/button';
import Input from '../common/input';
import { Typography, TypographyType } from '../common/typography';

const ModalWrapper = styled(Modal)<{ color: string }>`
  color: ${({ theme }) => theme.colors.text1};
  overflow: hidden;

  .ant-modal-content {
    border: 0.25rem solid ${({ color }) => color};
    border-radius: 0.75rem;
    // box-shadow: 0px 0px 1rem ${({ color }) => color};
    background-color: ${({ theme }) => theme.colors.grey1};

    .ant-modal-close {
      color: ${({ theme }) => theme.colors.white};
      top: 5px;

      .ant-modal-close-x {
        font-size: 24px;
      }
    }

    .ant-modal-header {
      background: transparent;
      border-bottom: 1px solid ${({ color }) => color};
    }

    .ant-modal-body {
      padding: 3rem;
      background: radial-gradient(
        50% 50% at 50.01% 50.01%,
        ${({ color }) => `${color}40`} 0%,
        ${({ color }) => `${color}20`} 50%,
        ${({ color }) => `${color}00`} 100%
      );
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  width: 100%;
`;

const TeamLogo = styled.img<{ color: string }>`
  width: 8rem;
  height: 8rem;
  border-radius: 0.75rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
`;

const BalanceWrapper = styled.div<{ color: string }>`
  flex: 1;
  height: 8rem;
  border: 2px solid ${({ color }) => color};
  border-radius: 0.75rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
  margin-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const BalanceImg = styled.img`
  height: 10rem;
`;

const BetButton = styled(Button)`
  margin-top: 1rem;
  margin-bottom: 2rem;
  width: 70%;
`;

const StatsWrapper = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
`;

const StyledA = styled.a`
  text-decoration: underline;
`;

interface IBetModal {
  firstTeam: boolean;
  visible: boolean;
  onClose: () => void;
  teamLogo: string;
  color: string;
  fontColor: string;
  getRewardPotential: (side: boolean, extraAmount: number) => number;
  endTime: string;
  onBet: (amount: number) => void;
}

const BetModal: React.FC<IBetModal> = ({
  firstTeam,
  visible,
  onClose,
  teamLogo,
  color,
  fontColor,
  getRewardPotential,
  endTime,
  onBet,
}) => {
  const { balance } = useWallet();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setAmount('');
  }, [visible]);

  const getMaxAmount = () => Math.max(0, balance - 0.01);

  const handleMax = () => {
    setAmount(getMaxAmount().toFixed(2));
  };

  const handleBet = async () => {
    setLoading(true);
    await onBet(Number(amount));
    setLoading(false);
  };

  const getABPAmount = useCallback(() => {
    if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      return '0';
    }
    return (Number(amount) * 3000).toLocaleString();
  }, [amount]);

  return (
    <ModalWrapper
      centered
      color={color}
      footer={null}
      onCancel={onClose}
      title={
        <HeaderWrapper>
          <Typography type={TypographyType.REGULAR_TITLE}>BET</Typography>
        </HeaderWrapper>
      }
      visible={visible}
      width="55rem"
    >
      <Wrapper>
        <TeamLogo alt="" color={color} src={teamLogo} />
        <BalanceWrapper color={color}>
          <BalanceImg alt="" src={EthIcon} />
          <div style={{ marginRight: '2rem' }}>
            <Typography color={color} style={{ lineHeight: '3rem' }} type={TypographyType.BOLD_SUBTITLE}>
              {balance.toLocaleString()} ETH
            </Typography>
            <Typography type={TypographyType.REGULAR}>in-wallet balance</Typography>
          </div>
        </BalanceWrapper>
      </Wrapper>

      <Input
        disabled={loading || new Date(endTime) < new Date()}
        onChange={(e) => setAmount(e.target.value)}
        onMax={handleMax}
        placeholder={balance.toLocaleString()}
        point={balance}
        style={{ width: '100%' }}
        type="number"
        value={amount}
      />

      <StatsWrapper>
        <Typography type={TypographyType.REGULAR_TITLE}>reward potential</Typography>
        <Typography type={TypographyType.REGULAR_TITLE}>
          {getRewardPotential(!firstTeam, Number(amount) || 0).toFixed(2)}x
        </Typography>
      </StatsWrapper>

      <BetButton
        color={color}
        disabled={
          loading ||
          new Date(endTime) < new Date() ||
          Number.isNaN(Number(amount)) ||
          Number(amount) <= 0 ||
          Number(amount) > getMaxAmount()
        }
        fontColor={fontColor}
        onClick={handleBet}
      >
        {loading ? 'Betting...' : 'Bet'}
      </BetButton>

      <Typography color={color} type={TypographyType.REGULAR_TITLE}>
        if you lose you will earn {getABPAmount()}{' '}
        <StyledA
          href="https://alphabetsgg.notion.site/alphabetsgg/How-to-Play-a21b75c6b65c4bb9828c1fd9d0962424#0ea15198d9b14bf8960f802e454f454f"
          target="_blank"
        >
          ABP
        </StyledA>
      </Typography>
      {/* <Typography style={{ textTransform: 'uppercase' }} type={TypographyType.REGULAR}>
        find out more about ABP <a>here</a>
      </Typography> */}
    </ModalWrapper>
  );
};

export default BetModal;
