import type { TranslationContent } from "@/types/app";

interface VoiceOutputSectionProps {
  t: TranslationContent;
}

export function VoiceOutputSection({ t }: VoiceOutputSectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
        {t.sec7Tag}
      </p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t.sec7Title}</h2>

      <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-orange-500 to-amber-300 p-5 text-slate-950">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">{t.btnDemo}</p>
        <p className="mt-3 text-sm leading-6">{t.btnDemoDesc}</p>
        <button
          type="button"
          className="mt-5 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          {t.playAudio}
        </button>
      </div>
    </section>
  );
}
