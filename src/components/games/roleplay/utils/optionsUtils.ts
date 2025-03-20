
import { Sentence } from '@/context/types/sentence.types';
import { RolePlayScenario } from '@/data/roleplay';
import { shuffle } from '@/utils/arrayUtils';
import { getHintPhraseForStage, getHintSpokenForStage } from './hintUtils';

// Extend Sentence to handle the hint option
export interface SentenceWithHintOption extends Sentence {
  isHintSentence?: boolean;
}

/**
 * Generate options for the current stage
 */
export const generateOptionsForStage = (
  sentences: Sentence[],
  currentScenario: RolePlayScenario, 
  stage: number
): SentenceWithHintOption[] | null => {
  if (!currentScenario || stage >= currentScenario.stages.length) {
    return null;
  }
  
  const currentStage = currentScenario.stages[stage];
  
  // Find sentences that might be suitable for this stage
  const stageKeywords = currentStage.prompt.toLowerCase().split(" ");
  
  // Find sentences that contain any of the keywords
  const relevantSentences = sentences.filter(sentence => {
    return stageKeywords.some(keyword => 
      sentence.english.toLowerCase().includes(keyword) || 
      sentence.spokenArabic.toLowerCase().includes(keyword)
    );
  });
  
  // Create a special hint option based on the current stage
  const currentTime = new Date().getTime();
  const hintSentence: SentenceWithHintOption = {
    id: "hint-sentence-" + stage,
    arabic: getHintPhraseForStage(currentStage.prompt),
    spokenArabic: getHintSpokenForStage(currentStage.prompt),
    english: currentStage.prompt,
    createdAt: currentTime,
    updatedAt: currentTime,
    favorite: false,
    mastered: false,
    isHintSentence: true
  };
  
  // Select a few relevant sentences, or fill with other sentences if needed
  let selectedOptions = relevantSentences.slice(0, 2);
  if (selectedOptions.length < 2) {
    const otherSentences = sentences
      .filter(s => !relevantSentences.includes(s))
      .slice(0, 2 - selectedOptions.length);
    
    selectedOptions = [...selectedOptions, ...otherSentences];
  }
  
  // Add the hint option
  selectedOptions = [hintSentence, ...selectedOptions.slice(0, 2)];
  
  return shuffle(selectedOptions);
};
