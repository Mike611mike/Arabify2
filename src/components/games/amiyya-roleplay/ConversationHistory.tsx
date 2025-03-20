
import React from 'react';
import ConversationMessage from './ConversationMessage';

interface Utterance {
  speaker: 'user' | 'npc';
  text: string;
  translation: string;
}

interface ConversationHistoryProps {
  conversation: Utterance[];
  playAudio: (arabic: string, spokenArabic: string, id: string) => void;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ 
  conversation, 
  playAudio 
}) => {
  if (conversation.length === 0) {
    return (
      <div className="text-center py-4 text-spotify-text">
        Begin the conversation by selecting a scenario
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-60 overflow-y-auto p-2">
      {conversation.map((utterance, index) => (
        <ConversationMessage
          key={index}
          speaker={utterance.speaker}
          text={utterance.text}
          translation={utterance.translation}
          onPlayAudio={
            utterance.speaker === 'npc' 
              ? () => playAudio(utterance.text, '', `conversation-${index}`)
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default ConversationHistory;
