import { MetricCard } from "@/components/ui/metric-card";
import type { TranslationContent } from "@/types/app";

interface GoalTrackingSectionProps {
  t: TranslationContent;
}

export function GoalTrackingSection({ t }: GoalTrackingSectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
        {t.sec8Tag}
      </p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t.sec8Title}</h2>
      <div className="mt-5 space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm font-medium text-slate-700">
            <span>{t.dailyGoal}</span>
            <span>8 / 10 minutes</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-slate-100">
            <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <MetricCard label={t.curStreak} value="6" helper={t.daysRow} />
          <MetricCard label={t.weekGoal} value="4/5" helper={t.sessDone} />
          <MetricCard label={t.confLevel} value="82%" helper={t.speakComf} />
        </div>
      </div>
    </section>
  );
}
