
import React from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        className={`max-w-[80%] p-3 rounded-lg backdrop-blur-sm ${
          speaker === 'user' 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 rounded-tr-none ml-auto border border-purple-500/30 shadow-2xl shadow-purple-500/40' 
            : 'bg-gradient-to-r from-slate-800/80 to-indigo-900/80 rounded-tl-none border border-indigo-500/30 shadow-2xl shadow-indigo-500/40'
        }`}
      >
        <p className="font-arabic text-lg text-white font-medium">
          {text}
        </p>
        <p className="text-xs mt-1 text-slate-100">
          {translation}
        </p>
        
        {speaker === 'npc' && onPlayAudio && (
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-6 w-6 mt-1 ml-auto block text-pink-300 hover:text-pink-200 hover:bg-purple-900/50 ${
              isPlayingAudio ? 'animate-pulse bg-purple-900/30' : ''
            }`}
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
