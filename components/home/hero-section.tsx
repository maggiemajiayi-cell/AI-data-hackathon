import { MetricCard } from "@/components/ui/metric-card";
import type { Language, TranslationContent } from "@/types/app";

interface HeroSectionProps {
  lang: Language;
  onToggleLanguage: () => void;
  t: TranslationContent;
}

export function HeroSection({ lang, onToggleLanguage, t }: HeroSectionProps) {
  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={onToggleLanguage}
          className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-white"
        >
          {lang === "EN"
            ? "Switch to Rohingya Translation"
            : "Switch to English Translation"}
        </button>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_24px_80px_rgba(111,78,55,0.14)] backdrop-blur">
        <div className="grid gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.25fr_0.9fr] lg:px-10 lg:py-10">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <span className="rounded-full bg-amber-200 px-4 py-2 text-amber-950">
                {t.voiceFirst}
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-slate-700">
                {t.lowLiteracy}
              </span>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-900">
                {t.support}
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                SpeakEasy Journey
              </p>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                {t.desc}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard label={t.estLevel} value={t.estLevelVal} helper={t.estLevelHelp} />
              <MetricCard label={t.streak} value={t.streakVal} helper={t.streakHelp} />
              <MetricCard label={t.focus} value={t.focusVal} helper={t.focusHelp} />
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.34)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                  {t.demoFlow}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{t.path}</h2>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 text-sm">12 min</div>
            </div>

            <div className="mt-6 space-y-3">
              {[t.flow1, t.flow2, t.flow3, t.flow4, t.flow5].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300 font-bold text-slate-950">
                    {index + 1}
                  </div>
                  <p className="text-sm text-white/90">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-300 p-4 text-slate-950">
              <p className="text-sm font-semibold uppercase tracking-[0.25em]">
                {t.elTitle}
              </p>
              <p className="mt-2 text-sm leading-6">{t.elDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
