export type KpiMetric = {
  label: string;
  value: string;
  detail: string;
  tone: 'neutral' | 'positive' | 'warning';
};

export type CostTrendPoint = {
  date: string;
  cost: number;
};

export type ServiceCost = {
  name: 'EC2' | 'EBS' | 'S3' | 'Data Transfer' | 'Elastic IP';
  cost: number;
};

export type OptimizationRecommendation = {
  id: string;
  resource: string;
  service: string;
  recommendation: string;
  estimatedSavings: number;
  priority: 'High' | 'Medium' | 'Low';
};

export type FinOpsDashboardData = {
  kpis: KpiMetric[];
  costTrend: CostTrendPoint[];
  serviceCosts: ServiceCost[];
  recommendations: OptimizationRecommendation[];
};
