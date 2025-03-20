
import React from 'react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import SentenceCard from '@/components/SentenceCard';
import { Sentence } from '@/context/types/sentence.types';
import { useTheme } from '@/context/providers/ThemeProvider';

interface SentenceListProps {
  groupedSentences: Record<string, Sentence[]>;
  sortedDays: string[];
}

const SentenceList: React.FC<SentenceListProps> = ({ 
  groupedSentences, 
  sortedDays 
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      {sortedDays.map((day) => (
        <div key={day} className="animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div className={`text-sm font-medium ${isDarkMode ? 'text-spotify-green' : 'text-green-600'}`}>
              {format(new Date(day), 'EEEE, MMMM d, yyyy')}
            </div>
            <Separator className={`flex-1 ${isDarkMode ? 'bg-spotify-light' : 'bg-gray-200'}`} />
            <div className={`text-xs px-2 py-0.5 rounded-full ${
              isDarkMode 
                ? 'text-spotify-text bg-spotify-light bg-opacity-40' 
                : 'text-gray-600 bg-gray-100'
            }`}>
              {groupedSentences[day].length} {groupedSentences[day].length === 1 ? 'sentence' : 'sentences'}
            </div>
          </div>
          
          <div className="space-y-4">
            {groupedSentences[day].map((sentence, index) => (
              <SentenceCard 
                key={sentence.id} 
                sentence={sentence} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                hideMetadata={true}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SentenceList;
