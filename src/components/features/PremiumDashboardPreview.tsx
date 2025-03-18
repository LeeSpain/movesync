
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './premium-dashboard-preview/DashboardHeader';
import FeatureCards from './premium-dashboard-preview/FeatureCards';
import PreviewTabs from './premium-dashboard-preview/PreviewTabs';

const PremiumDashboardPreview = ({ isIntersecting }: { isIntersecting: boolean }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={`mt-20 max-w-7xl mx-auto transition-all duration-700 delay-300 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <DashboardHeader />
      <FeatureCards />
      
      <Card className="bg-gradient-to-br from-gray-50 to-white shadow-lg border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-movesync-blue/10 to-movesync-blue-light/10 p-4 border-b border-movesync-blue/10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Premium Dashboard Preview</h3>
              <p className="text-movesync-gray text-sm">All the tools you need for a seamless Australian relocation</p>
            </div>
            <Button size="sm" onClick={() => navigate('/checkout')}>
              Upgrade to Premium
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          <PreviewTabs />
        </CardContent>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <p className="text-movesync-gray-dark text-sm italic">
            *Preview of premium features. Upgrade for full access and personalized assistance.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/premium-dashboard')} 
            className="flex items-center bg-movesync-blue/5 hover:bg-movesync-blue/10"
          >
            Explore Full Features <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PremiumDashboardPreview;
