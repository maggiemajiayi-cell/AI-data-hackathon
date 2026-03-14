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
        {dailyChecks.map((item) => (
          <div
            key={item.day}
            className={`rounded-2xl px-2 py-4 text-center text-sm font-semibold ${
              item.done
                ? "bg-emerald-100 text-emerald-900"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <div>{item.day}</div>
            <div className="mt-2 text-lg">{item.done ? t.dayOn : t.dayOff}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-4 text-white">
        <p className="text-sm text-white/75">{t.tonightRev}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {vocabulary.map((item) => (
            <span key={item.word} className="rounded-full bg-white/10 px-3 py-2 text-sm">
              {item.word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
