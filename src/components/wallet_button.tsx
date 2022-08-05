import styled from 'styled-components';

import { useWallet } from '../contexts/wallet_context';
import { getShortWalletAddress } from '../utils';
import Button from './common/button';

const StyledButton = styled(Button)``;

const WalletButton = () => {
  const { account, connect, disconnect } = useWallet();

  const handleConnect = () => {
    if (!account) {
      connect();
    } else {
      disconnect();
    }
  };

  return (
    <StyledButton onClick={handleConnect}>{account ? getShortWalletAddress(account) : 'Connect Wallet'}</StyledButton>
  );
};

export default WalletButton;
