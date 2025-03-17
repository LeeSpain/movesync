
export const getAcquisitionChannelsData = () => ({
  labels: ['Organic Search', 'Direct', 'Referral', 'Social Media', 'Email', 'Paid Ads'],
  datasets: [
    {
      label: 'User Acquisition by Channel',
      data: [32, 24, 18, 14, 8, 4],
      backgroundColor: [
        'rgb(59, 130, 246)',
        'rgb(139, 92, 246)',
        'rgb(248, 113, 113)',
        'rgb(52, 211, 153)',
        'rgb(251, 191, 36)',
        'rgb(209, 213, 219)',
      ],
    },
  ],
});

export const getConversionFunnelData = () => ({
  labels: ['Visitors', 'Sign-ups', 'Activation', 'Premium Trial', 'Paid Users'],
  datasets: [
    {
      label: 'Conversion Funnel',
      data: [10000, 2500, 1800, 750, 384],
      backgroundColor: 'rgb(59, 130, 246)',
    },
  ],
});

export const getRetentionData = () => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Retention Rate',
      data: [92, 91, 93, 94, 95, 96],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    },
  ],
});
