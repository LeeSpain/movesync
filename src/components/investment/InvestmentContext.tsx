
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CountryGrowthRates, InvestmentParams } from './InvestmentTypes';

interface InvestmentContextType {
  investmentAmount: number;
  setInvestmentAmount: (amount: number) => void;
  years: number;
  setYears: (years: number) => void;
  viewMode: 'global' | 'country';
  setViewMode: (mode: 'global' | 'country') => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  countryGrowthRates: CountryGrowthRates;
  financialParams: InvestmentParams;
  globalGrowthRate: number;
}

const defaultContext: InvestmentContextType = {
  investmentAmount: 100000,
  setInvestmentAmount: () => {},
  years: 3,
  setYears: () => {},
  viewMode: 'global',
  setViewMode: () => {},
  selectedCountry: 'Australia',
  setSelectedCountry: () => {},
  countryGrowthRates: {},
  financialParams: {
    premoneyValuation: 12000000,
    targetRaise: 2000000,
    postmoneyValuation: 14000000,
    totalEquityOffered: 20 // Updated from 14.29 to 20 percent
  },
  globalGrowthRate: 0
};

const InvestmentContext = createContext<InvestmentContextType>(defaultContext);

export const useInvestment = () => useContext(InvestmentContext);

interface InvestmentProviderProps {
  children: ReactNode;
}

export const InvestmentProvider: React.FC<InvestmentProviderProps> = ({ children }) => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [years, setYears] = useState(3);
  const [viewMode, setViewMode] = useState<'global' | 'country'>('global');
  const [selectedCountry, setSelectedCountry] = useState('Australia');
  
  // Financial parameters
  const financialParams: InvestmentParams = {
    premoneyValuation: 12000000, // $12M pre-money valuation
    targetRaise: 2000000, // $2M raise
    postmoneyValuation: 14000000, // $14M post-money valuation
    totalEquityOffered: 20 // Updated from 14.29% to 20% equity offered
  };
  
  // Countries and their growth rates
  const countryGrowthRates: CountryGrowthRates = {
    'Australia': 0.30, // 30% annual growth
    'New Zealand': 0.28, // 28% annual growth
    'Canada': 0.32, // 32% annual growth
    'United Kingdom': 0.25, // 25% annual growth
    'Singapore': 0.35, // 35% annual growth
  };
  
  // Calculate global growth rate (weighted average of all countries)
  const calculateGlobalGrowthRate = () => {
    const rates = Object.values(countryGrowthRates);
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
  };
  
  const globalGrowthRate = calculateGlobalGrowthRate();
  
  return (
    <InvestmentContext.Provider 
      value={{
        investmentAmount,
        setInvestmentAmount,
        years,
        setYears,
        viewMode,
        setViewMode,
        selectedCountry,
        setSelectedCountry,
        countryGrowthRates,
        financialParams,
        globalGrowthRate
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};
