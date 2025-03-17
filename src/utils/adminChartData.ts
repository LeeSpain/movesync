
// Chart data for the admin dashboard
export const getRevenueData = () => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [18500, 21000, 22500, 24000, 25200, 26500],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    },
  ],
});

export const getSubscriptionData = () => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Free Users',
      data: [720, 780, 820, 850, 880, 861],
      backgroundColor: 'rgb(148, 163, 184)',
    },
    {
      label: 'Premium Users',
      data: [180, 210, 240, 270, 310, 384],
      backgroundColor: 'rgb(59, 130, 246)',
    },
  ],
});

export const getCostBreakdownData = () => ({
  labels: ['Customer Support', 'Technology', 'Marketing', 'Personnel', 'Operations', 'Other'],
  datasets: [
    {
      data: [15, 28, 22, 25, 8, 2],
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

export const getGrowthMetricsData = () => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'User Growth (%)',
      data: [5.2, 6.8, 7.4, 7.9, 8.1, 8.4],
      borderColor: 'rgb(52, 211, 153)',
      backgroundColor: 'rgba(52, 211, 153, 0.1)',
      fill: true,
    },
    {
      label: 'Revenue Growth (%)',
      data: [6.5, 7.8, 8.2, 8.9, 9.4, 9.8],
      borderColor: 'rgb(248, 113, 113)',
      backgroundColor: 'rgba(248, 113, 113, 0.1)',
      fill: true,
    },
  ],
});
