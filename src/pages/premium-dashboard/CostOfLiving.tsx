
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import the refactored components
import BudgetCalculatorTab from '@/components/premium-dashboard/cost-living/BudgetCalculatorTab';
import CityComparisonTab from '@/components/premium-dashboard/cost-living/CityComparisonTab';
import CommonExpensesTab from '@/components/premium-dashboard/cost-living/CommonExpensesTab';
import CostOfLivingTab from '@/components/premium-dashboard/CostOfLivingTab';

// Import the data
import { cityData, commonExpenses } from '@/components/premium-dashboard/cost-living/costOfLivingData';

const CostOfLiving = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Cost of Living</h1>
        <p className="text-muted-foreground">Plan your budget with accurate cost of living information for Australian cities.</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4 bg-transparent space-x-2 h-auto overflow-x-auto p-0 flex-wrap">
            <TabsTrigger 
              value="calculator" 
              className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
            >
              Budget Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="comparison" 
              className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
            >
              City Comparison
            </TabsTrigger>
            <TabsTrigger 
              value="expenses" 
              className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
            >
              Common Expenses
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:bg-movesync-blue/10 data-[state=active]:text-movesync-blue rounded-lg px-4 py-2"
            >
              Local Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <BudgetCalculatorTab cityData={cityData} />
          </TabsContent>
          
          <TabsContent value="comparison">
            <CityComparisonTab cityData={cityData} />
          </TabsContent>
          
          <TabsContent value="expenses">
            <CommonExpensesTab expensesList={commonExpenses} />
          </TabsContent>
          
          <TabsContent value="insights">
            <CostOfLivingTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CostOfLiving;
