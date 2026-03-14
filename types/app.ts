export type Language = "EN" | "RO";

export type Role = "Friend" | "Professor" | "Manager" | "Customer";

export type WordKey =
  | "appointment"
  | "delayed"
  | "shift"
  | "aisle"
  | "schedule"
  | "available"
  | "understanding"
  | "arrive"
  | "beside"
  | "helpful"
  | "together"
  | "practice";

export interface AssessmentQuestion {
  level: string;
  prompt: string;
  hint: string;
  reply: string;
}

export interface ScenarioCopy {
  label: string;
  style: string;
  opening: string;
  helper: string;
  aiReply: string;
}

export interface QuizChoice {
  prompt: string;
  answer: string;
  options: string[];
}

export interface WordMeaning {
  m: string;
}

export interface TranslationContent {
  voiceFirst: string;
  lowLiteracy: string;
  support: string;
  title: string;
  desc: string;
  estLevel: string;
  estLevelVal: string;
  estLevelHelp: string;
  streak: string;
  streakVal: string;
  streakHelp: string;
  focus: string;
  focusVal: string;
  focusHelp: string;
  demoFlow: string;
  path: string;
  flow1: string;
  flow2: string;
  flow3: string;
  flow4: string;
  flow5: string;
  elTitle: string;
  elDesc: string;
  sec1Tag: string;
  sec1Title: string;
  assessmentComplete: string;
  questionFlow: (current: number, total: number) => string;
  leftSide: string;
  tapBegin: string;
  tapDesc: string;
  readyJourney: string;
  estLevelFull: string;
  promptHint: (hint: string) => string;
  rightSide: string;
  micActive: string;
  mockStt: string;
  pressStart: string;
  strongAreas: string;
  btnStart: string;
  btnJourney: string;
  btnNext: string;
  btnReset: string;
  assessments: AssessmentQuestion[];
  sec5Tag: string;
  sec5Title: string;
  dayOn: string;
  dayOff: string;
  tonightRev: string;
  sec7Tag: string;
  sec7Title: string;
  analysisStrengths: string;
  analysisStr1: string;
  analysisStr2: string;
  analysisTips: string;
  analysisTip1: string;
  analysisTip2: string;
  analysisVocab: string;
  analysisVocab1: string;
  analysisVocab2: string;
  sec2Tag: string;
  sec2Title: string;
  convSetup: string;
  aiCoachStyle: string;
  helperLang: string;
  typePaste: string;
  placeholderType: string;
  aiResponse: string;
  sec4Tag: string;
  sec4Title: string;
  sec6Tag: string;
  sec6Title: string;
  nextCard: string;
  quizCorrectText: string;
  quizWrongText: (answer: string) => string;
  quizPromptText: string;
  sec8Tag: string;
  sec8Title: string;
  dailyGoal: string;
  curStreak: string;
  daysRow: string;
  weekGoal: string;
  sessDone: string;
  confLevel: string;
  speakComf: string;
  words: Record<WordKey, WordMeaning>;
  scenario: Record<Role, ScenarioCopy>;
  quizContent: QuizChoice[];
  voiceInput: string;
  startRecording: string;
  stopRecording: string;
  useVoiceReply: string;
  useTextReply: string;
  voiceReplyLabel: string;
  textReplyLabel: string;
  listeningMsg: string;
}

export interface DailyCheck {
  day: string;
  done: boolean;
}

export interface ConversationVocabularyItem {
  word: WordKey;
  meaning: string;
  rohingya: string;
}
