
import { useState } from "react";
import type { AssessmentQuestion, TranslationContent } from "@/types/app";
import { translations } from "@/data/translations";

interface AssessmentSectionProps {
  t: TranslationContent;
  assessmentStarted: boolean;
  assessmentComplete: boolean;
  assessmentStep: number;
  activeQuestion: AssessmentQuestion;
  onNextStep: () => void;
  onReset: () => void;
  fullScreen?: boolean;
}

export function AssessmentSection({
  t,
  assessmentStarted,
  assessmentComplete,
  assessmentStep,
  activeQuestion,
  onNextStep,
  onReset,
  fullScreen = false,
}: AssessmentSectionProps) {
  const [localRohingyaToggle, setLocalRohingyaToggle] = useState(false);

  // Derive the question to display based on the local toggle
  const displayQuestion = localRohingyaToggle
    ? translations["RO"].assessments[Math.min(assessmentStep, translations["RO"].assessments.length - 1)]
    : activeQuestion;

  return (
    <div
      className={`rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6 ${fullScreen ? "h-full" : ""
        }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            {t.sec1Tag}
          </p>
          <h2 className="mt-2 text-3xl font-bold">{t.sec1Title}</h2>
        </div>
        <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900">
          {assessmentComplete
            ? t.assessmentComplete
            : t.questionFlow(
              Math.min(assessmentStep + 1, t.assessments.length),
              t.assessments.length,
            )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
            {t.leftSide}
          </p>
          {!assessmentStarted ? (
            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-bold">{t.tapBegin}</h3>
              <p className="text-sm leading-6 text-white/75">{t.tapDesc}</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                {displayQuestion.level}
              </div>
              <h3 className="text-2xl font-bold leading-tight">
                {assessmentComplete ? t.readyJourney : displayQuestion.prompt}
              </h3>
              <p className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-white/75">
                {assessmentComplete
                  ? t.estLevelFull
                  : t.promptHint(displayQuestion.hint)}
              </p>

              {!assessmentComplete && (
                <button
                  type="button"
                  onClick={() => setLocalRohingyaToggle(!localRohingyaToggle)}
                  className="mt-2 text-sm text-amber-300 underline hover:text-amber-400 transition"
                >
                  {localRohingyaToggle
                    ? "Translate back to English"
                    : "Can't understand? Tap to translate language into Rohingya"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-amber-50/80 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
            {t.rightSide}
          </p>
          <div className="mt-6 rounded-[1.5rem] bg-white p-5 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                {t.micActive}
              </span>
              <span className="text-sm text-slate-500">{t.mockStt}</span>
            </div>
            <p className="mt-5 min-h-28 text-lg leading-8 text-slate-800">
              {!assessmentStarted
                ? t.pressStart
                : assessmentComplete
                  ? t.strongAreas
                  : activeQuestion.reply}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onNextStep}
              className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              {!assessmentStarted
                ? t.btnStart
                : assessmentComplete
                  ? t.btnJourney
                  : t.btnNext}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {t.btnReset}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
