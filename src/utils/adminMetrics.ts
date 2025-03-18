// Types and initial state for admin dashboard metrics
export interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  monthlyRevenue: number;
  annualRevenue: number;
  growthRate: number;
  conversionRate: number;
  customerAcquisitionCost: number;
  lifetimeValue: number;
  recentSignups: number;
  totalInvestment: number;
  companyValuation: number;
  equityShare: number;
  aiMetrics: {
    queriesHandled: number;
    satisfactionRate: number;
    avgResponseTime: number;
    topQuestionCategories: Record<string, number>;
    conversationalTurns: number;
    responseQuality: number;
  }
}

export const getInitialStats = (): AdminStats => ({
  totalUsers: 0,
  premiumUsers: 0,
  monthlyRevenue: 0,
  annualRevenue: 0,
  growthRate: 0,
  conversionRate: 0,
  customerAcquisitionCost: 0,
  lifetimeValue: 0,
  recentSignups: 0,
  totalInvestment: 0,
  companyValuation: 0,
  equityShare: 0,
  aiMetrics: {
    queriesHandled: 0,
    satisfactionRate: 0,
    avgResponseTime: 0,
    topQuestionCategories: {
      'Visa Requirements': 0,
      'Property Search': 0,
      'Job Opportunities': 0,
      'Cost of Living': 0,
      'Local Services': 0
    },
    conversationalTurns: 0,
    responseQuality: 0
  }
});

export const getMockStats = (): AdminStats => ({
  totalUsers: 1245,
  premiumUsers: 384,
  monthlyRevenue: 26500,
  annualRevenue: 318000,
  growthRate: 8.4,
  conversionRate: 30.8,
  customerAcquisitionCost: 42,
  lifetimeValue: 850,
  recentSignups: 27,
  totalInvestment: 500000,
  companyValuation: 2500000,
  equityShare: 20,
  aiMetrics: {
    queriesHandled: 8427,
    satisfactionRate: 92,
    avgResponseTime: 1.4,
    topQuestionCategories: {
      'Visa Requirements': 2418,
      'Property Search': 1975,
      'Job Opportunities': 1587,
      'Cost of Living': 1243,
      'Local Services': 1204
    },
    conversationalTurns: 3.7,
    responseQuality: 87
  }
});
