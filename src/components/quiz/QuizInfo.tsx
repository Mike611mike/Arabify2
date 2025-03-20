
import React from 'react';
import { format } from 'date-fns';
import { Brain } from 'lucide-react';

interface QuizInfoProps {
  selectedDate: Date | undefined;
  showReviewMode?: boolean;
}

const QuizInfo: React.FC<QuizInfoProps> = ({ selectedDate, showReviewMode = false }) => {
  return (
    <div className="mt-8 bg-spotify-light bg-opacity-40 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        {showReviewMode && <Brain size={18} className="text-spotify-green" />}
        {showReviewMode ? 'Smart Review Mode' : 'Quiz Mode'}
      </h3>
      <p className="text-spotify-text text-sm">
        {showReviewMode 
          ? 'Rate your knowledge of each sentence to optimize your learning with spaced repetition.'
          : selectedDate 
            ? `Testing sentences added on ${format(selectedDate, 'PP')}.`
            : 'Test your knowledge by translating the sentence before revealing the answer.'}
      </p>
    </div>
  );
};

export default QuizInfo;
