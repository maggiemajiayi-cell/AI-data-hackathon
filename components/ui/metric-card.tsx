interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
}

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{helper}</p>
    </div>
  );
}
