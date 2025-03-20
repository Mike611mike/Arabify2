
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

interface DifficultyFiltersProps {
  selectedDifficulty: DifficultyLevel;
  onChange: (difficulty: DifficultyLevel) => void;
  className?: string;
}

const DifficultyFilters: React.FC<DifficultyFiltersProps> = ({
  selectedDifficulty,
  onChange,
  className
}) => {
  const difficulties: { value: DifficultyLevel; label: string; icon: React.ReactNode; color: string }[] = [
    { 
      value: 'all', 
      label: 'All', 
      icon: null, 
      color: 'bg-spotify-light text-spotify-text'
    },
    { 
      value: 'beginner', 
      label: 'Beginner', 
      icon: <Sparkles size={16} />, 
      color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    },
    { 
      value: 'intermediate', 
      label: 'Intermediate', 
      icon: <Zap size={16} />, 
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    },
    { 
      value: 'advanced', 
      label: 'Advanced', 
      icon: <Flame size={16} />, 
      color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    }
  ];
  
  return (
    <div className={cn("relative flex p-1 space-x-1 bg-spotify-light bg-opacity-30 rounded-lg", className)}>
      {difficulties.map((difficulty) => (
        <button
          key={difficulty.value}
          onClick={() => onChange(difficulty.value)}
          className={cn(
            "relative flex items-center justify-center text-sm font-medium transition-all rounded-md py-1.5 flex-1",
            selectedDifficulty !== difficulty.value && "hover:bg-spotify-light hover:bg-opacity-40"
          )}
        >
          {selectedDifficulty === difficulty.value && (
            <motion.div
              layoutId="difficulty-indicator"
              className={cn("absolute inset-0 z-0 rounded-md", difficulty.color)}
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          
          <span className="relative z-10 flex items-center justify-center text-center px-2">
            {difficulty.icon && (
              <span className="mr-1">
                {difficulty.icon}
              </span>
            )}
            {difficulty.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default DifficultyFilters;
