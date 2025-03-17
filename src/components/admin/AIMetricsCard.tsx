
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AIMetricsCardProps {
  title: string;
  value: string;
  trend: string;
  description: string;
  icon: React.ReactNode;
}

const AIMetricsCard = ({
  title,
  value,
  trend,
  description,
  icon
}: AIMetricsCardProps) => {
  // Determine if trend is positive or negative
  const isTrendPositive = trend.startsWith('+');
  const isTrendNeutral = trend === '0%' || trend === '0';
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              <span className={cn(
                "text-xs font-medium",
                isTrendPositive ? "text-green-600" : 
                isTrendNeutral ? "text-gray-500" : "text-red-600"
              )}>
                {trend}
              </span>
            </div>
          </div>
          <div className="p-2 bg-blue-50 text-blue-700 rounded-md">
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AIMetricsCard;
