
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { Sentence } from '@/context/types/sentence.types';

interface SentenceWithHintOption extends Sentence {
  isHintSentence?: boolean;
}

interface PhraseOptionsProps {
  options: SentenceWithHintOption[];
  onSelectOption: (option: SentenceWithHintOption) => void;
  isDisabled: boolean;
  playAudio: (arabic: string, spokenArabic: string, id: string) => void;
}

const PhraseOptions: React.FC<PhraseOptionsProps> = ({ 
  options, 
  onSelectOption, 
  isDisabled,
  playAudio 
}) => {
  return (
    <div className="space-y-2">
      {options.map(option => (
        <Button
          key={option.id}
          variant="outline"
          className={`w-full justify-between h-auto py-3 shadow-md hover:shadow-lg transition-shadow ${
            option.isHintSentence ? "border-green-500 border-dashed shadow-green-500/20" : "shadow-purple-500/10"
          }`}
          onClick={() => onSelectOption(option)}
          disabled={isDisabled}
        >
          <div className="flex-1 text-left">
            <p className="font-arabic text-lg mb-1">{option.arabic}</p>
            <p className="text-xs opacity-80">{option.english}</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-8 w-8" 
            onClick={(e) => {
              e.stopPropagation();
              playAudio(option.arabic, option.spokenArabic, option.id);
            }}
          >
            <Volume2 size={16} />
          </Button>
        </Button>
      ))}
    </div>
  );
};

export default PhraseOptions;
