
import { Bot, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const CostOfLivingTab = () => {
  return (
    <div className="mt-0 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Australia Cost of Living Analysis</h3>
          <p className="text-movesync-gray">Personalized for your lifestyle in Sydney</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-movesync-gray">Compare with:</span>
          <select className="border border-gray-200 rounded-md px-2 py-1 text-sm">
            <option>Melbourne</option>
            <option>Brisbane</option>
            <option>Perth</option>
            <option>Adelaide</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Monthly Budget</CardTitle>
            <CardDescription>Based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$4,250 AUD</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Housing (40%)</span>
                  <span>$1,700</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Food (20%)</span>
                  <span>$850</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Transportation (15%)</span>
                  <span>$640</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Utilities (10%)</span>
                  <span>$425</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Entertainment (10%)</span>
                  <span>$425</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Miscellaneous (5%)</span>
                  <span>$210</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Sydney Cost Insights</CardTitle>
            <CardDescription>Live data from local sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-movesync-gray mb-1 text-sm">Average 1BR Apartment</div>
                <div className="font-semibold">$500-650/week</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-movesync-gray mb-1 text-sm">Monthly Transit Pass</div>
                <div className="font-semibold">$217 AUD</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-movesync-gray mb-1 text-sm">Meal at Restaurant</div>
                <div className="font-semibold">$20-35 AUD</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-movesync-gray mb-1 text-sm">Monthly Utilities</div>
                <div className="font-semibold">$200-300 AUD</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-movesync-gray mb-1 text-sm">Internet</div>
                <div className="font-semibold">$70-100 AUD</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-movesync-gray mb-1 text-sm">Gym Membership</div>
                <div className="font-semibold">$60-100 AUD</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">AI Cost-Saving Tips</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Consider suburbs like Marrickville or Newtown for more affordable housing with good transport links.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>An Opal card offers fare caps and discounts for public transportation.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Weekend markets like Paddy's Market offer fresh produce at lower prices than major supermarkets.</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <Bot className="h-4 w-4 mr-2" /> Ask AI for Detailed Cost Breakdown
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CostOfLivingTab;
