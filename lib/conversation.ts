import type { ConversationVocabularyItem, Role, WordKey, WordMeaning } from "@/types/app";

const baseWords: WordKey[] = ["appointment", "delayed", "shift", "aisle"];

const roleWordMap: Record<Role, WordKey[]> = {
  Friend: ["together", "practice"],
  Professor: ["understanding", "arrive"],
  Manager: ["schedule", "available"],
  Customer: ["beside", "helpful"],
};

export function getConversationVocabularyFromWordMaps(
  role: Role,
  wordMaps: { EN: Record<WordKey, WordMeaning>; RO: Record<WordKey, WordMeaning> },
): ConversationVocabularyItem[] {
  const selectedWords = [...baseWords.slice(0, 2), ...roleWordMap[role]];

  return selectedWords.map((word) => ({
    word,
    meaning: wordMaps.EN[word].m,
    rohingya: wordMaps.RO[word].m,
  }));
}
