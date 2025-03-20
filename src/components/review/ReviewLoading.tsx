
import React from 'react';
import { Loader2 } from 'lucide-react';

const ReviewLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12 glass-card rounded-xl animate-fade-in">
      <Loader2 size={30} className="animate-spin text-spotify-green" />
      <span className="ml-2 text-spotify-text">Loading sentences...</span>
    </div>
  );
};

export default ReviewLoading;
