import { useState } from 'react';

import styled from 'styled-components';

import { useTheme } from '../contexts/theme_context';
import { useWallet } from '../contexts/wallet_context';
import { getShortWalletAddress } from '../utils';
import Button from './common/button';

const Container = styled.div`
  position: relative;

  button {
    white-space: nowrap;
    font-size: 1.2rem;
  }
`;

const DisconnectButton = styled(Button)`
  position: absolute;
  top: 120%;
  right: 0;
  z-index: 100;
`;

const WalletButton = () => {
  const { account, connect, disconnect } = useWallet();
  const { theme } = useTheme();

  const [showModal, setShowModal] = useState(false);

  const handleConnect = () => {
    if (!account) {
      connect();
    } else {
      setShowModal(!showModal);
    }
  };

  const handleDisconnect = () => {
    setShowModal(false);
    disconnect();
  };

  return (
    <Container>
      <Button color={theme.colors.white} onClick={handleConnect} shadow>
        {account ? getShortWalletAddress(account) : 'Connect'}
      </Button>

      {showModal && (
        <DisconnectButton color={theme.colors.purple1} onClick={handleDisconnect} shadow>
          Disconnect
        </DisconnectButton>
      )}
    </Container>
  );
};

export default WalletButton;
