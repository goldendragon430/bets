import { ThemeProvider } from './contexts/theme_context';
import AppRouter from './pages/app_router';

const App = () => (
  <ThemeProvider>
    <AppRouter />
  </ThemeProvider>
);

export default App;
