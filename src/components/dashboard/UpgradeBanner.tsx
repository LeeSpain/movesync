
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpgradeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    // Navigate directly to checkout since the user has decided to upgrade
    navigate('/checkout');
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-gradient-to-r from-movesync-blue/10 to-purple-500/10 rounded-lg p-4 mb-6 border border-movesync-blue/20">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Upgrade to Premium</h3>
          <p className="text-muted-foreground text-sm">
            Unlock all features and get unlimited access to AI assistance for your relocation
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Unlimited AI search & chat</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Advanced property search</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>AI job matching</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Visa & immigration assistance</span>
            </div>
          </div>
          
          <Button onClick={handleUpgrade} className="mt-2">
            Upgrade Now
          </Button>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default UpgradeBanner;
