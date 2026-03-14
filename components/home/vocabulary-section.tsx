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
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t.sec4Title}</h2>
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
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {lang === "EN" ? item.meaning : item.rohingya}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
