
import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface SentenceCardBadgesProps {
  favorite: boolean;
  mastered: boolean;
}

const SentenceCardBadges: React.FC<SentenceCardBadgesProps> = ({
  favorite,
  mastered
}) => {
  if (!favorite && !mastered) return null;
  
  return (
    <div className="absolute top-2 right-2 flex items-center gap-2">
      {favorite && (
        <div className="text-yellow-500 flex items-center gap-1">
          <Star size={16} fill="currentColor" />
          <span className="text-xs font-medium">Favorite</span>
        </div>
      )}
      {mastered && (
        <div className="text-green-500 flex items-center gap-1">
          <CheckCircle2 size={16} />
          <span className="text-xs font-medium">Mastered</span>
        </div>
      )}
    </div>
  );
};

export default SentenceCardBadges;
