import { roleOptions } from "@/data/role-options";
import type { Role, TranslationContent } from "@/types/app";

interface ScenarioPracticeSectionProps {
  t: TranslationContent;
  role: Role;
  typedMessage: string;
  onRoleChange: (role: Role) => void;
  onTypedMessageChange: (value: string) => void;
}

export function ScenarioPracticeSection({
  t,
  role,
  typedMessage,
  onRoleChange,
  onTypedMessageChange,
}: ScenarioPracticeSectionProps) {
  const scenario = t.scenario[role];

  return (
    <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            {t.sec2Tag}
          </p>
          <h2 className="mt-2 text-3xl font-bold">{t.sec2Title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onRoleChange(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                role === option
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[1.5rem] bg-amber-50 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
            {t.convSetup}
          </p>
          <h3 className="mt-4 text-2xl font-bold">{scenario.label}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">{scenario.opening}</p>
          <div className="mt-4 rounded-2xl bg-white/80 p-4 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-900">{t.aiCoachStyle}</p>
            <p className="mt-2">{scenario.style}</p>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-white/85">
            <p className="font-semibold text-amber-300">{t.helperLang}</p>
            <p className="mt-2">{scenario.helper}</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            {t.typePaste}
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-3xl rounded-bl-md bg-slate-100 p-4 text-sm leading-6 text-slate-700">
              {scenario.opening}
            </div>
            <textarea
              value={typedMessage}
              onChange={(event) => onTypedMessageChange(event.target.value)}
              className="min-h-32 w-full rounded-3xl rounded-br-md border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400"
              placeholder={t.placeholderType}
            />
            <div className="rounded-3xl rounded-bl-md bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
              <p className="font-semibold">{t.aiResponse}</p>
              <p className="mt-2">{scenario.aiReply}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
