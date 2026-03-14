import type { TranslationContent } from "@/types/app";

interface ResponseAnalysisSectionProps {
  t: TranslationContent;
  hasSubmitted?: boolean;
}

export function ResponseAnalysisSection({
  t,
  hasSubmitted = false,
}: ResponseAnalysisSectionProps) {
  return (
    <section className="flex h-full flex-col rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
        {t.sec7Tag}
      </p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t.sec7Title}</h2>

      <div className="mt-5 flex flex-1 flex-col gap-4 overflow-y-auto rounded-[1.5rem] bg-gradient-to-br from-emerald-50 to-teal-100 p-4 text-slate-950 sm:p-5">
        {hasSubmitted ? (
          <>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 sm:text-sm sm:tracking-[0.2em]">
                {t.analysisStrengths}
              </p>
              <ul className="mt-2 list-disc pl-5 text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
                <li>{t.analysisStr1}</li>
                <li>{t.analysisStr2}</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 sm:text-sm sm:tracking-[0.2em]">
                {t.analysisTips}
              </p>
              <ul className="mt-2 list-disc pl-5 text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
                <li>{t.analysisTip1}</li>
                <li>{t.analysisTip2}</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 sm:text-sm sm:tracking-[0.2em]">
                {t.analysisVocab}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-block rounded-lg border border-emerald-100 bg-white px-3 py-1.5 text-xs font-medium text-emerald-900 shadow-sm">
                  {t.analysisVocab1}
                </span>
                <span className="inline-block rounded-lg border border-emerald-100 bg-white px-3 py-1.5 text-xs font-medium text-emerald-900 shadow-sm">
                  {t.analysisVocab2}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-emerald-800/60">
            <p className="text-sm leading-6">
              Speak or type a response in the practice section, then press Submit
              to see your AI response analysis here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
