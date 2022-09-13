import { Modal } from 'antd';
import styled from 'styled-components';

import { SUPPORTED_WALLETS } from '../../constants/wallet';
import { useTheme } from '../../contexts/theme_context';
import { useWallet } from '../../contexts/wallet_context';
import { getShortWalletAddress } from '../../utils';
import Button from '../common/button';
import { Typography, TypographyType } from '../common/typography';

const ModalWrapper = styled(Modal)`
  color: ${({ theme }) => theme.colors.text1};
  overflow: hidden;

  .ant-modal-content {
    border: 0.25rem solid ${({ theme }) => theme.colors.white};
    border-radius: 0.75rem;
    // box-shadow: 0px 0px 1rem ${({ theme }) => theme.colors.white};
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
      border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    }

    .ant-modal-body {
      padding: 3rem;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const OptionButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: initial;
`;

const OptionImg = styled.img`
  height: 2rem;
`;

interface IWalletModal {
  visible: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<IWalletModal> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const { account, connect, disconnect } = useWallet();

  const handleSelect = (key: string) => {
    connect(key);
    onClose();
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  return (
    <ModalWrapper centered footer={null} onCancel={onClose} visible={visible} width="40rem">
      <Container>
        {account ? (
          <>
            <Typography type={TypographyType.BOLD_SUBTITLE}>{getShortWalletAddress(account)}</Typography>
            <OptionButton color={theme.colors.purple1} onClick={handleDisconnect} style={{ justifyContent: 'center' }}>
              DISCONNECT
            </OptionButton>
          </>
        ) : (
          <>
            <Typography type={TypographyType.BOLD_SUBTITLE}>SELECT WALLET</Typography>
            {Object.keys(SUPPORTED_WALLETS).map((key) => {
              const option = SUPPORTED_WALLETS[key];
              return (
                <OptionButton color={theme.colors.orange1} key={key} onClick={() => handleSelect(key)}>
                  <Typography type={TypographyType.REGULAR}>{option.name}</Typography>
                  <OptionImg alt="" src={option.icon} />
                </OptionButton>
              );
            })}
          </>
        )}
      </Container>
    </ModalWrapper>
  );
};

export default WalletModal;
