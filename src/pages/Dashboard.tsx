
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Redirect to the appropriate dashboard based on user's plan
    if (user?.plan === 'premium') {
      navigate('/dashboard/premium');
    } else {
      navigate('/dashboard/free');
    }
  }, [isAuthenticated, user, loading, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Redirecting to your dashboard...</div>
    </div>
  );
};

export default Dashboard;
