
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useCurrency } from '@/contexts/CurrencyContext';

interface GrowthChartProps {
  data: Array<{ year: string; value: number }>;
  equityValue: number;
  viewMode: 'global' | 'country';
  selectedCountry: string;
  growthRate: number;
}

const GrowthChart: React.FC<GrowthChartProps> = ({ 
  data, 
  equityValue, 
  viewMode, 
  selectedCountry,
  growthRate
}) => {
  const { currencySymbol, formatCurrency } = useCurrency();

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-4">
        {viewMode === 'global' 
          ? 'Global Growth Projection (All Countries)'
          : `Growth Projection for ${selectedCountry}`
        }
      </h3>
      <div className="h-[250px] w-full">
        <ChartContainer 
          config={{
            value: { theme: { light: "#0ea5e9", dark: "#0ea5e9" }, label: "Value" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
            >
              <XAxis dataKey="year" />
              <YAxis 
                tickFormatter={(value) => `${currencySymbol}${(value / 1000).toFixed(0)}k`}
                width={60}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                        <p className="text-sm font-medium">{payload[0].payload.year}</p>
                        <p className="text-sm text-blue-600">
                          {formatCurrency(Number(payload[0].value))}
                        </p>
                        <p className="text-xs text-green-600">
                          +{Math.round((Number(payload[0].value) / equityValue - 1) * 100)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default GrowthChart;
