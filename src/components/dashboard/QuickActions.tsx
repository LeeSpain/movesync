
import { ChevronRight, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type QuickActionsProps = {
  onFeatureClick: (feature: string) => void;
};

const QuickActions = ({ onFeatureClick }: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        <CardDescription>Common relocation tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={() => onFeatureClick('property')}
          >
            Start a property search <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={() => onFeatureClick('visa')}
          >
            Check visa eligibility <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={() => onFeatureClick('cost')}
          >
            Calculate cost of living <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-between opacity-60"
            onClick={() => onFeatureClick('services')}
          >
            Explore local services <Lock className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
