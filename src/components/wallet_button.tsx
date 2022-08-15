import { useState } from 'react';

import styled from 'styled-components';

import { useTheme } from '../contexts/theme_context';
import { useWallet } from '../contexts/wallet_context';
import Button from './common/button';

const Container = styled.div`
  position: relative;

  button {
    white-space: nowrap;
  }
`;

const DisconnectButton = styled(Button)`
  position: absolute;
  top: 120%;
  right: 0;
  z-index: 100;
`;

const WalletButton = () => {
  const { account, connect, disconnect, balance } = useWallet();
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
        {account ? `${balance.toLocaleString()} ETH` : 'Connect Wallet'}
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
