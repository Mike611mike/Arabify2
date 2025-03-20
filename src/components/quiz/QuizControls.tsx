
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CheckCircle2, Clock, Star } from 'lucide-react';

interface QuizControlsProps {
  showStats: boolean;
  setShowStats: (show: boolean) => void;
  masterFilter: 'all' | 'mastered' | 'unmastered' | 'favorite';
  setMasterFilter: (filter: 'all' | 'mastered' | 'unmastered' | 'favorite') => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  clearDateFilter: () => void;
}

const QuizControls: React.FC<QuizControlsProps> = ({
  showStats,
  setShowStats,
  masterFilter,
  setMasterFilter,
  selectedDate,
  setSelectedDate,
  clearDateFilter,
}) => {
  return (
    <div className="space-y-4 glass-card rounded-xl p-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Quiz Mode</h3>
        
        <ToggleGroup
          type="single"
          value={showStats ? 'show' : 'hide'}
          onValueChange={(value) => {
            if (value) setShowStats(value === 'show');
          }}
          className="bg-spotify-light bg-opacity-30 p-1 rounded-lg"
        >
          <ToggleGroupItem value="show" className="text-xs px-2 data-[state=on]:bg-spotify-green data-[state=on]:text-white">
            Show Stats
          </ToggleGroupItem>
          <ToggleGroupItem value="hide" className="text-xs px-2 data-[state=on]:bg-spotify-green data-[state=on]:text-white">
            Hide Stats
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-spotify-text mb-1 block">Filter by Status</label>
          <ToggleGroup
            type="single"
            value={masterFilter}
            onValueChange={(value) => {
              if (value) setMasterFilter(value as 'all' | 'mastered' | 'unmastered' | 'favorite');
            }}
            className="bg-spotify-light bg-opacity-30 p-1 rounded-lg w-full"
          >
            <ToggleGroupItem value="all" className="flex-1 text-xs data-[state=on]:bg-spotify-green data-[state=on]:text-white">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="mastered" className="flex-1 text-xs data-[state=on]:bg-spotify-green data-[state=on]:text-white">
              <CheckCircle2 size={14} className="mr-1" />
              Mastered
            </ToggleGroupItem>
            <ToggleGroupItem value="unmastered" className="flex-1 text-xs data-[state=on]:bg-spotify-green data-[state=on]:text-white">
              <Clock size={14} className="mr-1" />
              Learning
            </ToggleGroupItem>
            <ToggleGroupItem value="favorite" className="flex-1 text-xs data-[state=on]:bg-spotify-orange data-[state=on]:text-white">
              <Star size={14} className="mr-1" fill="currentColor" />
              Favorites
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default QuizControls;
