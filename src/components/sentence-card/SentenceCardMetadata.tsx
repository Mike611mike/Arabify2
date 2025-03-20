
import React from 'react';
import { useTheme } from '@/context/providers/ThemeProvider';

interface SentenceCardMetadataProps {
  id: string;
  createdAt: string | number; // Update to accept both string and number
  mastered: boolean;
  favorite: boolean;
}

const SentenceCardMetadata: React.FC<SentenceCardMetadataProps> = ({
  id,
  createdAt,
  mastered,
  favorite
}) => {
  const { isDarkMode } = useTheme();

  // Convert createdAt to a date, handling both string and number types
  const createdDate = new Date(createdAt);

  return (
    <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700 text-slate-200' : 'border-slate-200 text-slate-700'}`}>
      <div className="mb-2">
        <span className="font-semibold">Added:</span>{' '}
        {createdDate.toLocaleDateString()}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Sentence ID:</span>{' '}
        <span className="font-mono text-xs">{id}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Status:</span>{' '}
        <span className={mastered ? 'text-green-400' : 'text-amber-400'}>
          {mastered ? 'Mastered' : 'Learning'}
        </span>
        {favorite && <span className="text-yellow-400 ml-1">, Favorite</span>}
      </div>
    </div>
  );
};

export default SentenceCardMetadata;
