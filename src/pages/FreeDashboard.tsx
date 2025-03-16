
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, File, Heart } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import UpgradeBanner from '@/components/dashboard/UpgradeBanner';
import QuickActions from '@/components/dashboard/QuickActions';
import AIAssistantWidget from '@/components/dashboard/AIAssistantWidget';
import RecentSearches from '@/components/dashboard/RecentSearches';
import RelocationProgress from '@/components/dashboard/RelocationProgress';
import PremiumFeaturesPreview from '@/components/dashboard/PremiumFeaturesPreview';
import FeatureGrid from '@/components/features/FeatureGrid';

// Mock data
const searches = [
  { id: 1, query: 'Rental properties in Sydney CBD', date: '2 days ago' },
  { id: 2, query: 'Melbourne work visa requirements', date: '5 days ago' },
  { id: 3, query: 'Cost of living in Brisbane', date: '1 week ago' },
];

const FreeDashboard = () => {
  const { user, upgradeToPremium } = useAuth();
  const navigate = useNavigate();
  const userName = user?.name || 'User';
  const [aiChatsRemaining] = useState(3);
  const [chatHistory] = useState([
    { role: 'assistant', content: 'Hello! How can I help with your relocation to Australia?' },
    { role: 'user', content: 'What are the best suburbs in Sydney for families?' },
    { role: 'assistant', content: 'Great question! Some family-friendly suburbs in Sydney include Hornsby, Epping, Lane Cove, and Randwick. These areas have good schools, parks, and family amenities.' }
  ]);

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'property':
        navigate('/dashboard/free/property');
        break;
      case 'visa':
        navigate('/dashboard/free/visa');
        break;
      case 'cost':
        navigate('/dashboard/free/cost-living');
        break;
      case 'services':
        // Premium-only feature, no navigation (handled by QuickActions)
        break;
      default:
        navigate('/dashboard/free');
    }
  };

  const handleUpgrade = () => {
    upgradeToPremium();
    navigate('/dashboard/premium');
  };
  
  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // In a real app, this would send the message to an API
  };

  const tasks = [
    { id: 1, title: 'Research Sydney suburbs', dueDate: 'June 15', completed: false },
    { id: 2, title: 'Check visa requirements', dueDate: 'June 20', completed: false },
    { id: 3, title: 'Set budget estimate', dueDate: 'June 30', completed: true },
  ];

  return (
    <DashboardLayout userName={userName} progressPercentage={user?.progressPercentage || 25}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <UpgradeBanner onUpgrade={handleUpgrade} />
            <QuickActions onFeatureClick={handleFeatureClick} />
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Features</h2>
              <FeatureGrid isPremium={false} limit={6} />
            </div>
            <AIAssistantWidget 
              aiChatsRemaining={aiChatsRemaining} 
              chatHistory={chatHistory} 
              onSendMessage={handleSendMessage} 
              onUpgrade={handleUpgrade} 
            />
          </div>
          <div className="space-y-6">
            <RelocationProgress 
              progressPercentage={user?.progressPercentage || 25}
              tasks={tasks}
            />
            <RecentSearches searches={searches} />
            <PremiumFeaturesPreview onUpgrade={handleUpgrade} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FreeDashboard;
