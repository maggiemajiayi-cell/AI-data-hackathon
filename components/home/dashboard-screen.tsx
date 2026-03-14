"use client";

import { useState } from "react";

import { DailyCheckInSection } from "@/components/home/daily-checkin-section";
import { GoalTrackingSection } from "@/components/home/goal-tracking-section";
import { QuizSection } from "@/components/home/quiz-section";
import { ScenarioPracticeSection } from "@/components/home/scenario-practice-section";
import { VocabularySection } from "@/components/home/vocabulary-section";
import { VoiceOutputSection } from "@/components/home/voice-output-section";
import type {
  ConversationVocabularyItem,
  DailyCheck,
  Language,
  QuizChoice,
  Role,
  TranslationContent,
} from "@/types/app";

type DashboardTab = "practice" | "review" | "quiz" | "goals";

interface DashboardScreenProps {
  lang: Language;
  t: TranslationContent;
  role: Role;
  typedMessage: string;
  quizAnswer: string | null;
  currentQuiz: QuizChoice;
  vocabulary: ConversationVocabularyItem[];
  dailyChecks: DailyCheck[];
  onToggleLanguage: () => void;
  onRoleChange: (role: Role) => void;
  onTypedMessageChange: (value: string) => void;
  onQuizAnswer: (answer: string) => void;
  onNextQuiz: () => void;
}

export function DashboardScreen({
  lang,
  t,
  role,
  typedMessage,
  quizAnswer,
  currentQuiz,
  vocabulary,
  dailyChecks,
  onToggleLanguage,
  onRoleChange,
  onTypedMessageChange,
  onQuizAnswer,
  onNextQuiz,
}: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("practice");

  return (
    <section className="flex h-[100dvh] overflow-y-auto px-3 py-3 lg:overflow-hidden sm:px-4 sm:py-4">
      <div className="mx-auto grid h-auto min-h-full w-full max-w-7xl gap-4 lg:h-full lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="flex flex-col rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-[0_24px_80px_rgba(111,78,55,0.16)] backdrop-blur sm:p-5 lg:min-h-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 sm:text-sm sm:tracking-[0.3em]">
                SpeakEasy Journey
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {t.path}
              </h1>
            </div>
            <button
              type="button"
              onClick={onToggleLanguage}
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
            >
              {lang === "EN" ? "RO" : "EN"}
            </button>
          </div>

          <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3">
            <div className="rounded-2xl bg-amber-50 px-3 py-3 sm:px-4">
              <p className="text-xs text-slate-500 sm:text-sm">{t.estLevel}</p>
              <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{t.estLevelVal}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-3 sm:px-4">
              <p className="text-xs text-slate-500 sm:text-sm">{t.streak}</p>
              <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{t.streakVal}</p>
            </div>
            <div className="rounded-2xl bg-slate-950 px-3 py-3 text-white sm:px-4">
              <p className="text-xs text-white/60 sm:text-sm">{t.focus}</p>
              <p className="mt-1 text-xl font-bold sm:text-2xl">{t.focusVal}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 lg:grid-cols-1">
            <TabButton
              active={activeTab === "practice"}
              label={t.flow2}
              onClick={() => setActiveTab("practice")}
            />
            <TabButton
              active={activeTab === "review"}
              label={t.flow4}
              onClick={() => setActiveTab("review")}
            />
            <TabButton
              active={activeTab === "quiz"}
              label={t.flow5}
              onClick={() => setActiveTab("quiz")}
            />
            <TabButton
              active={activeTab === "goals"}
              label={t.sec8Tag}
              onClick={() => setActiveTab("goals")}
            />
          </div>

          <div className="mt-4 rounded-[1.5rem] bg-gradient-to-r from-amber-300 to-orange-300 p-4 text-slate-950 lg:mt-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.25em]">
              {t.elTitle}
            </p>
            <p className="mt-2 text-xs leading-5 sm:text-sm sm:leading-6">{t.elDesc}</p>
          </div>
        </aside>

        <div className="rounded-[2rem] border border-white/60 bg-white/80 p-3 shadow-[0_24px_80px_rgba(111,78,55,0.16)] backdrop-blur sm:p-4 lg:min-h-0">
          <div className="rounded-[1.5rem] bg-[#fcfaf4] p-1 lg:h-full lg:overflow-hidden">
            {activeTab === "practice" && (
              <div className="grid gap-3 lg:h-full xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                  <ScenarioPracticeSection
                    t={t}
                    role={role}
                    typedMessage={typedMessage}
                    onRoleChange={onRoleChange}
                    onTypedMessageChange={onTypedMessageChange}
                  />
                </div>
                <div className="grid gap-3 xl:grid-rows-[1fr_0.9fr] lg:min-h-0">
                  <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                    <VocabularySection t={t} lang={lang} vocabulary={vocabulary} />
                  </div>
                  <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                    <VoiceOutputSection t={t} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "review" && (
              <div className="grid gap-3 lg:h-full xl:grid-cols-[1fr_1fr]">
                <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                  <DailyCheckInSection
                    t={t}
                    dailyChecks={dailyChecks}
                    vocabulary={vocabulary}
                  />
                </div>
                <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                  <VocabularySection t={t} lang={lang} vocabulary={vocabulary} />
                </div>
              </div>
            )}

            {activeTab === "quiz" && (
              <div className="grid gap-3 lg:h-full xl:grid-cols-[1fr_0.95fr]">
                <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                  <QuizSection
                    t={t}
                    currentQuiz={currentQuiz}
                    quizAnswer={quizAnswer}
                    onAnswer={onQuizAnswer}
                    onNext={onNextQuiz}
                  />
                </div>
                <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                  <DailyCheckInSection
                    t={t}
                    dailyChecks={dailyChecks}
                    vocabulary={vocabulary}
                  />
                </div>
              </div>
            )}

            {activeTab === "goals" && (
              <div className="grid gap-3 lg:h-full xl:grid-cols-[1fr_1fr]">
                <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                  <GoalTrackingSection t={t} />
                </div>
                <div className="rounded-[1.5rem] lg:min-h-0 lg:overflow-auto">
                  <DailyCheckInSection
                    t={t}
                    dailyChecks={dailyChecks}
                    vocabulary={vocabulary}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-3 py-3 text-left text-xs font-semibold transition sm:px-4 sm:text-sm ${
        active
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}
