
export type CountryGrowthRates = Record<string, number>;

export interface InvestmentParams {
  premoneyValuation: number;
  targetRaise: number;
  postmoneyValuation: number;
  totalEquityOffered: number;
}

export type Currency = 'USD' | 'GBP' | 'EUR' | 'AUD';
