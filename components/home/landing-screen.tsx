import { Sprout, RefreshCw } from "lucide-react";
import type { Language, TranslationContent } from "@/types/app";

interface LandingScreenProps {
  lang: Language;
  t: TranslationContent;
  onToggleLanguage: () => void;
  onStartAssessment: () => void;
}

export function LandingScreen({
  lang,
  t,
  onToggleLanguage,
  onStartAssessment,
}: LandingScreenProps) {
  return (
    <section className="relative flex min-h-[100dvh] items-start justify-center overflow-y-auto px-4 pt-20 pb-6 sm:h-screen sm:items-center sm:overflow-hidden sm:px-6 sm:py-6">
      <div className="w-full max-w-5xl rounded-[2rem] border border-white/60 bg-white/75 p-5 shadow-[0_24px_80px_rgba(111,78,55,0.16)] backdrop-blur sm:p-8 lg:p-12">
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
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
              <h1 className="max-w-3xl flex items-center gap-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                <div className="relative flex shrink-0 items-center justify-center rounded-full bg-emerald-50 p-4 sm:p-5 text-emerald-600 shadow-lg">
                  <div className="absolute inset-0 rounded-full border-[3px] border-emerald-200 border-t-emerald-500 border-r-emerald-500 animate-[spin_8s_linear_infinite]" />
                  <Sprout className="relative z-10 h-10 w-10 sm:h-12 sm:w-12 transition-transform duration-700 hover:scale-110" />
                </div>
                {t.title}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-700 sm:text-lg sm:leading-7">
                {t.desc}
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onToggleLanguage}
                  className="group flex items-center gap-3 rounded-full border-2 border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-emerald-900 shadow-sm transition hover:bg-emerald-50 hover:border-emerald-300"
                >
                  <RefreshCw className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                  {lang === "EN"
                    ? "Translate to Rohingya (RO)"
                    : "Translate to English (EN)"}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.34)] sm:p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
              {t.sec1Tag}
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{t.sec1Title}</h2>
            <p className="mt-4 text-sm leading-6 text-white/75">
              {t.tapDesc}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 sm:hidden">
              {[t.flow1, t.flow2, t.flow3].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 hidden space-y-3 sm:block">
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

            <button
              type="button"
              onClick={onStartAssessment}
              className="mt-5 w-full rounded-full bg-amber-400 px-5 py-4 text-base font-semibold text-slate-950 transition hover:bg-amber-300 sm:mt-6"
            >
              {t.btnStart}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
