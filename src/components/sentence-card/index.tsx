
import React from 'react';
import { Sentence } from '@/context/SentencesContext';
import { cn } from '@/lib/utils';
import SentenceCardBadges from './SentenceCardBadges';
import SentenceCardContent from './SentenceCardContent';
import SentenceCardActions from './SentenceCardActions';
import SentenceCardMetadata from './SentenceCardMetadata';

interface SentenceCardProps {
  sentence: Sentence;
  hideEnglish?: boolean;
  showActions?: boolean;
  className?: string;
  style?: React.CSSProperties;
  hideMetadata?: boolean;
}

const SentenceCard: React.FC<SentenceCardProps> = ({ 
  sentence, 
  hideEnglish = false, 
  showActions = true,
  className,
  style,
  hideMetadata = false
}) => {
  return (
    <div 
      className={cn(
        'spotify-card glass-card animate-fade-in relative overflow-hidden',
        sentence.mastered && 'border-l-4 border-l-green-500',
        sentence.favorite && 'border-r-4 border-r-yellow-500',
        className
      )}
      style={style}
    >
      <SentenceCardBadges 
        favorite={sentence.favorite} 
        mastered={sentence.mastered} 
      />
      
      <SentenceCardContent
        id={sentence.id}
        arabic={sentence.arabic}
        spokenArabic={sentence.spokenArabic}
        english={sentence.english}
        hideEnglish={hideEnglish}
      />

      {showActions && (
        <SentenceCardActions
          id={sentence.id}
          mastered={sentence.mastered}
          favorite={sentence.favorite}
        />
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
