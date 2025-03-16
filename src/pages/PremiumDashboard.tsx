
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Briefcase, File, Flag, Home, HeartHandshake } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import WelcomeBanner from '@/components/premium-dashboard/WelcomeBanner';
import DashboardTabs from '@/components/premium-dashboard/DashboardTabs';
import PriorityTasksCard from '@/components/premium-dashboard/PriorityTasksCard';
import RelocationProgress from '@/components/dashboard/RelocationProgress';
import AIAssistantCard from '@/components/premium-dashboard/AIAssistantCard';
import FeatureGrid from '@/components/features/FeatureGrid';

const PremiumDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userName = user?.name || 'Premium User';
  
  // Priority tasks data
  const priorityTasks = [
    { id: 1, title: 'Complete visa application', completed: false, dueDate: '2024-06-10' },
    { id: 2, title: 'Review property shortlist', completed: true, dueDate: '2024-05-25' },
    { id: 3, title: 'Set up financial consultation', completed: false, dueDate: '2024-06-15' }
  ];
  
  // Next relocation steps
  const nextSteps = [
    { id: 1, title: 'Find housing in Sydney', icon: Home },
    { id: 2, title: 'Submit work visa application', icon: Flag },
    { id: 3, title: 'Research job opportunities', icon: Briefcase },
    { id: 4, title: 'Connect with expat community', icon: HeartHandshake }
  ];
  
  return (
    <DashboardLayout isPremium={true} userName={userName} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Premium Dashboard</h1>
        
        <WelcomeBanner userName={userName} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <DashboardTabs />
            <div>
              <h2 className="text-2xl font-bold mb-4">Premium Features</h2>
              <FeatureGrid isPremium={true} />
            </div>
            <AIAssistantCard />
          </div>
          <div className="space-y-6">
            <PriorityTasksCard tasks={priorityTasks} />
            <RelocationProgress 
              progress={user?.progressPercentage || 65}
              nextSteps={nextSteps}
              isPremium={true}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PremiumDashboard;
