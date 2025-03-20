
import React from 'react';
import { useSentences } from '../context/SentencesContext';
import { Sentence } from '../context/types/sentence.types';
import { useAudio } from '@/hooks/useAudio';
import EnhancedAudioControls from './audio/EnhancedAudioControls';
import SocialSharing from './social/SocialSharing';
import SentenceCardActions from './sentence-card/SentenceCardActions';
import SentenceCardBadges from './sentence-card/SentenceCardBadges';
import SentenceCardContent from './sentence-card/SentenceCardContent';
import SentenceCardMetadata from './sentence-card/SentenceCardMetadata';

interface SentenceCardProps {
  sentence: Sentence;
  showActions?: boolean;
  hideControls?: boolean;
  hideMetadata?: boolean;
  hideEnglish?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SentenceCard: React.FC<SentenceCardProps> = ({
  sentence,
  showActions = true,
  hideControls = false,
  hideMetadata = false,
  hideEnglish = false,
  className = '',
  style
}) => {
  const { playAudio, isPlaying, isLoading } = useAudio();
  const { toggleFavorite, toggleMastered } = useSentences();

  // Handle favorite toggle
  const handleFavorite = () => {
    toggleFavorite(sentence.id, !sentence.favorite);
  };

  // Handle mastered toggle
  const handleMastered = () => {
    toggleMastered(sentence.id, !sentence.mastered);
  };

  return (
    <div className={`bg-spotify-light bg-opacity-20 p-4 rounded-lg ${className}`} style={style}>
      <div className="mb-3">
        <SentenceCardBadges 
          favorite={sentence.favorite} 
          mastered={sentence.mastered} 
        />
      </div>

      <SentenceCardContent
        id={sentence.id}
        arabic={sentence.arabic}
        english={sentence.english} 
        spokenArabic={sentence.spokenArabic}
        hideEnglish={hideEnglish}
      />

      {!hideControls && (
        <div className="mt-4 flex justify-between items-center">
          <EnhancedAudioControls
            arabic={sentence.arabic}
            spokenArabic={sentence.spokenArabic}
            id={sentence.id}
            size="sm"
          />
          
          <div className="flex space-x-2">
            <SocialSharing 
              text={sentence.arabic}
              translation={sentence.english}
              size="sm"
            />
            
            {showActions && (
              <SentenceCardActions
                id={sentence.id}
                mastered={sentence.mastered}
                favorite={sentence.favorite}
                onToggleFavorite={handleFavorite}
                onToggleMastered={handleMastered}
              />
            )}
          </div>
        </div>
      )}

      {!hideMetadata && (
        <SentenceCardMetadata
          id={sentence.id}
          createdAt={sentence.createdAt}
          mastered={sentence.mastered}
          favorite={sentence.favorite}
        />
      )}
    </div>
  );
};

export default SentenceCard;
