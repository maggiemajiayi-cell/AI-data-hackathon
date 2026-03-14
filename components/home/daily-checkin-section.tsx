import type { ConversationVocabularyItem, DailyCheck, TranslationContent } from "@/types/app";

interface DailyCheckInSectionProps {
  t: TranslationContent;
  dailyChecks: DailyCheck[];
  vocabulary: ConversationVocabularyItem[];
}

export function DailyCheckInSection({
  t,
  dailyChecks,
  vocabulary,
}: DailyCheckInSectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
        {t.sec5Tag}
      </p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t.sec5Title}</h2>

      <div className="mt-6 grid grid-cols-7 gap-2">
        {dailyChecks.map((item) => {
          const isSunday = item.day === "Sun";
          return (
            <div
              key={item.day}
              className={`flex flex-col items-center rounded-2xl p-2 transition-all ${isSunday
                  ? "bg-emerald-600 text-white shadow-lg ring-4 ring-emerald-100 scale-105"
                  : item.done
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-slate-50 text-slate-400 border border-slate-100"
                }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isSunday ? "text-emerald-100" : "text-slate-500"}`}>
                {item.day}
              </span>
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full">
                {item.done ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold opacity-40">{t.dayOff}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-slate-900 p-5 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{t.tonightRev}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {vocabulary.map((item) => (
            <span key={item.word} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              {item.word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
