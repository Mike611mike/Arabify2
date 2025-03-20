
import React from 'react';
import { UserRound } from 'lucide-react';
import { RolePlayScenario } from '@/data/roleplay';
import ConversationHistory from './ConversationHistory';
import PhraseOptions from './PhraseOptions';
import GameCompleted from './GameCompleted';
import { Sentence } from '@/context/types/sentence.types';

interface Message {
  speaker: 'user' | 'npc';
  text: string;
  translation: string;
}

interface ConversationStageProps {
  scenario: RolePlayScenario;
  stageIndex: number;
  conversationHistory: Message[];
  options: Sentence[];
  selectedOption: string | null;
  isComplete: boolean;
  playAudio: (arabic: string, spokenArabic: string, id: string) => void;
  onSelectOption: (option: Sentence) => void;
  onReset: () => void;
  score: number;
  sentences: Sentence[];
}

const ConversationStage: React.FC<ConversationStageProps> = ({
  scenario,
  stageIndex,
  conversationHistory,
  options,
  selectedOption,
  isComplete,
  playAudio,
  onSelectOption,
  onReset,
  score,
  sentences
}) => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-4 rounded-lg mb-4">
        <div className="flex items-center">
          <div className="bg-spotify-green bg-opacity-20 p-2 rounded-full mr-3">
            <UserRound size={18} className="text-spotify-green" />
          </div>
          <div>
            <h3 className="text-lg font-medium">{scenario.title}</h3>
            <p className="text-sm text-spotify-text">{scenario.description}</p>
          </div>
        </div>
      </div>
      
      {/* Conversation history */}
      <ConversationHistory 
        messages={conversationHistory}
        playAudio={playAudio}
        sentences={sentences}
      />
      
      {!isComplete && stageIndex < scenario.stages.length ? (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-spotify-light bg-opacity-20">
            <p className="text-sm font-medium mb-1">Your turn:</p>
            <p>{scenario.stages[stageIndex].prompt}</p>
          </div>
          
          <PhraseOptions 
            options={options}
            onSelectOption={onSelectOption}
            isDisabled={selectedOption !== null}
            playAudio={playAudio}
          />
        </div>
      ) : (
        <GameCompleted 
          scenarioTitle={scenario.title}
          onReset={onReset}
        />
      )}
    </div>
  );
};

export default ConversationStage;
