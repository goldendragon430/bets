import { BetProvider } from './contexts/bet_context';
import { ThemeProvider } from './contexts/theme_context';
import { WalletProvider } from './contexts/wallet_context';
import AppRouter from './pages/app_router';

const App = () => (
  <ThemeProvider>
    <WalletProvider>
      <BetProvider>
        <AppRouter />
      </BetProvider>
    </WalletProvider>
  </ThemeProvider>
);

export default App;
