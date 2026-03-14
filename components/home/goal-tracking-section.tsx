import { useState } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import type { TranslationContent } from "@/types/app";

interface GoalTrackingSectionProps {
  t: TranslationContent;
}

export function GoalTrackingSection({ t }: GoalTrackingSectionProps) {
  const [planIndex, setPlanIndex] = useState(0);

  const plans = [
    [
      {
        id: 1,
        title: "Master \"Workplace Delays\"",
        desc: "Review the word delayed and practice the Manager role for 5 more minutes.",
      },
      {
        id: 2,
        title: "Refine Pronunciation",
        desc: "Focus on the word appointment in casual role-plays.",
      },
      {
        id: 3,
        title: "Weekly Goal Push",
        desc: "You are 80% there! Complete one more session tomorrow to hit your weekly target.",
      },
    ],
    [
      {
        id: 1,
        title: "Casual Conversations",
        desc: "Practice using available and schedule with the Friend role.",
      },
      {
        id: 2,
        title: "Professor Protocol",
        desc: "Try a polite opening with the Professor role focusing on being respectful.",
      },
      {
        id: 3,
        title: "Listening Skills",
        desc: "Listen to the AI's pronunciation of shift and repeat it 3 times.",
      },
    ],
  ];

  const currentPlan = plans[planIndex];

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
            {currentPlan.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-2xl bg-white/60 p-3 border border-emerald-100/50 transition-all duration-300 hover:bg-white"
              >
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <span className="text-xs font-bold">{item.id}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
                    {item.desc.split(/(delayed|appointment|available|schedule|Manager|Friend|Professor|shift)/g).map((part, i) => (
                      <span key={i} className={/^(delayed|appointment|available|schedule|Manager|Friend|Professor|shift)$/.test(part) ? "font-semibold text-emerald-700" : ""}>
                        {part}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPlanIndex((prev) => (prev === 0 ? 1 : 0))}
            className="mt-5 w-full rounded-2xl bg-slate-900 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
          >
            Update My Plan
          </button>
        </div>
      </div>
    </section>
  );
}
