
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { calculateROI } from './InvestmentUtils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Import the new sub-components
import GrowthRoadmap from './future-vision/GrowthRoadmap';
import GrowthStrategies from './future-vision/GrowthStrategy';
import FinancialMilestones from './future-vision/FinancialMilestones';
import ExitStrategySection from './future-vision/ExitStrategySection';

const FutureVision = () => {
  const { 
    investmentAmount, 
    years,
    financialParams,
    globalGrowthRate
  } = useInvestment();
  
  // Calculate equity value based on investment amount
  const equityPercentage = (investmentAmount / financialParams.postmoneyValuation) * 100;
  const equityValue = (equityPercentage / 100) * financialParams.postmoneyValuation;
  
  // Calculate projected returns based on user's selected years
  const projectedReturns = calculateROI(equityValue, years, globalGrowthRate);
  const finalReturn = projectedReturns[projectedReturns.length - 1];
  const returnPercentage = Math.round((finalReturn / equityValue - 1) * 100);
  
  // Calculate 5-year projection regardless of selected year value
  const fiveYearProjection = financialParams.premoneyValuation * Math.pow(1 + globalGrowthRate, 5);
  
  // Calculate exit values based on different multiples
  const conservativeExit = finalReturn * 5; // 5x return on final value
  const moderateExit = finalReturn * 7; // 7x return on final value
  const optimisticExit = finalReturn * 10; // 10x return on final value

  // Calculate cumulative returns over the investment period
  const cumulativeReturns = projectedReturns.reduce((sum, value) => sum + value, 0);
  const totalReturnPercentage = Math.round((cumulativeReturns / investmentAmount - 1) * 100);

  return (
    <Card className="shadow-md border border-gray-200">
      <CardHeader className="pb-0">
        <CardTitle className="text-center text-2xl">Sight Into The Future</CardTitle>
        <CardDescription className="text-center pt-2 pb-4">
          How we'll achieve our projected {(globalGrowthRate * 100).toFixed(0)}% annual growth and deliver your investment returns
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pt-6 pb-8">
        <GrowthRoadmap 
          investmentAmount={investmentAmount}
          finalReturn={finalReturn}
          returnPercentage={returnPercentage}
          years={years}
          globalGrowthRate={globalGrowthRate}
          premoneyValuation={financialParams.premoneyValuation}
          fiveYearProjection={fiveYearProjection}
        />
        
        <GrowthStrategies />
        
        <FinancialMilestones />
        
        <ExitStrategySection 
          investmentAmount={investmentAmount}
          finalReturn={finalReturn}
          years={years}
          conservativeExit={conservativeExit}
          moderateExit={moderateExit}
          optimisticExit={optimisticExit}
        />
      </CardContent>
    </Card>
  );
};

export default FutureVision;
