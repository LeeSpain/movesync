
import { AIMetrics } from '@/types/adminStats';

export const getInitialAIMetrics = (): AIMetrics => ({
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
});

export const getMockAIMetrics = (): AIMetrics => ({
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
});
