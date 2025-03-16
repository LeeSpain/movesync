
import { Bot, Calendar, Bell, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type PremiumFeaturesPreviewProps = {
  onUpgrade: () => void;
};

const PremiumFeaturesPreview = ({ onUpgrade }: PremiumFeaturesPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Features Preview</CardTitle>
        <CardDescription>
          See what you're missing in the free plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-movesync-blue/10 flex items-center justify-center mb-3">
              <Bot className="h-5 w-5 text-movesync-blue" />
            </div>
            <h3 className="font-medium mb-2">Unlimited AI Assistance</h3>
            <p className="text-sm text-movesync-gray-dark mb-4">24/7 AI support for all your relocation needs.</p>
            <Button variant="outline" size="sm" className="mt-auto" onClick={onUpgrade}>
              Unlock <Lock className="ml-2 h-3 w-3" />
            </Button>
          </div>
          
          <div className="border border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-movesync-blue/10 flex items-center justify-center mb-3">
              <Calendar className="h-5 w-5 text-movesync-blue" />
            </div>
            <h3 className="font-medium mb-2">Custom Relocation Timeline</h3>
            <p className="text-sm text-movesync-gray-dark mb-4">AI-generated personalized moving schedules.</p>
            <Button variant="outline" size="sm" className="mt-auto" onClick={onUpgrade}>
              Unlock <Lock className="ml-2 h-3 w-3" />
            </Button>
          </div>
          
          <div className="border border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-movesync-blue/10 flex items-center justify-center mb-3">
              <Bell className="h-5 w-5 text-movesync-blue" />
            </div>
            <h3 className="font-medium mb-2">Smart Notifications</h3>
            <p className="text-sm text-movesync-gray-dark mb-4">Timely alerts for critical relocation steps.</p>
            <Button variant="outline" size="sm" className="mt-auto" onClick={onUpgrade}>
              Unlock <Lock className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onUpgrade}>
          Upgrade to Premium for Just $99/month
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumFeaturesPreview;
