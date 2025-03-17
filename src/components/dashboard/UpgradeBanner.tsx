
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type UpgradeBannerProps = {
  onUpgrade: () => void;
};

const UpgradeBanner = ({ onUpgrade }: UpgradeBannerProps) => {
  const navigate = useNavigate();
  
  const handleUpgradeClick = () => {
    // Call the onUpgrade callback (which typically shows a toast)
    onUpgrade();
    
    // Navigate to the checkout page
    navigate('/checkout');
  };
  
  return (
    <Card className="bg-gradient-to-r from-movesync-blue-light to-movesync-blue text-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2">Welcome to Your Free Dashboard!</h2>
            <p className="max-w-2xl">
              You're currently on the Free plan with limited access. Upgrade to Premium for unlimited AI assistance, 
              property search, visa support, and more.
            </p>
          </div>
          <Button 
            onClick={handleUpgradeClick}
            className="bg-white text-movesync-blue hover:bg-gray-100 whitespace-nowrap"
          >
            Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpgradeBanner;
