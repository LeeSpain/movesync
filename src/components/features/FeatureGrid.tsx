
import { featureCategories } from '@/data/featureCategories';
import FeatureCard from './FeatureCard';
import { useNavigate } from 'react-router-dom';

interface FeatureGridProps {
  isPremium?: boolean;
  limit?: number;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ 
  isPremium = false,
  limit 
}) => {
  const navigate = useNavigate();
  const displayFeatures = limit ? featureCategories.slice(0, limit) : featureCategories;
  
  const handleFeatureClick = (featureId: string) => {
    // Construct the path based on the premium status and feature ID
    const basePath = isPremium ? '/dashboard/premium/' : '/dashboard/free/';
    let path;
    
    switch (featureId) {
      case 'home-search':
        path = 'property';
        break;
      case 'visa-support':
        path = 'visa';
        break;
      case 'cost-living':
        path = 'cost-living';
        break;
      case 'job-assistance':
        path = 'jobs';
        break;
      case 'local-services':
        path = 'services';
        break;
      case 'ai-concierge':
        path = 'assistant';
        break;
      default:
        // For features without specific pages, navigate to dashboard
        path = '';
    }
    
    navigate(basePath + path);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayFeatures.map(feature => (
        <FeatureCard 
          key={feature.id}
          feature={feature}
          isPremium={isPremium}
          onClick={() => handleFeatureClick(feature.id)}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;
