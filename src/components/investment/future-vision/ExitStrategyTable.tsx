
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

interface ExitStrategyTableProps {
  investmentAmount: number;
  finalReturn: number;
  years: number;
  conservativeExit: number;
  moderateExit: number;
  optimisticExit: number;
}

const ExitStrategyTable: React.FC<ExitStrategyTableProps> = ({
  investmentAmount,
  finalReturn,
  years,
  conservativeExit,
  moderateExit,
  optimisticExit
}) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm mb-6">
      <h4 className="font-bold text-lg mb-3 text-center">Your Investment Return Breakdown</h4>
      <div className="overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr className="bg-amber-50">
              <th className="p-2 text-left">Exit Scenario</th>
              <th className="p-2 text-right">Your Initial ${investmentAmount.toLocaleString()}</th>
              <th className="p-2 text-right">Year {years} Value</th>
              <th className="p-2 text-right">Exit Multiplier</th>
              <th className="p-2 text-right">Potential Exit Value</th>
              <th className="p-2 text-right">Total Return</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-amber-100">
              <td className="p-2 font-medium">Conservative</td>
              <td className="p-2 text-right">${investmentAmount.toLocaleString()}</td>
              <td className="p-2 text-right">${finalReturn.toLocaleString()}</td>
              <td className="p-2 text-right">5x</td>
              <td className="p-2 text-right text-green-600">${conservativeExit.toLocaleString()}</td>
              <td className="p-2 text-right text-green-600">{Math.round((conservativeExit/investmentAmount - 1) * 100)}%</td>
            </tr>
            <tr className="border-b border-amber-100">
              <td className="p-2 font-medium">Moderate</td>
              <td className="p-2 text-right">${investmentAmount.toLocaleString()}</td>
              <td className="p-2 text-right">${finalReturn.toLocaleString()}</td>
              <td className="p-2 text-right">7x</td>
              <td className="p-2 text-right text-green-600">${moderateExit.toLocaleString()}</td>
              <td className="p-2 text-right text-green-600">{Math.round((moderateExit/investmentAmount - 1) * 100)}%</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Optimistic</td>
              <td className="p-2 text-right">${investmentAmount.toLocaleString()}</td>
              <td className="p-2 text-right">${finalReturn.toLocaleString()}</td>
              <td className="p-2 text-right">10x</td>
              <td className="p-2 text-right text-green-600">${optimisticExit.toLocaleString()}</td>
              <td className="p-2 text-right text-green-600">{Math.round((optimisticExit/investmentAmount - 1) * 100)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-600 italic">
        This projection shows how your ${investmentAmount.toLocaleString()} investment could grow to ${finalReturn.toLocaleString()} in {years} years, 
        and then to ${optimisticExit.toLocaleString()} in our optimistic exit scenario.
      </p>
    </div>
  );
};

export default ExitStrategyTable;
