import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { CostTrendPoint } from '../types/finops';

type CostTrendChartProps = {
  data: CostTrendPoint[];
};

export function CostTrendChart({ data }: CostTrendChartProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-950">Cost Trend</h2>
        <p className="mt-1 text-sm text-slate-500">Daily AWS cost movement for the current month</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              tickLine={false}
              width={56}
            />
            <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: '#2563eb', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
