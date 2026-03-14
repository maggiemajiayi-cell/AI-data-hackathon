import type { ConversationVocabularyItem, Language, TranslationContent } from "@/types/app";

interface VocabularySectionProps {
  t: TranslationContent;
  lang: Language;
  vocabulary: ConversationVocabularyItem[];
  hasSubmitted?: boolean;
}

export function VocabularySection({
  t,
  lang,
  vocabulary,
  hasSubmitted = true,
}: VocabularySectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6 lg:h-full lg:overflow-auto">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 sm:text-sm sm:tracking-[0.3em]">
        {t.sec4Tag}
      </p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t.sec4Title}</h2>

      {!hasSubmitted ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Fresh vocabulary from your conversation will appear here once you press Submit.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          {vocabulary.map((item) => (
            <div
              key={item.word}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={`/vocab/${item.word}.png`}
                  alt={item.word}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x200?text=' + item.word;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-amber-900 backdrop-blur-sm shadow-sm">
                  {lang === "EN" ? item.rohingya : item.meaning}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xl font-black tracking-tight text-slate-900">{item.word}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
                  {lang === "EN" ? item.meaning : item.rohingya}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
