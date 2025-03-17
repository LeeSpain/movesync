
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const JobSearchTips = () => {
  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Job Search Tips</CardTitle>
        <CardDescription>AI-powered recommendations to help your application stand out</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <h3 className="font-medium">Resume Tips</h3>
            </div>
            <p className="text-sm text-muted-foreground">Tailor your resume for Australian employers by highlighting relevant skills and using local terminology.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <h3 className="font-medium">Interview Preparation</h3>
            </div>
            <p className="text-sm text-muted-foreground">Research Australian workplace culture and prepare specific examples of your achievements for behavioral questions.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <h3 className="font-medium">Visa Requirements</h3>
            </div>
            <p className="text-sm text-muted-foreground">Ensure you understand your work rights in Australia and mention your visa status clearly in your application.</p>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Get Personalized Job Search Coaching
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobSearchTips;
