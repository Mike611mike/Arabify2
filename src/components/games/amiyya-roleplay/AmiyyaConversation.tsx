
import React from 'react';
import { 
  Car, 
  School, 
  Home, 
  ShoppingCart, 
  Stethoscope 
} from 'lucide-react';
import { AmiyyaScenario } from '@/data/amiyya-roleplay/types';
import ConversationHistory from './ConversationHistory';
import OptionButtons from './OptionButtons';
import GameCompleted from './GameCompleted';

interface Utterance {
  speaker: 'user' | 'npc';
  text: string;
  translation: string;
}

interface AmiyyaConversationProps {
  scenario: AmiyyaScenario;
  currentStageIndex: number;
  conversation: Utterance[];
  selectedOptionId: string | null;
  isGameComplete: boolean;
  onSelectOption: (option: any) => void;
  playAudio: (arabic: string, spokenArabic: string, id: string) => void;
  onReset: () => void;
}

const AmiyyaConversation: React.FC<AmiyyaConversationProps> = ({
  scenario,
  currentStageIndex,
  conversation,
  selectedOptionId,
  isGameComplete,
  onSelectOption,
  playAudio,
  onReset
}) => {
  // Get icon component based on scenario category
  const getIconComponent = () => {
    switch (scenario.category) {
      case 'taxi':
        return <Car size={18} className="text-spotify-green" />;
      case 'school':
        return <School size={18} className="text-spotify-green" />;
      case 'home':
        return <Home size={18} className="text-spotify-green" />;
      case 'market':
        return <ShoppingCart size={18} className="text-spotify-green" />;
      case 'doctor':
        return <Stethoscope size={18} className="text-spotify-green" />;
      default:
        return <Car size={18} className="text-spotify-green" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-4 rounded-lg mb-4">
        <div className="flex items-center">
          <div className="bg-spotify-orange bg-opacity-20 p-2 rounded-full mr-3">
            {getIconComponent()}
          </div>
          <div>
            <h3 className="text-lg font-medium">{scenario.title}</h3>
            <p className="text-sm text-spotify-text">{scenario.description}</p>
          </div>
        </div>
      </div>
      
      {/* Conversation history */}
      <ConversationHistory 
        conversation={conversation}
        playAudio={playAudio}
      />
      
      {!isGameComplete && currentStageIndex < scenario.stages.length ? (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-spotify-light bg-opacity-20">
            <p className="text-sm font-medium mb-1">Your turn:</p>
            <p>{scenario.stages[currentStageIndex].prompt}</p>
          </div>
          
          <OptionButtons 
            options={scenario.stages[currentStageIndex].options}
            selectedOptionId={selectedOptionId}
            onSelectOption={onSelectOption}
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

export default AmiyyaConversation;
