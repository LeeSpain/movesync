
import { PricingPlan } from './PricingCard';

// Define pricing plans
export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: '0',
    description: 'Experience the core features of MoveSync with limited access.',
    features: [
      'AI-powered search, chat, and recommendations (5 uses)',
      'Basic relocation guides',
      'City comparisons',
      'Job search insights',
      'Limited property searches',
      'Basic visa application guidance',
    ],
    limitations: [
      'Limited to 5 AI assistant interactions',
      'No personalized relocation plan',
      'No document management',
      'No email assistance',
    ],
    cta: 'Try for Free',
    popular: false,
  },
  {
    name: 'Premium',
    price: '99',
    description: 'Full access to all MoveSync features with unlimited AI assistance.',
    features: [
      'Unlimited AI search & chat',
      'Full AI concierge with 24/7 support',
      'Personalized relocation plans & timelines',
      'Advanced property search & lease negotiation',
      'AI job matching & career coaching',
      'Comprehensive visa & immigration assistance',
      'AI email & document management',
      'AR/VR home & city exploration',
      'Blockchain document security',
    ],
    limitations: [],
    cta: 'Get Premium',
    popular: true,
  },
];
