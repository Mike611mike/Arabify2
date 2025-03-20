
import { useState, useEffect } from 'react';
import { Sentence } from '@/context/types/sentence.types';
import { RolePlayScenario } from '@/data/roleplay';
import { toast } from 'sonner';
import { 
  SentenceWithHintOption,
  generateOptionsForStage 
} from './utils/optionsUtils';
import { 
  Message, 
  addUserMessage, 
  addNpcMessage 
} from './utils/conversationUtils';

interface UseRolePlayGameProps {
  sentences: Sentence[];
  availableScenarios: RolePlayScenario[];
  playAudio: (arabic: string, spokenArabic: string, id: string) => void;
}

export const useRolePlayGame = ({
  sentences,
  availableScenarios,
  playAudio
}: UseRolePlayGameProps) => {
  const [scenario, setScenario] = useState<RolePlayScenario | null>(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [options, setOptions] = useState<SentenceWithHintOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleGenerateOptions = (currentScenario: RolePlayScenario, stage: number) => {
    const generatedOptions = generateOptionsForStage(sentences, currentScenario, stage);
    
    if (!generatedOptions) {
      setIsComplete(true);
      return;
    }
    
    setOptions(generatedOptions);
  };
  
  const selectOption = (option: Sentence) => {
    if (!scenario) return;
    
    setSelectedOption(option.id);
    
    // Add user's choice to conversation
    setConversationHistory(prev => 
      addUserMessage(prev, option.arabic, option.english)
    );
    
    // Add NPC response
    setTimeout(() => {
      const npcResponse = scenario.stages[stageIndex].npcResponse;
      const npcTranslation = scenario.stages[stageIndex].npcResponseTranslation;
      
      setConversationHistory(prev => 
        addNpcMessage(prev, scenario, stageIndex)
      );
      
      // Play audio of NPC response
      playAudio(npcResponse, "", `npc-response-${stageIndex}`);
      
      // Update score
      setScore(prev => prev + 1);
      
      // Move to next stage
      setTimeout(() => {
        if (stageIndex < scenario.stages.length - 1) {
          setStageIndex(prev => prev + 1);
          setSelectedOption(null);
          handleGenerateOptions(scenario, stageIndex + 1);
        } else {
          setIsComplete(true);
          toast.success("Role-play complete!");
        }
      }, 2000);
    }, 1000);
  };
  
  const resetGame = () => {
    // Choose a random scenario if available, otherwise use the first one
    const scenarioIndex = Math.floor(Math.random() * availableScenarios.length);
    const selectedScenario = availableScenarios[scenarioIndex] || availableScenarios[0];
    
    setScenario(selectedScenario);
    setStageIndex(0);
    setSelectedOption(null);
    setConversationHistory([]);
    setScore(0);
    setIsComplete(false);
    
    // Generate options for the first stage
    handleGenerateOptions(selectedScenario, 0);
  };
  
  const chooseScenario = (selectedScenario: RolePlayScenario) => {
    setScenario(selectedScenario);
    setStageIndex(0);
    setSelectedOption(null);
    setConversationHistory([]);
    setScore(0);
    setIsComplete(false);
    
    // Generate options for the first stage
    handleGenerateOptions(selectedScenario, 0);
  };
  
  // Initialize the game with available scenarios
  useEffect(() => {
    if (sentences.length > 0 && availableScenarios.length > 0 && !scenario) {
      resetGame();
    }
  }, [sentences, availableScenarios, scenario]);
  
  return {
    scenario,
    stageIndex,
    options,
    selectedOption,
    conversationHistory,
    score,
    isComplete,
    selectOption,
    resetGame,
    chooseScenario
  };
};
