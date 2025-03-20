
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface ReviewEmptyStateProps {
  sentences: any[];
  selectedDate: Date | undefined;
  clearDateFilter: () => void;
}

const ReviewEmptyState: React.FC<ReviewEmptyStateProps> = ({ 
  sentences, 
  selectedDate, 
  clearDateFilter 
}) => {
  return (
    <div className="text-center py-8 glass-card rounded-xl animate-fade-in">
      {sentences.length === 0 ? (
        <>
          <h3 className="text-xl font-semibold mb-4">No Sentences Yet</h3>
          <p className="text-spotify-text">
            Add some sentences to start reviewing!
          </p>
        </>
      ) : selectedDate ? (
        <>
          <h3 className="text-xl font-semibold mb-4">No Results Found</h3>
          <p className="text-spotify-text mb-4">
            No sentences found for {format(selectedDate, 'PP')}
          </p>
          <Button onClick={clearDateFilter} className="spotify-button">
            Clear Date Filter
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-4">No Results Found</h3>
          <p className="text-spotify-text">
            No sentences match your current filters
          </p>
        </>
      )}
    </div>
  );
};

export default ReviewEmptyState;
