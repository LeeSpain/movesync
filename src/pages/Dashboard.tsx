
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This is a placeholder for actual authentication logic
const useAuthStatus = () => {
  // In a real app, you would check if the user is authenticated and what plan they have
  return { 
    isAuthenticated: true, 
    userPlan: 'free' // or 'premium'
  };
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userPlan } = useAuthStatus();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Redirect to the appropriate dashboard based on user's plan
    if (userPlan === 'premium') {
      navigate('/dashboard/premium');
    } else {
      navigate('/dashboard/free');
    }
  }, [isAuthenticated, userPlan, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Redirecting to your dashboard...</div>
    </div>
  );
};

export default Dashboard;
