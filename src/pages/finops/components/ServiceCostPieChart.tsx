import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { ServiceCost } from '../types/finops';

type ServiceCostPieChartProps = {
  data: ServiceCost[];
};

const colors = ['#2563eb', '#0f766e', '#f59e0b', '#7c3aed', '#ef4444'];

export function ServiceCostPieChart({ data }: ServiceCostPieChartProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-950">Service Cost</h2>
        <p className="mt-1 text-sm text-slate-500">Monthly spend by AWS service</p>
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="cost" nameKey="name" innerRadius={56} outerRadius={94} paddingAngle={3}>
                {data.map((service, index) => (
                  <Cell key={service.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center gap-3">
          {data.map((service, index) => (
            <div className="flex items-center justify-between gap-3 text-sm" key={service.name}>
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="truncate text-slate-600">{service.name}</span>
              </div>
              <span className="font-medium text-slate-950">${service.cost.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
