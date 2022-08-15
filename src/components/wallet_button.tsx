import { useTheme } from '../contexts/theme_context';
import { useWallet } from '../contexts/wallet_context';
import { getShortWalletAddress } from '../utils';
import Button from './common/button';

const WalletButton = () => {
  const { account, connect, disconnect } = useWallet();
  const { theme } = useTheme();

  const handleConnect = () => {
    if (!account) {
      connect();
    } else {
      disconnect();
    }
  };

  return (
    <Button color={theme.colors.purple1} onClick={handleConnect} shadow>
      {account ? getShortWalletAddress(account) : 'Connect Wallet'}
    </Button>
  );
};

export default WalletButton;
