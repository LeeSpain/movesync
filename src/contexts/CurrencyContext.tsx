
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Currency = 'USD' | 'GBP' | 'EUR' | 'AUD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencySymbol: string;
  exchangeRates: Record<Currency, number>;
  convertCurrency: (amount: number) => number;
  formatCurrency: (amount: number) => string;
}

const defaultContext: CurrencyContextType = {
  currency: 'USD',
  setCurrency: () => {},
  currencySymbol: '$',
  exchangeRates: {
    USD: 1,
    GBP: 0.78,
    EUR: 0.91,
    AUD: 1.52
  },
  convertCurrency: () => 0,
  formatCurrency: () => ''
};

const CurrencyContext = createContext<CurrencyContextType>(defaultContext);

export const useCurrency = () => useContext(CurrencyContext);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  
  // Exchange rates relative to USD
  const exchangeRates = {
    USD: 1,
    GBP: 0.78,
    EUR: 0.91,
    AUD: 1.52
  };

  // Get currency symbol based on selected currency
  const getCurrencySymbol = (curr: Currency): string => {
    switch(curr) {
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'AUD': return 'A$';
      default: return '$';
    }
  };
  
  const currencySymbol = getCurrencySymbol(currency);
  
  // Helper function to convert value to selected currency
  const convertCurrency = (amount: number): number => {
    return Math.round(amount * exchangeRates[currency]);
  };
  
  // Helper function to format currency with symbol and commas
  const formatCurrency = (amount: number): string => {
    return `${currencySymbol}${amount.toLocaleString()}`;
  };
  
  return (
    <CurrencyContext.Provider 
      value={{
        currency,
        setCurrency,
        currencySymbol,
        exchangeRates,
        convertCurrency,
        formatCurrency
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
