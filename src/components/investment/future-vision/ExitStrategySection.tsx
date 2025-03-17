
import React from 'react';
import ExitStrategyTable from './ExitStrategyTable';
import ExitOptions from './ExitOptions';
import ExitTimeline from './ExitTimeline';

interface ExitStrategySectionProps {
  investmentAmount: number;
  finalReturn: number;
  years: number;
  conservativeExit: number;
  moderateExit: number;
  optimisticExit: number;
}

const ExitStrategySection: React.FC<ExitStrategySectionProps> = ({
  investmentAmount,
  finalReturn,
  years,
  conservativeExit,
  moderateExit,
  optimisticExit
}) => {
  return (
    <div className="mt-10 bg-amber-50 p-6 rounded-xl border border-amber-200">
      <h3 className="font-bold text-xl mb-4 text-center">Exit Strategy</h3>
      <p className="mb-6">
        Our clear exit strategy aims to maximize shareholder returns within a 5-year horizon:
      </p>
      
      <ExitStrategyTable 
        investmentAmount={investmentAmount}
        finalReturn={finalReturn}
        years={years}
        conservativeExit={conservativeExit}
        moderateExit={moderateExit}
        optimisticExit={optimisticExit}
      />
      
      <ExitOptions />
      <ExitTimeline />
    </div>
  );
};

export default ExitStrategySection;
