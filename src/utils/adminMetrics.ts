
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
  aiMetrics: {
    queriesHandled: number;
    satisfactionRate: number;
    avgResponseTime: number;
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
  aiMetrics: {
    queriesHandled: 0,
    satisfactionRate: 0,
    avgResponseTime: 0,
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
  aiMetrics: {
    queriesHandled: 8427,
    satisfactionRate: 92,
    avgResponseTime: 1.4,
  }
});
