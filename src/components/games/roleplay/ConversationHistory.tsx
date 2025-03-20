
import React from 'react';
import ConversationMessage from './ConversationMessage';
import { Sentence } from '@/context/types/sentence.types';

interface Message {
  speaker: 'user' | 'npc';
  text: string;
  translation: string;
}

interface ConversationHistoryProps {
  messages: Message[];
  playAudio: (arabic: string, spokenArabic: string, id: string) => void;
  sentences: Sentence[];
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ 
  messages, 
  playAudio, 
  sentences 
}) => {
  if (messages.length === 0) {
    return (
      <div className="text-center py-4 text-spotify-text">
        Begin the conversation by selecting a phrase below
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-60 overflow-y-auto p-2">
      {messages.map((message, index) => (
        <ConversationMessage
          key={index}
          speaker={message.speaker}
          text={message.text}
          translation={message.translation}
          onPlayAudio={
            message.speaker === 'npc' 
              ? () => {
                  const sentence = sentences.find(s => s.arabic === message.text);
                  if (sentence) {
                    playAudio(message.text, sentence.spokenArabic, sentence.id);
                  }
                }
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default ConversationHistory;
