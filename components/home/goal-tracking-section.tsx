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

        {/* AI Generated Study Plan Section */}
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-emerald-200 bg-gradient-to-br from-white to-emerald-50 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">AI Personal Coach</p>
              <h3 className="text-lg font-black text-slate-900">Your Study Plan</h3>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-3 border border-emerald-100/50">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <span className="text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Master "Workplace Delays"</p>
                <p className="mt-1 text-xs text-slate-600">Review the word <span className="font-semibold text-emerald-700">delayed</span> and practice the <span className="font-semibold">Manager</span> role for 5 more minutes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-3 border border-emerald-100/50">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <span className="text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Refine Pronunciation</p>
                <p className="mt-1 text-xs text-slate-600">Focus on the word <span className="font-semibold text-emerald-700">appointment</span> in casual role-plays.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-3 border border-emerald-100/50">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <span className="text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Weekly Goal Push</p>
                <p className="mt-1 text-xs text-slate-600">You are 80% there! Complete <span className="font-semibold text-emerald-700">one more session</span> tomorrow to hit your weekly target.</p>
              </div>
            </div>
          </div>

          <button className="mt-5 w-full rounded-2xl bg-slate-900 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95">
            Update My Plan
          </button>
        </div>
      </div>
    </section>
  );
}
