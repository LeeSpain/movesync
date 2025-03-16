
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

type WelcomeBannerProps = {
  userName: string;
  progressPercentage: number;
};

const WelcomeBanner = ({ userName, progressPercentage }: WelcomeBannerProps) => {
  return (
    <Card className="bg-gradient-to-r from-movesync-blue to-movesync-blue-light text-white overflow-hidden">
      <CardContent className="p-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back, {userName}!</h2>
            <p className="max-w-2xl mb-4">
              Your premium relocation journey to Australia is progressing well. 
              You've completed {progressPercentage}% of your relocation tasks.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/20 hover:bg-white/30">Visa: In Progress</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">Housing: 3 Matches</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">Moving Date: Aug 15</Badge>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Priority Action Required
            </h3>
            <p className="text-sm mb-3">
              Your visa application needs additional documents before July 5th.
            </p>
            <Button size="sm" className="bg-white text-movesync-blue hover:bg-gray-100">
              Review Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
