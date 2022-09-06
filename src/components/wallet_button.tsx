import { useState } from 'react';

import styled from 'styled-components';

import { useTheme } from '../contexts/theme_context';
import { useWallet } from '../contexts/wallet_context';
import { getShortWalletAddress } from '../utils';
import Button from './common/button';
import WalletModal from './modals/wallet_modal';

const Container = styled.div`
  position: relative;

  button {
    white-space: nowrap;
    font-size: 1.2rem;
  }
`;

const WalletButton = () => {
  const { account } = useWallet();
  const { theme } = useTheme();

  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Button color={theme.colors.white} onClick={() => setShowModal(true)} shadow>
        {account ? getShortWalletAddress(account) : 'Connect'}
      </Button>

      <WalletModal onClose={() => setShowModal(false)} visible={showModal} />
    </Container>
  );
};

export default WalletButton;
