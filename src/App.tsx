
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import './App.css';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <ScrollToTop />
        <AppRoutes />
        <Toaster />
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
