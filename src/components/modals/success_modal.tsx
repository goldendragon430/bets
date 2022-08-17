/* eslint-disable jsx-a11y/anchor-is-valid */
import { Modal } from 'antd';
import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import TwitterIcon from '../../assets/images/twitter.svg';
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
  width: 16rem;
  height: 16rem;
  margin: 2rem 0;
  border-radius: 0.75rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
`;

const BalanceWrapper = styled.div<{ color: string }>`
  flex: 1;
  height: 8rem;
  border: 2px solid ${({ color }) => color};
  border-radius: 0.75rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const BalanceImg = styled.img`
  height: 8rem;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TwitterImg = styled.img`
  height: 3rem;
  margin-right: 2rem;
`;

interface ISuccessModal {
  visible: boolean;
  onClose: () => void;
  teamLogo: string;
  color: string;
  ethStaked: number;
  nftStaked: number;
}

const SuccessModal: React.FC<ISuccessModal> = ({ visible, onClose, teamLogo, color, ethStaked, nftStaked }) => (
  <ModalWrapper
    centered
    color={color}
    footer={null}
    onCancel={onClose}
    title={
      <HeaderWrapper>
        <Typography type={TypographyType.REGULAR_TITLE}>Successful</Typography>
      </HeaderWrapper>
    }
    visible={visible}
    width="55rem"
  >
    <Typography style={{ fontSize: '3rem' }} type={TypographyType.REGULAR_TITLE}>
      Congrats!
    </Typography>

    <TeamLogo alt="" color={color} src={teamLogo} />

    <Wrapper>
      <BalanceWrapper color={color}>
        <BalanceImg alt="" src={EthIcon} />
        <div style={{ marginRight: '2rem' }}>
          <Typography color={color} style={{ lineHeight: '3rem' }} type={TypographyType.BOLD_SUBTITLE}>
            {ethStaked.toLocaleString()}
          </Typography>
          <Typography type={TypographyType.REGULAR}>NEW BET</Typography>
        </div>
      </BalanceWrapper>

      <div style={{ minWidth: '2rem' }} />

      <BalanceWrapper color={color}>
        <div style={{ textAlign: 'center' }}>
          <Typography color={color} style={{ lineHeight: '3rem' }} type={TypographyType.BOLD_SUBTITLE}>
            {nftStaked.toLocaleString()}
          </Typography>
          <Typography type={TypographyType.REGULAR}>NEW NFT STAKED</Typography>
        </div>
      </BalanceWrapper>
    </Wrapper>

    <CommentWrapper>
      <TwitterImg alt="" src={TwitterIcon} />
      <Typography style={{ textTransform: 'uppercase' }} type={TypographyType.REGULAR}>
        <a>Share</a> with friends to win a free bet
      </Typography>
    </CommentWrapper>
  </ModalWrapper>
);

export default SuccessModal;
