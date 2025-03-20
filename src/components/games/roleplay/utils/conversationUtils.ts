
import { RolePlayScenario } from "@/data/roleplay";

export interface Message {
  speaker: 'user' | 'npc';
  text: string;
  translation: string;
}

/**
 * Add user's selected option to the conversation
 */
export const addUserMessage = (
  history: Message[], 
  arabicText: string, 
  englishText: string
): Message[] => {
  return [
    ...history, 
    {
      speaker: "user",
      text: arabicText,
      translation: englishText
    }
  ];
};

/**
 * Add NPC response to the conversation
 */
export const addNpcMessage = (
  history: Message[], 
  scenario: RolePlayScenario, 
  stageIndex: number
): Message[] => {
  return [
    ...history, 
    {
      speaker: "npc",
      text: scenario.stages[stageIndex].npcResponse,
      translation: scenario.stages[stageIndex].npcResponseTranslation
    }
  ];
};
