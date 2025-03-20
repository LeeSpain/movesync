
import React from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Currency } from '@/contexts/CurrencyContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DollarSign } from 'lucide-react';

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  
  return (
    <div className="flex items-center">
      <Select
        value={currency}
        onValueChange={(value) => setCurrency(value as Currency)}
      >
        <SelectTrigger className="w-[90px] h-8 bg-transparent border-none shadow-none hover:bg-accent/50 focus:ring-0">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <SelectValue placeholder="Currency" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD ($)</SelectItem>
          <SelectItem value="GBP">GBP (£)</SelectItem>
          <SelectItem value="EUR">EUR (€)</SelectItem>
          <SelectItem value="AUD">AUD (A$)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
