
import React from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sentence } from '@/context/types/sentence.types';

interface ConversationMessageProps {
  speaker: 'user' | 'npc';
  text: string;
  translation: string;
  onPlayAudio?: () => void;
  isPlayingAudio?: boolean;
  isLoadingAudio?: boolean;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ 
  speaker, 
  text, 
  translation, 
  onPlayAudio,
  isPlayingAudio,
  isLoadingAudio
}) => {
  return (
    <div className={`flex ${speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          speaker === 'user' 
            ? 'bg-spotify-green text-white rounded-tr-none ml-auto shadow-lg shadow-spotify-green/30' 
            : 'bg-spotify-light bg-opacity-50 rounded-tl-none shadow-lg shadow-black/20'
        }`}
      >
        <p className={`${speaker === 'user' ? 'font-arabic text-lg' : 'font-arabic text-lg'}`}>
          {text}
        </p>
        <p className="text-xs mt-1 opacity-80">
          {translation}
        </p>
        
        {speaker === 'npc' && onPlayAudio && (
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-6 w-6 mt-1 ml-auto block ${isPlayingAudio ? 'text-spotify-green animate-pulse' : ''}`}
            onClick={onPlayAudio}
            disabled={isLoadingAudio}
          >
            {isLoadingAudio ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Volume2 size={14} />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConversationMessage;
