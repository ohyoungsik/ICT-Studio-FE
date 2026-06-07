import type { KpiMetric } from '../types/finops';

type KpiCardProps = {
  metric: KpiMetric;
};

const toneClasses: Record<KpiMetric['tone'], string> = {
  neutral: 'border-slate-200 bg-white',
  positive: 'border-emerald-200 bg-emerald-50',
  warning: 'border-amber-200 bg-amber-50',
};

export function KpiCard({ metric }: KpiCardProps) {
  return (
    <section className={`rounded-lg border p-5 shadow-sm ${toneClasses[metric.tone]}`}>
      <p className="text-sm font-medium text-slate-600">{metric.label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">{metric.value}</p>
      <p className="mt-2 text-sm text-slate-500">{metric.detail}</p>
    </section>
  );
}
