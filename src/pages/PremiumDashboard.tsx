
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
    { id: 1, title: 'Complete visa application', completed: false, dueDate: '2024-06-10', priority: 'high' },
    { id: 2, title: 'Review property shortlist', completed: true, dueDate: '2024-05-25', priority: 'medium' },
    { id: 3, title: 'Set up financial consultation', completed: false, dueDate: '2024-06-15', priority: 'low' }
  ];
  
  // Next relocation steps
  const nextSteps = [
    { id: 1, title: 'Find housing in Sydney', icon: Home },
    { id: 2, title: 'Submit work visa application', icon: Flag },
    { id: 3, title: 'Research job opportunities', icon: Briefcase },
    { id: 4, title: 'Connect with expat community', icon: HeartHandshake }
  ];

  // Initial AI assistant messages
  const initialMessages = [
    { role: 'assistant', content: 'Welcome back! How can I assist with your Australian relocation today?' },
    { role: 'user', content: 'What documents do I need for my work visa?' },
    { role: 'assistant', content: 'For your Australian work visa, you'll need: passport, proof of qualifications, employer sponsorship letter, and health insurance. I can help you organize these if you'd like.' }
  ];

  // Mock data for tabs
  const properties = [
    { id: 1, title: 'Modern 2BR Apartment', location: 'Sydney CBD', price: '$650/week', match: 95, image: '/placeholder.svg' },
    { id: 2, title: 'Family House with Garden', location: 'Melbourne Eastern Suburbs', price: '$750/week', match: 88, image: '/placeholder.svg' },
    { id: 3, title: 'Beachside Studio', location: 'Gold Coast', price: '$520/week', match: 82, image: '/placeholder.svg' }
  ];

  const visaSteps = [
    { id: 1, title: 'Application Submitted', completed: true, date: 'May 15, 2024' },
    { id: 2, title: 'Documents Review', completed: true, date: 'May 25, 2024' },
    { id: 3, title: 'Background Check', inProgress: true, completed: false, date: 'In Progress' },
    { id: 4, title: 'Visa Decision', completed: false, date: 'Estimated: July 2024' }
  ];

  const jobs = [
    { id: 1, title: 'Senior Developer', company: 'TechSydney', location: 'Sydney', match: 92, salary: '$120-140K' },
    { id: 2, title: 'Product Manager', company: 'AusFintech', location: 'Melbourne', match: 85, salary: '$110-130K' },
    { id: 3, title: 'UX Designer', company: 'CreativeOz', location: 'Brisbane', match: 78, salary: '$90-110K' }
  ];

  const handleTabChange = (tab: string) => {
    console.log('Tab changed to:', tab);
  };

  const handleTaskComplete = (taskId: number) => {
    console.log('Task completed:', taskId);
  };
  
  return (
    <DashboardLayout isPremium={true} userName={userName} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Premium Dashboard</h1>
        
        <WelcomeBanner userName={userName} progressPercentage={user?.progressPercentage || 65} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <DashboardTabs 
              properties={properties} 
              visaSteps={visaSteps} 
              jobs={jobs} 
              onTabChange={handleTabChange} 
            />
            <div>
              <h2 className="text-2xl font-bold mb-4">Premium Features</h2>
              <FeatureGrid isPremium={true} />
            </div>
            <AIAssistantCard initialMessages={initialMessages} />
          </div>
          <div className="space-y-6">
            <PriorityTasksCard tasks={priorityTasks} onTaskComplete={handleTaskComplete} />
            <RelocationProgress 
              progressPercentage={user?.progressPercentage || 65}
              tasks={nextSteps.map(step => ({ 
                id: step.id, 
                title: step.title, 
                completed: step.id <= 2, 
                dueDate: step.id <= 2 ? 'Completed' : 'Pending'
              }))}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PremiumDashboard;
