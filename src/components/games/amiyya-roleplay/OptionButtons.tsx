
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { AmiyyaOption } from '@/data/amiyya-roleplay/types';

interface OptionButtonsProps {
  options: AmiyyaOption[];
  selectedOptionId: string | null;
  onSelectOption: (option: AmiyyaOption) => void;
  playAudio: (arabic: string, spokenArabic: string, id: string) => void;
}

const OptionButtons: React.FC<OptionButtonsProps> = ({ 
  options, 
  selectedOptionId, 
  onSelectOption,
  playAudio 
}) => {
  return (
    <div className="space-y-2">
      {options.map(option => (
        <Button
          key={option.id}
          variant="outline"
          className={`w-full justify-between h-auto py-3 shadow-md hover:shadow-lg transition-shadow ${
            selectedOptionId === option.id 
              ? (option.isCorrect 
                  ? "border-blue-500 shadow-blue-500/20" 
                  : "border-red-500 shadow-red-500/20") 
              : "shadow-purple-500/10"
          }`}
          onClick={() => !selectedOptionId && onSelectOption(option)}
          disabled={selectedOptionId !== null}
        >
          <div className="flex-1 text-left">
            <p className="font-arabic text-lg mb-1">{option.text}</p>
            <p className="text-xs opacity-80">{option.translation}</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-8 w-8" 
            onClick={(e) => {
              e.stopPropagation();
              playAudio(option.text, '', option.id);
            }}
          >
            <Volume2 size={16} />
          </Button>
        </Button>
      ))}
    </div>
  );
};

export default OptionButtons;
