
import { AdminStats } from '@/types/adminStats';
import { getInitialAIMetrics, getMockAIMetrics } from './metrics/aiMetrics';

export type { AdminStats } from '@/types/adminStats';

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
  aiMetrics: getInitialAIMetrics()
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
  aiMetrics: getMockAIMetrics()
});
