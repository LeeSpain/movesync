
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Only proceed if the auth state is loaded
    if (loading) return;
    
    setRedirecting(true);
    
    // If not authenticated, go to login
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Redirect based on user plan
    if (user?.plan === 'premium') {
      console.log('Redirecting to premium dashboard');
      navigate('/dashboard/premium');
    } else {
      console.log('Redirecting to free dashboard');
      navigate('/dashboard/free');
    }
  }, [isAuthenticated, user, loading, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-pulse text-movesync-gray-dark text-lg">
        {redirecting ? "Redirecting to your dashboard..." : "Loading..."}
      </div>
    </div>
  );
};

export default Dashboard;
