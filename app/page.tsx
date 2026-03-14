"use client";

import { useMemo, useState } from "react";

type Role = "Friend" | "Professor" | "Manager" | "Customer";

const assessmentQuestions = [
  {
    level: "Warm-up",
    prompt: "Say your name and where you live now.",
    hint: "My name is ____. I live in ____.",
    mockReply: "My name is Amina. I live in Toronto now.",
  },
  {
    level: "Daily life",
    prompt: "Tell me what you do in the morning.",
    hint: "I wake up, I eat breakfast, I go to work.",
    mockReply: "In the morning I wake up at seven and take the bus.",
  },
  {
    level: "Need help",
    prompt: "Ask for help at a clinic or office.",
    hint: "Excuse me, I need help with ___.",
    mockReply: "Excuse me, I need help with my appointment time.",
  },
  {
    level: "Past experience",
    prompt: "Talk about something you did yesterday.",
    hint: "Yesterday I went to ___.",
    mockReply: "Yesterday I went to English class and talked to my teacher.",
  },
  {
    level: "Future plan",
    prompt: "Say one goal for next week.",
    hint: "Next week I want to ___.",
    mockReply: "Next week I want to practice English with my neighbor.",
  },
];

const scenarioPresets: Record<
  Role,
  {
    label: string;
    style: string;
    opening: string;
    chinese: string;
    aiReply: string;
  }
> = {
  Friend: {
    label: "Casual and warm",
    style: "Short, relaxed sentences with friendly encouragement.",
    opening: "Your friend asks if you want to practice speaking together after dinner.",
    chinese: "你可以用比较轻松、自然的方式回答朋友。",
    aiReply:
      "That sounds great. We can meet after dinner and practice simple English together.",
  },
  Professor: {
    label: "Respectful and clear",
    style: "Polite, complete sentences with formal tone.",
    opening:
      "You need to tell your professor that you may arrive late because of a bus delay.",
    chinese: "跟教授说话时，语气要礼貌、清楚。",
    aiReply:
      "Professor, I may be a few minutes late because my bus is delayed. Thank you for understanding.",
  },
  Manager: {
    label: "Professional and direct",
    style: "Confident, concise, workplace-friendly language.",
    opening: "You want to ask your manager for a different shift next week.",
    chinese: "跟经理沟通时，要直接但礼貌。",
    aiReply:
      "I wanted to ask if it is possible to change my shift next week because of a family appointment.",
  },
  Customer: {
    label: "Helpful and service-focused",
    style: "Friendly support language with clear next steps.",
    opening: "A customer says they cannot find the rice and cooking oil.",
    chinese: "面对顾客时，可以用帮助性的表达。",
    aiReply:
      "I can help you. The rice is in aisle three, and the cooking oil is beside it on the left.",
  },
};

const starterVocabulary = [
  { word: "appointment", meaning: "a planned meeting", chinese: "预约" },
  { word: "delayed", meaning: "running late", chinese: "延误" },
  { word: "shift", meaning: "work time", chinese: "班次" },
  { word: "aisle", meaning: "a row in a store", chinese: "货架通道" },
];

const quizChoices = [
  {
    prompt: "Which word means a planned meeting?",
    answer: "appointment",
    options: ["appointment", "aisle", "neighbor"],
  },
  {
    prompt: "Which word is used for work time?",
    answer: "shift",
    options: ["clinic", "shift", "practice"],
  },
];

const dailyChecks = [
  { day: "Mon", done: true },
  { day: "Tue", done: true },
  { day: "Wed", done: true },
  { day: "Thu", done: false },
  { day: "Fri", done: false },
  { day: "Sat", done: false },
  { day: "Sun", done: false },
];

