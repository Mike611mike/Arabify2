
import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import GameBase from './GameBase';
import { useAudio } from '@/hooks/useAudio';
import { shuffle } from '@/utils/arrayUtils';
import { rolePlayScenarios } from '@/data/roleplay';
import ScenarioSelector from './roleplay/ScenarioSelector';
import ConversationStage from './roleplay/ConversationStage';
import { useRolePlayGame } from './roleplay/useRolePlayGame';

const RolePlaySimulator: React.FC = () => {
  const { sentences } = useSentences();
  const { playAudio } = useAudio();
  const [availableScenarios, setAvailableScenarios] = useState([]);
  
  // Initialize the scenario selection
  useEffect(() => {
    setAvailableScenarios(shuffle([...rolePlayScenarios]));
  }, []);
  
  const {
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
  } = useRolePlayGame({
    sentences,
    availableScenarios,
    playAudio
  });
  
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
      title="Role-Play Simulator" 
      description="Practice real-life conversations in Arabic" 
      onRestart={resetGame}
      showScore={true}
      score={score}
      maxScore={scenario?.stages?.length || 0}
    >
      <ConversationStage
        scenario={scenario}
        stageIndex={stageIndex}
        conversationHistory={conversationHistory}
        options={options}
        selectedOption={selectedOption}
        isComplete={isComplete}
        playAudio={playAudio}
        onSelectOption={selectOption}
        onReset={resetGame}
        score={score}
        sentences={sentences}
      />
    </GameBase>
  );
};

export default RolePlaySimulator;
