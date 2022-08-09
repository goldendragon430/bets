/* eslint-disable jsx-a11y/anchor-is-valid */
import { Modal } from 'antd';
import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import LogoIcon from '../../assets/images/logo.svg';
import Button from '../common/button';
import Input from '../common/input';
import { Typography, TypographyType } from '../common/typography';

const ModalWrapper = styled(Modal)<{ color: string }>`
  color: ${({ theme }) => theme.colors.text1};
  overflow: hidden;

  .ant-modal-content {
    border: 0.25rem solid ${({ color }) => color};
    border-radius: 0.75rem;
    box-shadow: 0px 0px 1rem ${({ color }) => color};
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

const Logo = styled.img`
  height: 32px;
  margin-right: 1rem;
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
`;

const BalanceImg = styled.img`
  height: 10rem;
`;

const BetButton = styled(Button)`
  margin-top: 1rem;
  margin-bottom: 2rem;
  width: 70%;
`;

interface IBetModal {
  visible: boolean;
  onClose: () => void;
  teamLogo: string;
  color: string;
}

const BetModal: React.FC<IBetModal> = ({ visible, onClose, teamLogo, color }) => (
  <ModalWrapper
    centered
    color={color}
    footer={null}
    onCancel={onClose}
    title={
      <HeaderWrapper>
        <Logo alt="" src={LogoIcon} />
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
            3.25 ETH
          </Typography>
          <Typography type={TypographyType.REGULAR}>in-wallet balance</Typography>
        </div>
      </BalanceWrapper>
    </Wrapper>

    <Input onMax={() => {}} placeholder="5,393.76" point={8303.24} style={{ width: '100%' }} type="number" />

    <BetButton color={color}>Bet</BetButton>

    <Typography color={color} type={TypographyType.REGULAR_TITLE}>
      if you lose you will earn 3000 BP
    </Typography>
    <Typography style={{ textTransform: 'uppercase' }} type={TypographyType.REGULAR}>
      find out more about bp <a>here</a>
    </Typography>
  </ModalWrapper>
);

export default BetModal;
