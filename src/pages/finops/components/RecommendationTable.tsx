import type { OptimizationRecommendation } from '../types/finops';

type RecommendationTableProps = {
  recommendations: OptimizationRecommendation[];
};

const priorityClasses: Record<OptimizationRecommendation['priority'], string> = {
  High: 'bg-red-50 text-red-700 ring-red-200',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  Low: 'bg-slate-100 text-slate-700 ring-slate-200',
};

export function RecommendationTable({ recommendations }: RecommendationTableProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-950">Optimization Recommendations</h2>
        <p className="mt-1 text-sm text-slate-500">Mock recommendations ranked by estimated savings</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
              <th className="py-3 pr-4 font-semibold">Resource</th>
              <th className="px-4 py-3 font-semibold">Service</th>
              <th className="px-4 py-3 font-semibold">Recommendation</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="py-3 pl-4 text-right font-semibold">Monthly Savings</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((item) => (
              <tr className="border-b border-slate-100 last:border-0" key={item.id}>
                <td className="py-4 pr-4 font-medium text-slate-950">{item.resource}</td>
                <td className="px-4 py-4 text-slate-600">{item.service}</td>
                <td className="px-4 py-4 text-slate-600">{item.recommendation}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${priorityClasses[item.priority]}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="py-4 pl-4 text-right font-semibold text-emerald-700">
                  ${item.estimatedSavings.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
