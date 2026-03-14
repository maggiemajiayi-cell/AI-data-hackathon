import type { TranslationContent } from "@/types/app";

interface ResponseAnalysisSectionProps {
  t: TranslationContent;
}

export function ResponseAnalysisSection({ t }: ResponseAnalysisSectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6 h-full flex flex-col">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
        {t.sec7Tag}
      </p>
      <h2 className="mt-2 text-3xl font-bold">{t.sec7Title}</h2>

      <div className="mt-5 flex-1 rounded-[1.5rem] bg-gradient-to-br from-emerald-50 to-teal-100 p-5 text-slate-950 flex flex-col gap-4 overflow-y-auto">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">{t.analysisStrengths}</p>
          <ul className="mt-2 list-disc pl-5 text-sm leading-6 text-slate-700">
            <li>{t.analysisStr1}</li>
            <li>{t.analysisStr2}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">{t.analysisTips}</p>
          <ul className="mt-2 list-disc pl-5 text-sm leading-6 text-slate-700">
            <li>{t.analysisTip1}</li>
            <li>{t.analysisTip2}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">{t.analysisVocab}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-block bg-white text-emerald-900 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm border border-emerald-100">{t.analysisVocab1}</span>
            <span className="inline-block bg-white text-emerald-900 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm border border-emerald-100">{t.analysisVocab2}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
