import './styles.css';
import { CostTrendChart } from './components/CostTrendChart';
import { KpiCard } from './components/KpiCard';
import { RecommendationTable } from './components/RecommendationTable';
import { ServiceCostPieChart } from './components/ServiceCostPieChart';
import { useFinopsDashboard } from './hooks/useFinopsDashboard';

function FinOpsDashboard() {
  const { data } = useFinopsDashboard();

  return (
    <main className="finops-dashboard min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-none bg-transparent p-0 text-left shadow-none">
          <p className="text-sm font-semibold uppercase text-blue-700">FinOps Dashboard</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
            AWS Cost Overview
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
            Mock cost data for monthly spend, service distribution, and optimization opportunities.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {data.kpis.map((metric) => (
            <KpiCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <CostTrendChart data={data.costTrend} />
          <ServiceCostPieChart data={data.serviceCosts} />
        </section>

        <RecommendationTable recommendations={data.recommendations} />
      </div>
    </main>
  );
}

export default FinOpsDashboard;
