
import { BrowserRouter } from 'react-router-dom';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import './App.css';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CurrencyProvider>
          <ScrollToTop />
          <AppRoutes />
          <Toaster />
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
