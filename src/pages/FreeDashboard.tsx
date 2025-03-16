
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
  { id: 1, title: 'Rental properties in Sydney CBD', date: '2 days ago' },
  { id: 2, title: 'Melbourne work visa requirements', date: '5 days ago' },
  { id: 3, title: 'Cost of living in Brisbane', date: '1 week ago' },
];

const FreeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userName = user?.name || 'User';

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

  return (
    <DashboardLayout userName={userName} progressPercentage={user?.progressPercentage || 25}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <UpgradeBanner />
            <QuickActions onFeatureClick={handleFeatureClick} />
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Features</h2>
              <FeatureGrid isPremium={false} limit={6} />
            </div>
            <AIAssistantWidget />
          </div>
          <div className="space-y-6">
            <RelocationProgress 
              progress={user?.progressPercentage || 25}
              nextSteps={[
                { id: 1, title: 'Complete visa assessment', icon: File },
                { id: 2, title: 'Save favorite properties', icon: Heart },
                { id: 3, title: 'Chat with AI assistant', icon: Bot },
              ]}
            />
            <RecentSearches searches={searches} />
            <PremiumFeaturesPreview />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FreeDashboard;
