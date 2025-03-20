
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/context/providers/ThemeProvider';
import { CheckCircle2 } from 'lucide-react';

interface ProgressTrackerProps {
  totalSentences: number;
  masteredCount: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ totalSentences, masteredCount }) => {
  const { isDarkMode } = useTheme();
  
  const masteredPercentage = totalSentences > 0 ? Math.round((masteredCount / totalSentences) * 100) : 0;
  
  return (
    <div className={`rounded-lg p-4 animate-fade-in ${isDarkMode ? 'bg-spotify-light bg-opacity-30' : 'bg-spotify-light bg-opacity-10'}`}>
      <h3 className="font-semibold flex items-center gap-2 mb-3">
        <CheckCircle2 size={20} className="text-spotify-orange" />
        Mastery Progress
      </h3>
      
      <div className="space-y-4">
        {/* Mastery Progress Bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Mastered Sentences</span>
            <span className="text-sm font-medium">{masteredPercentage}%</span>
          </div>
          <Progress value={masteredPercentage} className="h-2" />
        </div>
        
        {/* Mastered Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle2 size={16} className="text-spotify-orange" />
            Mastered
          </span>
          <span>{masteredCount} / {totalSentences}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
