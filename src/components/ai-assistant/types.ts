
export type Message = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
};

export type Country = {
  id: string;
  name: string;
  flag: string;
};

export const countries: Country[] = [
  { id: 'spain', name: 'Spain', flag: '🇪🇸' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'usa', name: 'United States', flag: '🇺🇸' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺' },
];

// Predefined responses from AI assistant based on country
export const aiResponses = {
  spain: [
    "I can help you search for apartments in Barcelona within your budget. Would you like to specify any preferred neighborhoods or amenities?",
    "Based on your job profile as a software engineer, I've found 15 potential opportunities in Barcelona. Would you like me to share more details?",
    "Your visa eligibility for Spain looks promising! As a citizen from your country, you'll need these 5 documents for your visa application. I can help you prepare them.",
    "I've analyzed the cost of living in Barcelona. For your lifestyle, expect to spend around €2,500 monthly. Would you like a detailed breakdown?",
    "I can connect you with local services like internet providers, healthcare options, and banking in Barcelona. Which would you like to explore first?"
  ],
  uk: [
    "I can help you search for flats in London within your budget. Would you like to specify any preferred neighborhoods or amenities?",
    "Based on your job profile as a software engineer, I've found 20 potential opportunities in London. Would you like me to share more details?",
    "Your visa eligibility for the UK looks promising! As a citizen from your country, you'll need these specific documents for your visa application. I can help you prepare them.",
    "I've analyzed the cost of living in London. For your lifestyle, expect to spend around £3,000 monthly. Would you like a detailed breakdown?",
    "I can connect you with local services like internet providers, NHS registration, and banking in London. Which would you like to explore first?"
  ],
  usa: [
    "I can help you search for apartments in New York within your budget. Would you like to specify any preferred neighborhoods or amenities?",
    "Based on your job profile as a software engineer, I've found 25 potential opportunities in the Bay Area. Would you like me to share more details?",
    "Your visa eligibility for the US looks promising! As a citizen from your country, you'll need these specific documents for your visa application. I can help you prepare them.",
    "I've analyzed the cost of living in San Francisco. For your lifestyle, expect to spend around $4,000 monthly. Would you like a detailed breakdown?",
    "I can connect you with local services like internet providers, healthcare options, and banking in New York. Which would you like to explore first?"
  ],
  australia: [
    "I can help you search for apartments in Sydney within your budget. Would you like to specify any preferred neighborhoods or amenities?",
    "Based on your job profile as a software engineer, I've found 18 potential opportunities in Melbourne. Would you like me to share more details?",
    "Your visa eligibility for Australia looks promising! As a citizen from your country, you'll need these specific documents for your visa application. I can help you prepare them.",
    "I've analyzed the cost of living in Sydney. For your lifestyle, expect to spend around A$3,500 monthly. Would you like a detailed breakdown?",
    "I can connect you with local services like internet providers, healthcare options, and banking in Australia. Which would you like to explore first?"
  ]
};
