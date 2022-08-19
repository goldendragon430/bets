import { ThemeProvider } from './contexts/theme_context';
import { WalletProvider } from './contexts/wallet_context';
import AppRouter from './pages/app_router';

const App = () => (
  <ThemeProvider>
    <WalletProvider>
      <AppRouter />
    </WalletProvider>
  </ThemeProvider>
);

export default App;
