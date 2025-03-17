
// Common investment types shared across components
export type CountryGrowthRates = {
  [country: string]: number;
};

export interface InvestmentParams {
  premoneyValuation: number;
  targetRaise: number;
  postmoneyValuation: number;
  totalEquityOffered: number;
}

export interface ComparisonData {
  country: string;
  finalReturn: number;
  growthPercentage: number;
}
