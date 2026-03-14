"use client";

import { useMemo, useState } from "react";

import { AssessmentSection } from "@/components/home/assessment-section";
import { DashboardScreen } from "@/components/home/dashboard-screen";
import { LandingScreen } from "@/components/home/landing-screen";
import { dailyChecks } from "@/data/daily-checks";
import { translations } from "@/data/translations";
import { wordMaps } from "@/data/word-maps";
import { getConversationVocabularyFromWordMaps } from "@/lib/conversation";
import type { Language, Role } from "@/types/app";

export default function Home() {
  const [screen, setScreen] = useState<"landing" | "assessment" | "dashboard">(
    "landing",
  );
  const [lang, setLang] = useState<Language>("EN");
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [role, setRole] = useState<Role>("Manager");
  const [typedMessage, setTypedMessage] = useState("");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);

  const t = translations[lang];
  const assessmentComplete = assessmentStep >= t.assessments.length;
  const activeQuestion = t.assessments[Math.min(assessmentStep, t.assessments.length - 1)];
  const conversationVocabulary = useMemo(
    () => getConversationVocabularyFromWordMaps(role, wordMaps),
    [role],
  );
  const currentQuiz = t.quizContent[quizIndex];

  const nextAssessmentStep = () => {
    if (assessmentComplete) {
      setScreen("dashboard");
      return;
    }

    if (!assessmentStarted) {
      setAssessmentStarted(true);
      return;
    }

    if (!assessmentComplete) {
      setAssessmentStep((current) => current + 1);
    }
  };

  const resetAssessment = () => {
    setAssessmentStarted(false);
    setAssessmentStep(0);
  };

  const nextQuiz = () => {
    setQuizAnswer(null);
    setQuizIndex((current) => (current + 1) % t.quizContent.length);
  };

  return (
    <main className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fff5df,0%,#f9efe1,35%,#f4ead9,55%,#efe3ce,100%)] text-slate-900">
      {screen === "landing" && (
        <LandingScreen
          lang={lang}
          t={t}
          onToggleLanguage={() => setLang((current) => (current === "EN" ? "RO" : "EN"))}
          onStartAssessment={() => setScreen("assessment")}
        />
      )}

      {screen === "assessment" && (
        <section className="mx-auto flex h-screen w-full max-w-7xl items-center px-4 py-4 sm:px-6">
          <AssessmentSection
            t={t}
            assessmentStarted={assessmentStarted}
            assessmentComplete={assessmentComplete}
            assessmentStep={assessmentStep}
            activeQuestion={activeQuestion}
            onNextStep={nextAssessmentStep}
            onReset={resetAssessment}
            fullScreen
          />
        </section>
      )}

      {screen === "dashboard" && (
        <DashboardScreen
          lang={lang}
          t={t}
          role={role}
          typedMessage={typedMessage}
          quizAnswer={quizAnswer}
          currentQuiz={currentQuiz}
          vocabulary={conversationVocabulary}
          dailyChecks={dailyChecks}
          onToggleLanguage={() => setLang((current) => (current === "EN" ? "RO" : "EN"))}
          onRoleChange={setRole}
          onTypedMessageChange={setTypedMessage}
          onQuizAnswer={setQuizAnswer}
          onNextQuiz={nextQuiz}
        />
      )}
    </main>
  );
}
