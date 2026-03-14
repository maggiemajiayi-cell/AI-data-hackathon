import type { QuizChoice, TranslationContent } from "@/types/app";

interface QuizSectionProps {
  t: TranslationContent;
  currentQuiz: QuizChoice;
  quizAnswer: string | null;
  onAnswer: (answer: string) => void;
  onNext: () => void;
}

export function QuizSection({
  t,
  currentQuiz,
  quizAnswer,
  onAnswer,
  onNext,
}: QuizSectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
        {t.sec6Tag}
      </p>
      <h2 className="mt-2 text-3xl font-bold">{t.sec6Title}</h2>

      <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-5 text-white">
        <p className="text-lg font-semibold">{currentQuiz.prompt}</p>
        <div className="mt-4 grid gap-3">
          {currentQuiz.options.map((option) => {
            const selected = quizAnswer === option;
            const correct = quizAnswer !== null && option === currentQuiz.answer;
            const wrong = selected && option !== currentQuiz.answer;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onAnswer(option)}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  correct
                    ? "bg-emerald-400 text-slate-950"
                    : wrong
                      ? "bg-rose-400 text-white"
                      : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            {t.nextCard}
          </button>
          <p className="text-sm text-white/75">
            {quizAnswer
              ? quizAnswer === currentQuiz.answer
                ? t.quizCorrectText
                : t.quizWrongText(currentQuiz.answer)
              : t.quizPromptText}
          </p>
        </div>
      </div>
    </section>
  );
}
