import React, { useState, useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';
import GameBase from './GameBase';
import { allAmiyyaScenarios } from '@/data/amiyya-roleplay';
import { AmiyyaScenario } from '@/data/amiyya-roleplay/types';
import ScenarioSelector from './amiyya-roleplay/ScenarioSelector';
import AmiyyaConversation from './amiyya-roleplay/AmiyyaConversation';
import { useAmiyyaGame } from './amiyya-roleplay/useAmiyyaGame';
import { shuffle } from '@/utils/arrayUtils';

const AmiyyaRolePlay: React.FC = () => {
  const { playAudio } = useAudio();
  const [availableScenarios, setAvailableScenarios] = useState<AmiyyaScenario[]>([]);
  
  // Initialize scenarios on component mount
  useEffect(() => {
    setAvailableScenarios(shuffle([...allAmiyyaScenarios]));
  }, []);
  
  const {
    scenario,
    currentStageIndex,
    selectedOptionId,
    conversation,
    score,
    isGameComplete,
    chooseScenario,
    selectOption,
    resetGame
  } = useAmiyyaGame({ scenarios: availableScenarios, playAudio });
  
  // If no scenario is selected, show the scenario selector
  if (!scenario) {
    return (
      <ScenarioSelector
        scenarios={availableScenarios}
        onSelectScenario={chooseScenario}
      />
    );
  }
  
  // Otherwise, show the active conversation
  return (
    <GameBase 
      title="Amiyya Role Play" 
      description="Practice real-life conversations in Egyptian Arabic" 
      onRestart={resetGame}
      showScore={true}
      score={score}
      maxScore={scenario.stages.length}
    >
      <AmiyyaConversation
        scenario={scenario}
        currentStageIndex={currentStageIndex}
        conversation={conversation}
        selectedOptionId={selectedOptionId}
        isGameComplete={isGameComplete}
        onSelectOption={selectOption}
        playAudio={playAudio}
        onReset={resetGame}
      />
    </GameBase>
  );
};

export default AmiyyaRolePlay;
