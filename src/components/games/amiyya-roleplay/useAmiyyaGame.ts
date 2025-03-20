
import { useState, useEffect } from 'react';
import { AmiyyaScenario, AmiyyaOption } from '@/data/amiyya-roleplay/types';
import { toast } from 'sonner';

interface Utterance {
  speaker: 'user' | 'npc';
  text: string;
  translation: string;
}

interface UseAmiyyaGameProps {
  scenarios: AmiyyaScenario[];
  playAudio: (arabic: string, spokenArabic: string, id: string) => void;
}

export const useAmiyyaGame = ({ scenarios, playAudio }: UseAmiyyaGameProps) => {
  const [scenario, setScenario] = useState<AmiyyaScenario | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Utterance[]>([]);
  const [score, setScore] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  
  // Choose a scenario
  const chooseScenario = (selectedScenario: AmiyyaScenario) => {
    setScenario(selectedScenario);
    setCurrentStageIndex(0);
    setSelectedOptionId(null);
    setConversation([]);
    setScore(0);
    setIsGameComplete(false);
    
    // Add the first NPC message to start the conversation
    setTimeout(() => {
      if (selectedScenario.stages.length > 0) {
        const firstStage = selectedScenario.stages[0];
        
        // Add NPC's initial message to conversation
        setConversation([
          {
            speaker: 'npc',
            text: firstStage.npcText,
            translation: firstStage.npcTranslation
          }
        ]);
        
        // Play the NPC's voice
        playAudio(firstStage.npcText, '', `npc-stage-0`);
      }
    }, 500);
  };
  
  // Select an option from the choices
  const selectOption = (option: AmiyyaOption) => {
    if (!scenario) return;
    
    // Set the selected option
    setSelectedOptionId(option.id);
    
    // Add user's response to conversation
    setConversation(prev => [
      ...prev,
      {
        speaker: 'user',
        text: option.text,
        translation: option.translation
      }
    ]);
    
    // Check if answer is correct and update score
    if (option.isCorrect) {
      setScore(prev => prev + 1);
      toast.success("Correct!");
    } else {
      toast.error("Try again!");
      
      // Find the correct option for feedback
      const correctOption = scenario.stages[currentStageIndex].options.find(opt => opt.isCorrect);
      if (correctOption) {
        setTimeout(() => {
          toast.info(`The correct response was: ${correctOption.translation}`);
        }, 1500);
      }
    }
    
    // Move to next stage after a delay
    setTimeout(() => {
      const nextStageIndex = currentStageIndex + 1;
      
      if (nextStageIndex < scenario.stages.length) {
        // Move to next stage
        setCurrentStageIndex(nextStageIndex);
        setSelectedOptionId(null);
        
        // Add NPC's next message to conversation
        const nextStage = scenario.stages[nextStageIndex];
        setConversation(prev => [
          ...prev,
          {
            speaker: 'npc',
            text: nextStage.npcText,
            translation: nextStage.npcTranslation
          }
        ]);
        
        // Play the NPC's voice
        playAudio(nextStage.npcText, '', `npc-stage-${nextStageIndex}`);
      } else {
        // Game is complete
        setIsGameComplete(true);
        toast.success("Conversation complete!");
      }
    }, 2000);
  };
  
  // Reset the game
  const resetGame = () => {
    // Choose a random scenario if available
    if (scenarios.length > 0) {
      const randomIndex = Math.floor(Math.random() * scenarios.length);
      chooseScenario(scenarios[randomIndex]);
    } else if (scenario) {
      // Restart the current scenario if no others are available
      chooseScenario(scenario);
    }
  };
  
  // Initialize the game with available scenarios
  useEffect(() => {
    if (scenarios.length > 0 && !scenario) {
      resetGame();
    }
  }, [scenarios]);
  
  return {
    scenario,
    currentStageIndex,
    selectedOptionId,
    conversation,
    score,
    isGameComplete,
    chooseScenario,
    selectOption,
    resetGame
  };
};
