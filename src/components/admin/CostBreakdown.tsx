
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart } from '@/components/ui/charts';

interface CostBreakdownProps {
  costBreakdownData: any;
}

const CostBreakdown = ({ costBreakdownData }: CostBreakdownProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Operational Cost Breakdown</CardTitle>
        <CardDescription>Distribution of monthly expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <PieChart data={costBreakdownData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$18,200</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">31.3%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Break-even Point</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">243 subscribers</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
