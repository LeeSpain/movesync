
import { FeatureCategory } from '@/types/features';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface FeatureCardProps {
  feature: FeatureCategory;
  isPremium?: boolean;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  feature, 
  isPremium = false,
  onClick 
}) => {
  const Icon = feature.icon;
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
        <ul className="space-y-1">
          {feature.items.slice(0, 2).map((item, idx) => (
            <li key={idx} className="text-sm flex items-start gap-2">
              <span className="text-primary">•</span> {item}
            </li>
          ))}
          {feature.items.length > 2 && (
            <li className="text-sm text-muted-foreground">
              +{feature.items.length - 2} more features
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="pt-2">
        {isPremium ? (
          <Button size="sm" className="w-full" onClick={onClick}>
            Access feature <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="w-full" onClick={onClick}>
            Upgrade to access <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
