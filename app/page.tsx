"use client";

import { useMemo, useState } from "react";

type Role = "Friend" | "Professor" | "Manager" | "Customer";

const DICT = {
  EN: {
    // Top headers
    voiceFirst: "Voice-first MVP",
    lowLiteracy: "Low-literacy friendly",
    support: "English + Rohingya support",
    title: "A hackathon-ready English coach built for speaking, listening, and confidence.",
    desc: "This prototype avoids heavy reading and writing. Learners hear a prompt, respond by voice, practice real-life conversations, and review simple vocabulary with clear visual cues.",

    // Overview metrics
    estLevel: "Estimated level",
    estLevelVal: "Beginner A1",
    estLevelHelp: "After 5 spoken prompts",
    streak: "Daily streak",
    streakVal: "6 days",
    streakHelp: "Duolingo-style motivation",
    focus: "Today's focus",
    focusVal: "Work talk",
    focusHelp: "Manager conversation mode",

    // Flow
    demoFlow: "Demo flow",
    path: "Today's learning path",
    flow1: "1. Speaking assessment",
    flow2: "2. Role-based conversation",
    flow3: "3. AI vocabulary cards",
    flow4: "4. Review + daily check-in",
    flow5: "5. Next-session quiz",

    // Eleven labs box
    elTitle: "ElevenLabs ready",
    elDesc: "Swap the mock audio button with a real ElevenLabs request for spoken AI replies during the hackathon demo.",

    // Section 1
    sec1Tag: "1. Speaking assessment",
    sec1Title: "Split-screen spoken check",
    assessmentComplete: "Assessment complete",
    questionFlow: (current: number, total: number) => `Question ${current} of ${total}`,
    leftSide: "Left side: English prompt",
    tapBegin: "Tap to begin the speaking check",
    tapDesc: "The learner hears one simple question at a time and answers out loud.",
    readyJourney: "You are ready to start your journey.",
    estLevelFull: "Estimated level: Beginner A1-A2. The learner can answer simple personal and daily-life questions.",
    promptHint: (hint: string) => `Prompt hint: ${hint}`,
    rightSide: "Right side: voice input transcript",
    micActive: "Mic active",
    mockStt: "Mock speech-to-text",
    pressStart: "Press start, speak naturally, and the transcript will appear here.",
    strongAreas: "Strongest areas: personal introduction, daily routines, asking for help.",
    btnStart: "Start assessment",
    btnJourney: "Press to start your journey",
    btnNext: "Next question",
    btnReset: "Reset demo",

    // Assessment data
    assessments: [
      { level: "Warm-up", prompt: "Say your name and where you live now.", hint: "My name is ____. I live in ____.", reply: "My name is Amina. I live in Toronto now." },
      { level: "Daily life", prompt: "Tell me what you do in the morning.", hint: "I wake up, I eat breakfast, I go to work.", reply: "In the morning I wake up at seven and take the bus." },
      { level: "Need help", prompt: "Ask for help at a clinic or office.", hint: "Excuse me, I need help with ___.", reply: "Excuse me, I need help with my appointment time." },
      { level: "Past experience", prompt: "Talk about something you did yesterday.", hint: "Yesterday I went to ___.", reply: "Yesterday I went to English class and talked to my teacher." },
      { level: "Future plan", prompt: "Say one goal for next week.", hint: "Next week I want to ___.", reply: "Next week I want to practice English with my neighbor." },
    ],

    // Section 5
    sec5Tag: "5. Daily check-in",
    sec5Title: "Calendar + review habit",
    dayOn: "On",
    dayOff: "Off",
    tonightRev: "Tonight's review",

    // Section 7
    sec7Tag: "7. Voice output",
    sec7Title: "Spoken AI reply",
    btnDemo: "Demo button",
    btnDemoDesc: "In the hackathon demo, this button can call ElevenLabs to read the AI answer aloud in a supportive speaking pace.",
    playAudio: "Play AI voice response",

    // Section 2
    sec2Tag: "2. Scenario-based practice",
    sec2Title: "The AI changes speaking style by role",
    convSetup: "Conversation setup",
    aiCoachStyle: "AI coaching style",
    helperLang: "English helper",
    typePaste: "Type or paste mock speech transcript",
    placeholderType: "Type what the learner said, in English.",
    aiResponse: "AI response",

    // Vocab
    sec4Tag: "4. AI vocabulary",
    sec4Title: "Fresh words from the conversation",

    // Quiz
    sec6Tag: "6. Next-session quiz",
    sec6Title: "Quick memory check",
    nextCard: "Next quiz card",
    quizCorrectText: "Correct. The learner remembers this word.",
    quizWrongText: (ans: string) => `Try again. Correct answer: ${ans}.`,
    quizPromptText: "Choose one answer to simulate the next-session quiz.",

    // Section 8
    sec8Tag: "8. Goal tracking",
    sec8Title: "Streaks and progress",
    dailyGoal: "Daily speaking goal",
    curStreak: "Current streak",
    daysRow: "days in a row",
    weekGoal: "Weekly goal",
    sessDone: "sessions done",
    confLevel: "Confidence",
    speakComf: "speaking comfort",

    // Vocabulary data
    words: {
      appointment: { m: "a planned meeting" },
      delayed: { m: "running late" },
      shift: { m: "work time" },
      aisle: { m: "a row in a store" },
      schedule: { m: "a plan for time" },
      available: { m: "free to do something" },
      understanding: { m: "showing patience" },
      arrive: { m: "get to a place" },
      beside: { m: "next to" },
      helpful: { m: "giving support" },
      together: { m: "with another person" },
      practice: { m: "repeat to improve" },
    },

    scenario: {
      Friend: {
        label: "Casual and warm",
        style: "Short, relaxed sentences with friendly encouragement.",
        opening: "Your friend asks if you want to practice speaking together after dinner.",
        helper: "You can answer your friend in an easy and relaxed way.",
        aiReply: "That sounds great. We can meet after dinner and practice simple English together."
      },
      Professor: {
        label: "Respectful and clear",
        style: "Polite, complete sentences with formal tone.",
        opening: "You need to tell your professor that you may arrive late because of a bus delay.",
        helper: "When talking to the professor, be polite and clear.",
        aiReply: "Professor, I may be a few minutes late because my bus is delayed. Thank you for understanding."
      },
      Manager: {
        label: "Professional and direct",
        style: "Confident, concise, workplace-friendly language.",
        opening: "You want to ask your manager for a different shift next week.",
        helper: "When speaking to a manager, be direct but polite.",
        aiReply: "I wanted to ask if it is possible to change my shift next week because of a family appointment."
      },
      Customer: {
        label: "Helpful and service-focused",
        style: "Friendly support language with clear next steps.",
        opening: "A customer says they cannot find the rice and cooking oil.",
        helper: "When facing a customer, use language that offers help.",
        aiReply: "I can help you. The rice is in aisle three, and the cooking oil is beside it on the left."
      }
    },

    quizContent: [
      { prompt: "Which word means a planned meeting?", answer: "appointment", options: ["appointment", "aisle", "neighbor"] },
      { prompt: "Which word is used for work time?", answer: "shift", options: ["clinic", "shift", "practice"] }
    ]
  },
  RO: {
    // Top headers
    voiceFirst: "Abaz-foila MVP",
    lowLiteracy: "Kome foron-lekhon dost",
    support: "English + Rohingya modot",
    title: "Kotha, hunon ar himmot or laiya banail ekta English hikhon or coach.",
    desc: "E prototype zeada fora ar lekhar dorkar nai. Hikhoya ekta kotha hunibo, abaz diya jawab dibo, asol zindigi r kotha moshkor goribo, ar asan bhabe vocabulary hikhid fribo.",

    // Overview metrics
    estLevel: "Bhabar level",
    estLevelVal: "Shuruwal A1",
    estLevelHelp: "5 ta kotha hoar fore",
    streak: "Din or lagatar",
    streakVal: "6 din",
    streakHelp: "Moja di kam goron",
    focus: "Aijar dhyan",
    focusVal: "Kam or kotha",
    focusHelp: "Manager or loge kotha bhabe",

    // Flow
    demoFlow: "Demo rasta",
    path: "Aijar hikhon or rasta",
    flow1: "1. Kotha hoar jachai",
    flow2: "2. Role dhoira kotha moskhor",
    flow3: "3. AI hobdo r card",
    flow4: "4. Check goron + din or hisab",
    flow5: "5. Samner bar or soal",

    // Eleven labs box
    elTitle: "ElevenLabs toiyar",
    elDesc: "E audio button re asol ElevenLabs or request e bodoli felaibai hackathon or demo r waqto, zate AI abaz diya jawab dite fare.",

    // Section 1
    sec1Tag: "1. Kotha hoar jachai",
    sec1Title: "Duita screen e kotha check goron",
    assessmentComplete: "Jachai kothom",
    questionFlow: (current: number, total: number) => `Soal ${current} - ${total} bvitore`,
    leftSide: "Bawa pashe: English soal",
    tapBegin: "Kotha shuru goribar laiya tip mara",
    tapDesc: "Hikhoya ek bar e ekta asan soal hunibo ar zoore zore jawab dibo.",
    readyJourney: "Tui tor hofr shuru goritei toiyar.",
    estLevelFull: "Bhabar level: Shuruwal A1-A2. Hikhoya tar nioj re shinasot ar dinr kam kazi r soal jawab dite fare.",
    promptHint: (hint: string) => `Soal or ishara: ${hint}`,
    rightSide: "Dain pashe: tor kothar lekha",
    micActive: "Mic salu",
    mockStt: "Banawat lekha (Speech-to-text)",
    pressStart: "Shuru goron ot tip mara, normal bhabe kotha ho, ar lekhati ekhane ashibo.",
    strongAreas: "Mojboot jaga ofkin: nijo re sinasot, donor dinr kam kazi, ar modot magon.",
    btnStart: "Jachai shuru goron",
    btnJourney: "Tor sofor shuru goriti tip",
    btnNext: "Poror soal",
    btnReset: "Demo abar shuru gor",

    // Assessment data translated
    assessments: [
      { level: "Gorom Gorum", prompt: "Tor nam ar edon kote thakos kotha.", hint: "Aar nam oilde ____. Ami ____ot thaki.", reply: "Aar nam Amina. Ami ekhon Toronto r bvitore thaki." },
      { level: "Din r zindigi", prompt: "Aare ko, tui bohinne ki goros.", hint: "Ami oote, bhat khai, kaam ot zai.", reply: "Bohinne ami shaat ta baje uuti, ar bus re dhori." },
      { level: "Modot dorkar", prompt: "Doctor khana ba office ot modot maagho.", hint: "Maf goro, aare ___ er laiya modot dorkar.", reply: "Maf goro, ami mon ar appointment or waqto ti loi modot lage." },
      { level: "Furar obighota", prompt: "Khailka ki gorsos hera loi kotha.", hint: "Khailka ami ___ hot gechilam.", reply: "Khailka ami English class ot geiyi ar master or loge kotha hoiyi." },
      { level: "Agedir falan", prompt: "Samne habtar laiya ekta bhabna ko.", hint: "Samne habta ami ___ gorte saai.", reply: "Samne habta ami aro foroxir loge English kotha goron e moskhor gorte saai." },
    ],

    // Section 5
    sec5Tag: "5. Din or check-in",
    sec5Title: "Calendar + goron odot",
    dayOn: "On",
    dayOff: "Off",
    tonightRev: "Aij rati a check goron",

    // Section 7
    sec7Tag: "7. Abaz bair horn",
    sec7Title: "AI r mukhe jawab",
    btnDemo: "Demo button",
    btnDemoDesc: "Hackathon demo r modde, ei button a ElevenLabs ot biki AI r jawab asan speed e fori haunibo.",
    playAudio: "AI r abaz sunon",

    // Section 2
    sec2Tag: "2. Role loi practice goron",
    sec2Title: "AI e manush buiya tar kothar obhab bodoli felaibo",
    convSetup: "Kothar setting goron",
    aiCoachStyle: "AI coach or obhab",
    helperLang: "Rohingya modot",
    typePaste: "Tor banait kotha type gori ba copy paste gori di.",
    placeholderType: "Tor kotha lek, English ba Rohingya te.",
    aiResponse: "AI r jawab",

    // Vocab
    sec4Tag: "4. AI Hobdobol",
    sec4Title: "Kothar bvitore te noya hobdokin",

    // Quiz
    sec6Tag: "6. Porr session or sozai",
    sec6Title: "Zoldi monat goron check",
    nextCard: "Porr quiz card",
    quizCorrectText: "Saif. Tui e hobto ta zane/monot rakko.",
    quizWrongText: (ans: string) => `Abar dho. Asol jawab ailo: ${ans}.`,
    quizPromptText: "Porr session quiz an e bhabe oi, tar simulatn check gori loi. Eksan uttor bachiya naw.",

    // Section 8
    sec8Tag: "8. Lakshya takib goron",
    sec8Title: "Taana din ar bhalai goron",
    dailyGoal: "Din r kotha hoar kam",
    curStreak: "Ekhon ofdi lagatar",
    daysRow: "din milaaise",
    weekGoal: "Habtar monjur",
    sessDone: "dofa oiye",
    confLevel: "Himmot",
    speakComf: "kotha hoiti hanti",

    // Vocabulary mappings
    words: {
      appointment: { m: "Wada" },
      delayed: { m: "Deri" },
      shift: { m: "Kaam or waqto" },
      aisle: { m: "Dokanor rasta" },
      schedule: { m: "Waqto banan" },
      available: { m: "Khali" },
      understanding: { m: "Sabor goron" },
      arrive: { m: "Fouson" },
      beside: { m: "Khasot" },
      helpful: { m: "Modot goroiya" },
      together: { m: "Ek loge" },
      practice: { m: "Moshkor goron" }
    },

    scenario: {
      Friend: {
        label: "Normal ar usa",
        style: "Choto, sahaj bhabar saaten ar dost ar dila honsi.",
        opening: "Tor dost tare haikhe khawar pore eke shate practice gorite soayh kina?",
        helper: "Tui tor dost or loge asan ar normal bhabe kotha hoi fariba.",
        aiReply: "Huta kushi. Aaral khawar fore ektu kotha hor, normal English loge."
      },
      Professor: {
        label: "Ijjzoti ar saaf",
        style: "Bhodhro, sholo jekhon kothare saaf banaiya huni farbe.",
        opening: "Tui tor master re khoita ohite oi zhe tui bus r khetor diya ektu deri aibi.",
        helper: "Master or loge kotha hoile, adab ar saaf bhabe kotha hoite ouibo.",
        aiReply: "Master sab, aami ektu deri ot ashte pari kiyolla amar bus deri hoyse. Bohut shukriya amar obostha r majey bujar leya."
      },
      Manager: {
        label: "Kaam-kaj ar sidha",
        style: "Himmototthah, choto, ar kamor-joga r loge mil.",
        opening: "Tui tor manager re jigasha gorte so zhe poylla haftey rukam shift change kora jaite pare niki.",
        helper: "Manager or loge kotha hoite, seedha kintu adab er loge kotha hoiba.",
        aiReply: "Ami afojna re ji ga te saye zhe poylla haftey aamar shift ta change kora zaite pare niki kiyola aamar family ar kase appointment ase."
      },
      Customer: {
        label: "Modotiya ar seba-kora",
        style: "Arosh bhabar modot and porishab saaf goorib",
        opening: "Girahak er hoise zhe tar saul ba tel paibo nai.",
        helper: "Customer or mukhe, modot goron or bhabe kotha hoite fariba.",
        aiReply: "Ami tui modot gorefari. Sual hoi ta ektu aisle three ot. Ar tel tah aihno amar bawa pashe thakbo."
      }
    },

    quizContent: [
      { prompt: "Kun word mane 'Wada' (planned meeting)?", answer: "appointment", options: ["appointment", "aisle", "neighbor"] },
      { prompt: "Kun word of 'Kaamot waqto' kotha hoa jaih?", answer: "shift", options: ["clinic", "shift", "practice"] }
    ]
  }
};


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
  const [lang, setLang] = useState<"EN" | "RO">("EN");
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [role, setRole] = useState<Role>("Manager");
  const [typedMessage, setTypedMessage] = useState("");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);

  const t = DICT[lang];

  const assessmentComplete = assessmentStep >= t.assessments.length;
  const activeQuestion = t.assessments[Math.min(assessmentStep, t.assessments.length - 1)];

  const conversationVocabulary = useMemo(() => {
    const dynamicWords =
      role === "Manager"
        ? ["schedule", "available"]
        : role === "Professor"
          ? ["understanding", "arrive"]
          : role === "Customer"
            ? ["beside", "helpful"]
            : ["together", "practice"];

    const base = ["appointment", "delayed", "shift", "aisle"];
    const all = [...base.slice(0, 2), ...dynamicWords];

    return all.map((w) => ({
      word: w,
      // @ts-ignore
      meaning: DICT["EN"].words[w].m,
      // @ts-ignore
      rohingya: DICT["RO"].words[w].m
    }));
  }, [role, lang]);

  const nextAssessmentStep = () => {
    if (!assessmentStarted) {
      setAssessmentStarted(true);
      return;
    }

    if (!assessmentComplete) {
      setAssessmentStep((current) => current + 1);
    }
  };

  const currentQuiz = t.quizContent[quizIndex];

  const nextQuiz = () => {
    setQuizAnswer(null);
    setQuizIndex((current) => (current + 1) % t.quizContent.length);
  };

  return (
    <main className="min-h-screen relative bg-[radial-gradient(circle_at_top,#fff5df,0%,#f9efe1,35%,#f4ead9,55%,#efe3ce,100%)] text-slate-900">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setLang(lang === "EN" ? "RO" : "EN")}
          className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-white"
        >
          {lang === "EN" ? "Switch to Rohingya Translation" : "Switch to English Translation"}
        </button>
      </div>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 pt-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_24px_80px_rgba(111,78,55,0.14)] backdrop-blur">
          <div className="grid gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.25fr_0.9fr] lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <span className="rounded-full bg-amber-200 px-4 py-2 text-amber-950">
                  {t.voiceFirst}
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-slate-700">
                  {t.lowLiteracy}
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-900">
                  {t.support}
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                  SpeakEasy Journey
                </p>
                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  {t.title}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                  {t.desc}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <MetricCard label={t.estLevel} value={t.estLevelVal} helper={t.estLevelHelp} />
                <MetricCard label={t.streak} value={t.streakVal} helper={t.streakHelp} />
                <MetricCard label={t.focus} value={t.focusVal} helper={t.focusHelp} />
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.34)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                    {t.demoFlow}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{t.path}</h2>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-sm">
                  12 min
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  t.flow1,
                  t.flow2,
                  t.flow3,
                  t.flow4,
                  t.flow5,
                ].map((item, index) => (
                  <div
                    key={index}
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
                  {t.elTitle}
                </p>
                <p className="mt-2 text-sm leading-6">
                  {t.elDesc}
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
                  {t.sec1Tag}
                </p>
                <h2 className="mt-2 text-3xl font-bold">{t.sec1Title}</h2>
              </div>
              <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900">
                {assessmentComplete
                  ? t.assessmentComplete
                  : t.questionFlow(Math.min(assessmentStep + 1, t.assessments.length), t.assessments.length)}
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
                    <p className="text-sm leading-6 text-white/75">
                      {t.tapDesc}
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                      {activeQuestion.level}
                    </div>
                    <h3 className="text-2xl font-bold leading-tight">
                      {assessmentComplete ? t.readyJourney : activeQuestion.prompt}
                    </h3>
                    <p className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-white/75">
                      {assessmentComplete
                        ? t.estLevelFull
                        : t.promptHint(activeQuestion.hint)}
                    </p>
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
                    onClick={nextAssessmentStep}
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
                    onClick={() => {
                      setAssessmentStarted(false);
                      setAssessmentStep(0);
                    }}
                    className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    {t.btnReset}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                {t.sec5Tag}
              </p>
              <h2 className="mt-2 text-3xl font-bold">{t.sec5Title}</h2>
              <div className="mt-6 grid grid-cols-7 gap-2">
                {dailyChecks.map((item) => (
                  <div
                    key={item.day}
                    className={`rounded-2xl px-2 py-4 text-center text-sm font-semibold ${item.done
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-slate-100 text-slate-500"
                      }`}
                  >
                    <div>{item.day}</div>
                    <div className="mt-2 text-lg">{item.done ? t.dayOn : t.dayOff}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-4 text-white">
                <p className="text-sm text-white/75">{t.tonightRev}</p>
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
                {t.sec7Tag}
              </p>
              <h2 className="mt-2 text-3xl font-bold">{t.sec7Title}</h2>
              <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-orange-500 to-amber-300 p-5 text-slate-950">
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                  {t.btnDemo}
                </p>
                <p className="mt-3 text-sm leading-6">
                  {t.btnDemoDesc}
                </p>
                <button
                  type="button"
                  className="mt-5 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                >
                  {t.playAudio}
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
                  {t.sec2Tag}
                </p>
                <h2 className="mt-2 text-3xl font-bold">{t.sec2Title}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Friend", "Professor", "Manager", "Customer"] as Role[]).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRole(preset)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${role === preset
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
                  {t.convSetup}
                </p>
                {/* @ts-ignore */}
                <h3 className="mt-4 text-2xl font-bold">{t.scenario[role].label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {/* @ts-ignore */}
                  {t.scenario[role].opening}
                </p>
                <div className="mt-4 rounded-2xl bg-white/80 p-4 text-sm leading-6 text-slate-700">
                  <p className="font-semibold text-slate-900">{t.aiCoachStyle}</p>
                  {/* @ts-ignore */}
                  <p className="mt-2">{t.scenario[role].style}</p>
                </div>
                <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-white/85">
                  <p className="font-semibold text-amber-300">{t.helperLang}</p>
                  {/* @ts-ignore */}
                  <p className="mt-2">{t.scenario[role].helper}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  {t.typePaste}
                </p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-3xl rounded-bl-md bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                    {/* @ts-ignore */}
                    {t.scenario[role].opening}
                  </div>
                  <textarea
                    value={typedMessage}
                    onChange={(event) => setTypedMessage(event.target.value)}
                    className="min-h-32 w-full rounded-3xl rounded-br-md border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-amber-400"
                    placeholder={t.placeholderType}
                  />
                  <div className="rounded-3xl rounded-bl-md bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
                    <p className="font-semibold">{t.aiResponse}</p>
                    {/* @ts-ignore */}
                    <p className="mt-2">{t.scenario[role].aiReply}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                {t.sec4Tag}
              </p>
              <h2 className="mt-2 text-3xl font-bold">{t.sec4Title}</h2>
              <div className="mt-5 grid gap-3">
                {conversationVocabulary.map((item) => (
                  <div
                    key={item.word}
                    className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xl font-bold">{item.word}</p>
                        <p className="text-sm text-slate-600">{lang === 'EN' ? item.meaning : item.rohingya}</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
                        {lang === 'EN' ? item.rohingya : item.meaning}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

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
                    const correct = quizAnswer && option === currentQuiz.answer;
                    const wrong = selected && option !== currentQuiz.answer;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setQuizAnswer(option)}
                        className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${correct
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

            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(148,113,73,0.12)] backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                {t.sec8Tag}
              </p>
              <h2 className="mt-2 text-3xl font-bold">{t.sec8Title}</h2>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{t.dailyGoal}</span>
                    <span>8 / 10 minutes</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-slate-100">
                    <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <MetricCard label={t.curStreak} value="6" helper={t.daysRow} />
                  <MetricCard label={t.weekGoal} value="4/5" helper={t.sessDone} />
                  <MetricCard label={t.confLevel} value="82%" helper={t.speakComf} />
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
