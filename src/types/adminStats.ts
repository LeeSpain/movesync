
export interface AIMetrics {
  queriesHandled: number;
  satisfactionRate: number;
  avgResponseTime: number;
  topQuestionCategories: Record<string, number>;
  conversationalTurns: number;
  responseQuality: number;
}

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
  aiMetrics: AIMetrics;
}
