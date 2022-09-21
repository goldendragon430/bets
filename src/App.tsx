import { ProfileProvider } from './contexts/profile_context';
import { ThemeProvider } from './contexts/theme_context';
import { WalletProvider } from './contexts/wallet_context';
import AppRouter from './pages/app_router';

const App = () => (
  <ThemeProvider>
    <WalletProvider>
      <ProfileProvider>
        <AppRouter />
      </ProfileProvider>
    </WalletProvider>
  </ThemeProvider>
);

export default App;
