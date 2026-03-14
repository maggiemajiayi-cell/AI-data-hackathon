interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
}

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-4 shadow-sm">
      <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-slate-600 sm:text-sm">{helper}</p>
    </div>
  );
}
