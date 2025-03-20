
import React from 'react';
import { Button } from '../ui/button';
import { Brain } from 'lucide-react';
import { format } from 'date-fns';

interface EmptyStateProps {
  selectedDate: Date | undefined;
  clearDateFilter: () => void;
  showReviewMode?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  selectedDate, 
  clearDateFilter,
  showReviewMode = false
}) => {
  return (
    <div className="text-center py-8 glass-card rounded-xl p-6 animate-fade-in">
      {showReviewMode ? (
        <>
          <div className="flex justify-center mb-4">
            <Brain size={48} className="text-spotify-green opacity-50" />
          </div>
          <h3 className="text-xl font-semibold mb-4">No Sentences Due for Review</h3>
          <p className="text-spotify-text mb-6">
            Great job! You've reviewed all your sentences for now.
            Check back later or switch to regular quiz mode.
          </p>
        </>
      ) : selectedDate ? (
        <>
          <h3 className="text-xl font-semibold mb-4">No Sentences Found</h3>
          <p className="text-spotify-text mb-6">
            No sentences were added on the selected date.
          </p>
          <Button 
            onClick={clearDateFilter} 
            variant="outline"
            className="bg-spotify-light"
          >
            Clear Date Filter
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-4">No Matching Sentences</h3>
          <p className="text-spotify-text mb-6">
            Try adjusting your filters to find sentences.
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyState;
