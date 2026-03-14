import type { ConversationVocabularyItem, Language, TranslationContent } from "@/types/app";

interface VocabularySectionProps {
  t: TranslationContent;
  lang: Language;
  vocabulary: ConversationVocabularyItem[];
}

export function VocabularySection({
  t,
  lang,
  vocabulary,
}: VocabularySectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
        {t.sec4Tag}
      </p>
      <h2 className="mt-2 text-3xl font-bold">{t.sec4Title}</h2>
      <div className="mt-5 grid gap-3">
        {vocabulary.map((item) => (
          <div
            key={item.word}
            className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xl font-bold">{item.word}</p>
                <p className="text-sm text-slate-600">
                  {lang === "EN" ? item.meaning : item.rohingya}
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
                {lang === "EN" ? item.rohingya : item.meaning}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
