
import { 
  Home, Briefcase, Globe, CreditCard, Map, 
  Truck, Languages, Bot, Lock
} from 'lucide-react';
import { FeatureCategory } from '@/types/features';

// Feature data with Australian-specific context
export const featureCategories: FeatureCategory[] = [
  {
    id: 'home-search',
    title: 'AI-Powered Australian Property Finder',
    description: 'Find your perfect Australian home with personalized AI property matching and market analysis.',
    icon: Home,
    australianContext: 'Access real-time insights into Sydney, Melbourne, Brisbane, and other Australian property markets.',
    items: [
      'Personalized AI property matching based on Australian lifestyle preferences',
      'Real-time market analysis of Australian property trends',
      'Virtual property tours of Australian homes with AR/VR technology',
      'AI-driven lease negotiation assistance with Australian landlords'
    ]
  },
  {
    id: 'visa-support',
    title: 'Australian Visa & Immigration',
    description: 'Navigate complex Australian visa processes with AI guidance on eligibility and applications.',
    icon: Globe,
    australianContext: 'Get precise guidance on work visas, skilled migration, and permanent residency pathways in Australia.',
    items: [
      'Step-by-step Australian visa application guidance',
      'Real-time Australian visa eligibility assessment',
      'Automated Australian immigration document processing',
      'Department of Home Affairs appointment scheduling'
    ]
  },
  {
    id: 'cost-living',
    title: 'Australian Cost of Living Analysis',
    description: 'Get detailed cost breakdowns and financial planning tools for your new Australian location.',
    icon: CreditCard,
    australianContext: 'Compare living costs across Sydney, Melbourne, Brisbane, Perth, and other Australian cities.',
    items: [
      'Australian-specific expense estimator with local data',
      'Australian city and suburb comparisons',
      'AI financial planning tools with AUD currency',
      'Australian salary analysis and tax calculations'
    ]
  },
  {
    id: 'local-services',
    title: 'Australian Services Finder',
    description: 'Discover essential local services with AI-curated directories and verified reviews across Australia.',
    icon: Map,
    australianContext: 'Find the best local services in your Australian neighborhood, from Medicare providers to NBN plans.',
    items: [
      'AI-curated Australian service directories',
      'Verified reviews of Australian service providers',
      'Automated appointment scheduling with Australian businesses',
      'Personalized recommendations based on your Australian neighborhood'
    ]
  },
  {
    id: 'job-assistance',
    title: 'Australian Job & Career Assistance',
    description: 'Accelerate your career in Australia with AI job matching and professional development tools.',
    icon: Briefcase,
    australianContext: "Connect with opportunities in Australia's booming industries, from tech in Sydney to mining in Perth.",
    items: [
      "AI job matching based on Australia's skill shortages",
      'Remote work opportunities within Australian time zones',
      'Resume optimization for Australian employers',
      'Interview preparation with AI coaching for Australian workplaces'
    ]
  },
  {
    id: 'moving-logistics',
    title: 'Australia Moving Logistics',
    description: 'Streamline your move to Australia with AI-scheduled services and settling-in assistance.',
    icon: Truck,
    australianContext: 'Get help with everything from international shipping to setting up utilities in your new Australian home.',
    items: [
      'AI-scheduled international shipping to Australia',
      'Australian utility setup (electricity, gas, NBN)',
      'Local Australian neighborhood orientation guides',
      'Customs declaration assistance for Australian imports'
    ]
  },
  {
    id: 'cultural-support',
    title: 'Australian Culture & Language',
    description: 'Integrate smoothly with AI language learning and Australian cultural adaptation resources.',
    icon: Languages,
    australianContext: 'Learn Australian slang, cultural norms, and social etiquette to feel at home down under.',
    items: [
      'Australian slang and expressions guide',
      'Australian cultural integration assistance',
      'Local Australian customs and etiquette tips',
      'Australian community networking opportunities'
    ]
  },
  {
    id: 'ai-concierge',
    title: 'Australian AI Concierge',
    description: 'Enjoy 24/7 support from a realistic AI assistant that handles your relocation needs in Australia.',
    icon: Bot,
    australianContext: 'Your personal assistant is available 24/7, working in Australian time zones when you need help.',
    items: [
      'Real-time AI chat with Australian local knowledge',
      'Personalized Australian relocation reminders',
      'Communication management with Australian service providers',
      'Round-the-clock Australian relocation assistance'
    ]
  },
  {
    id: 'advanced-tools',
    title: 'Advanced Australian Tools',
    description: 'Access cutting-edge tools like blockchain document security and AR exploration of Australian properties.',
    icon: Lock,
    australianContext: 'Utilize cutting-edge technology to make your Australian relocation seamless and secure.',
    items: [
      'AI-generated Australian relocation timelines',
      'Blockchain-verified document security for Australian authorities',
      'AI relocation readiness assessments for Australia',
      'AR/VR exploration of Australian neighborhoods before arrival'
    ]
  }
];