export default function Home() {
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [role, setRole] = useState<Role>("Manager");
  const [typedMessage, setTypedMessage] = useState("我下周需要换班，因为我要带孩子去看医生。");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);

  const assessmentComplete = assessmentStep >= assessmentQuestions.length;
  const activeQuestion =
    assessmentQuestions[Math.min(assessmentStep, assessmentQuestions.length - 1)];

  const conversationVocabulary = useMemo(() => {
    const dynamicWords =
      role === "Manager"
        ? [
            { word: "schedule", meaning: "a plan for time", chinese: "时间安排" },
            { word: "available", meaning: "free to do something", chinese: "有空的" },
          ]
        : role === "Professor"
          ? [
              { word: "understanding", meaning: "showing patience", chinese: "体谅" },
              { word: "arrive", meaning: "get to a place", chinese: "到达" },
            ]
          : role === "Customer"
            ? [
                { word: "beside", meaning: "next to", chinese: "在旁边" },
                { word: "helpful", meaning: "giving support", chinese: "有帮助的" },
              ]
            : [
                { word: "together", meaning: "with another person", chinese: "一起" },
                { word: "practice", meaning: "repeat to improve", chinese: "练习" },
              ];

    return [...starterVocabulary.slice(0, 2), ...dynamicWords];
  }, [role]);

  const nextAssessmentStep = () => {
    if (!assessmentStarted) {
      setAssessmentStarted(true);
      return;
    }

    if (!assessmentComplete) {
      setAssessmentStep((current) => current + 1);
    }
  };

  const currentQuiz = quizChoices[quizIndex];

  const nextQuiz = () => {
    setQuizAnswer(null);
    setQuizIndex((current) => (current + 1) % quizChoices.length);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff5df,0%,#f9efe1,35%,#f4ead9,55%,#efe3ce,100%)] text-slate-900">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_24px_80px_rgba(111,78,55,0.14)] backdrop-blur">
          <div className="grid gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.25fr_0.9fr] lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <span className="rounded-full bg-amber-200 px-4 py-2 text-amber-950">
                  Voice-first MVP
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-slate-700">
                  Low-literacy friendly
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-900">
                  English + Chinese support
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                  SpeakEasy Journey
                </p>
                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  A hackathon-ready English coach built for speaking, listening,
                  and confidence.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                  This prototype avoids heavy reading and writing. Learners hear a
                  prompt, respond by voice, practice real-life conversations, and
                  review simple vocabulary with clear visual cues.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <MetricCard label="Estimated level" value="Beginner A1" helper="After 5 spoken prompts" />
                <MetricCard label="Daily streak" value="6 days" helper="Duolingo-style motivation" />
                <MetricCard label="Today&apos;s focus" value="Work talk" helper="Manager conversation mode" />
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.34)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                    Demo flow
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">Today&apos;s learning path</h2>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-sm">
                  12 min
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  "1. Speaking assessment",
                  "2. Role-based conversation",
                  "3. AI vocabulary cards",
                  "4. Review + daily check-in",
                  "5. Next-session quiz",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300 font-bold text-slate-950">
                      {index + 1}
                    </div>
                    <p className="text-sm text-white/90">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-300 p-4 text-slate-950">
                <p className="text-sm font-semibold uppercase tracking-[0.25em]">
                  ElevenLabs ready
                </p>
                <p className="mt-2 text-sm leading-6">
                  Swap the mock audio button with a real ElevenLabs request for
                  spoken AI replies during the hackathon demo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                  1. Speaking assessment
                </p>
                <h2 className="mt-2 text-3xl font-bold">Split-screen spoken check</h2>
              </div>
              <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900">
                {assessmentComplete
                  ? "Assessment complete"
                  : `Question ${Math.min(assessmentStep + 1, assessmentQuestions.length)} of ${assessmentQuestions.length}`}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                  Left side: English prompt
                </p>
                {!assessmentStarted ? (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-2xl font-bold">Tap to begin the speaking check</h3>
                    <p className="text-sm leading-6 text-white/75">
                      The learner hears one simple question at a time and answers
                      out loud.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                      {activeQuestion.level}
                    </div>
                    <h3 className="text-2xl font-bold leading-tight">
                      {assessmentComplete ? "You are ready to start your journey." : activeQuestion.prompt}
                    </h3>
                    <p className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-white/75">
                      {assessmentComplete
                        ? "Estimated level: Beginner A1-A2. The learner can answer simple personal and daily-life questions."
                        : `Prompt hint: ${activeQuestion.hint}`}
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-amber-50/80 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
                  Right side: voice input transcript
                </p>
                <div className="mt-6 rounded-[1.5rem] bg-white p-5 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                      Mic active
                    </span>
                    <span className="text-sm text-slate-500">Mock speech-to-text</span>
                  </div>
                  <p className="mt-5 min-h-28 text-lg leading-8 text-slate-800">
                    {!assessmentStarted
                      ? "Press start, speak naturally, and the transcript will appear here."
                      : assessmentComplete
                        ? "Strongest areas: personal introduction, daily routines, asking for help."
                        : activeQuestion.mockReply}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={nextAssessmentStep}
                    className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    {!assessmentStarted
                      ? "Start assessment"
                      : assessmentComplete
                        ? "Press to start your journey"
                        : "Next question"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAssessmentStarted(false);
                      setAssessmentStep(0);
                    }}
                    className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Reset demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                5. Daily check-in
              </p>
              <h2 className="mt-2 text-3xl font-bold">Calendar + review habit</h2>
              <div className="mt-6 grid grid-cols-7 gap-2">
                {dailyChecks.map((item) => (
                  <div
                    key={item.day}
                    className={`rounded-2xl px-2 py-4 text-center text-sm font-semibold ${
                      item.done
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <div>{item.day}</div>
                    <div className="mt-2 text-lg">{item.done ? "On" : "Off"}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-4 text-white">
                <p className="text-sm text-white/75">Tonight&apos;s review</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {conversationVocabulary.map((item) => (
                    <span
                      key={item.word}
                      className="rounded-full bg-white/10 px-3 py-2 text-sm"
                    >
                      {item.word}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                7. Voice output
              </p>
              <h2 className="mt-2 text-3xl font-bold">Spoken AI reply</h2>
              <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-orange-500 to-amber-300 p-5 text-slate-950">
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Demo button
                </p>
                <p className="mt-3 text-sm leading-6">
                  In the hackathon demo, this button can call ElevenLabs to read
                  the AI answer aloud in a supportive speaking pace.
                </p>
                <button
                  type="button"
                  className="mt-5 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                >
                  Play AI voice response
                </button>
              </div>
            </section>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                  2. Scenario-based practice
                </p>
                <h2 className="mt-2 text-3xl font-bold">The AI changes speaking style by role</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(scenarioPresets) as Role[]).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRole(preset)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      role === preset
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-[1.5rem] bg-amber-50 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
                  Conversation setup
                </p>
                <h3 className="mt-4 text-2xl font-bold">{scenarioPresets[role].label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {scenarioPresets[role].opening}
                </p>
                <div className="mt-4 rounded-2xl bg-white/80 p-4 text-sm leading-6 text-slate-700">
                  <p className="font-semibold text-slate-900">AI coaching style</p>
                  <p className="mt-2">{scenarioPresets[role].style}</p>
                </div>
                <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-white/85">
                  <p className="font-semibold text-amber-300">Chinese helper</p>
                  <p className="mt-2">{scenarioPresets[role].chinese}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Type or paste mock speech transcript
                </p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-3xl rounded-bl-md bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                    {scenarioPresets[role].opening}
                  </div>
                  <textarea
                    value={typedMessage}
                    onChange={(event) => setTypedMessage(event.target.value)}
                    className="min-h-32 w-full rounded-3xl rounded-br-md border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-amber-400"
                    placeholder="Type what the learner said, in English or Chinese."
                  />
                  <div className="rounded-3xl rounded-bl-md bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
                    <p className="font-semibold">AI response</p>
                    <p className="mt-2">{scenarioPresets[role].aiReply}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                4. AI vocabulary
              </p>
              <h2 className="mt-2 text-3xl font-bold">Fresh words from the conversation</h2>
              <div className="mt-5 grid gap-3">
                {conversationVocabulary.map((item) => (
                  <div
                    key={item.word}
                    className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xl font-bold">{item.word}</p>
                        <p className="text-sm text-slate-600">{item.meaning}</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
                        {item.chinese}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                6. Next-session quiz
              </p>
              <h2 className="mt-2 text-3xl font-bold">Quick memory check</h2>
              <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <p className="text-lg font-semibold">{currentQuiz.prompt}</p>
                <div className="mt-4 grid gap-3">
                  {currentQuiz.options.map((option) => {
                    const selected = quizAnswer === option;
                    const correct = quizAnswer && option === currentQuiz.answer;
                    const wrong = selected && option !== currentQuiz.answer;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setQuizAnswer(option)}
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
                    onClick={nextQuiz}
                    className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950"
                  >
                    Next quiz card
                  </button>
                  <p className="text-sm text-white/75">
                    {quizAnswer
                      ? quizAnswer === currentQuiz.answer
                        ? "Correct. The learner remembers this word."
                        : `Try again. Correct answer: ${currentQuiz.answer}.`
                      : "Choose one answer to simulate the next-session quiz."}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                8. Goal tracking
              </p>
              <h2 className="mt-2 text-3xl font-bold">Streaks and progress</h2>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>Daily speaking goal</span>
                    <span>8 / 10 minutes</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-slate-100">
                    <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <MetricCard label="Current streak" value="6" helper="days in a row" />
                  <MetricCard label="Weekly goal" value="4/5" helper="sessions done" />
                  <MetricCard label="Confidence" value="82%" helper="speaking comfort" />
                </div>
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{helper}</p>
    </div>
  );
}
