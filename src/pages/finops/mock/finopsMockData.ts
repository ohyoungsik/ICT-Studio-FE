import type { FinOpsDashboardData } from '../types/finops';

export const finopsMockData: FinOpsDashboardData = {
  kpis: [
    {
      label: 'Current Monthly Cost',
      value: '$18,420',
      detail: 'Month-to-date AWS spend',
      tone: 'neutral',
    },
    {
      label: 'Estimated Monthly Cost',
      value: '$24,860',
      detail: 'Projected by current run rate',
      tone: 'warning',
    },
    {
      label: 'Potential Savings',
      value: '$4,730',
      detail: 'Estimated monthly optimization',
      tone: 'positive',
    },
  ],
  costTrend: [
    { date: 'Jun 01', cost: 610 },
    { date: 'Jun 02', cost: 640 },
    { date: 'Jun 03', cost: 590 },
    { date: 'Jun 04', cost: 720 },
    { date: 'Jun 05', cost: 760 },
    { date: 'Jun 06', cost: 810 },
    { date: 'Jun 07', cost: 780 },
    { date: 'Jun 08', cost: 850 },
    { date: 'Jun 09', cost: 900 },
    { date: 'Jun 10', cost: 940 },
    { date: 'Jun 11', cost: 910 },
    { date: 'Jun 12', cost: 980 },
  ],
  serviceCosts: [
    { name: 'EC2', cost: 9450 },
    { name: 'EBS', cost: 2860 },
    { name: 'S3', cost: 2140 },
    { name: 'Data Transfer', cost: 1640 },
    { name: 'Elastic IP', cost: 390 },
  ],
  recommendations: [
    {
      id: 'rec-001',
      resource: 'i-0f24c8a-prod-worker',
      service: 'EC2',
      recommendation: 'Right-size instance from m6i.2xlarge to m6i.xlarge',
      estimatedSavings: 1280,
      priority: 'High',
    },
    {
      id: 'rec-002',
      resource: 'vol-082f31b-analytics',
      service: 'EBS',
      recommendation: 'Delete unattached gp3 volume after snapshot validation',
      estimatedSavings: 740,
      priority: 'High',
    },
    {
      id: 'rec-003',
      resource: 'backup-archive-east',
      service: 'S3',
      recommendation: 'Move infrequently accessed objects to Glacier Instant Retrieval',
      estimatedSavings: 560,
      priority: 'Medium',
    },
    {
      id: 'rec-004',
      resource: 'eipalloc-0452ab',
      service: 'Elastic IP',
      recommendation: 'Release idle Elastic IP with no active association',
      estimatedSavings: 120,
      priority: 'Medium',
    },
  ],
};
