
import React from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle2, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Sentence } from '@/context/types/sentence.types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSentences } from '@/context/SentencesContext';

interface QuizNavigationProps {
  currentIndex: number;
  totalSentences: number;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
  currentSentence: Sentence;
  onToggleMastered: (id: string, mastered: boolean) => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentIndex,
  totalSentences,
  loading,
  onPrev,
  onNext,
  currentSentence,
  onToggleMastered
}) => {
  const { toggleFavorite } = useSentences();

  const handleToggleMastered = () => {
    onToggleMastered(currentSentence.id, !currentSentence.mastered);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(currentSentence.id, !currentSentence.favorite);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-spotify-text text-sm">
        {`${currentIndex + 1} of ${totalSentences}`}
      </span>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Switch 
                    id={`mastered-${currentSentence.id}`}
                    checked={currentSentence.mastered}
                    onCheckedChange={handleToggleMastered}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <label 
                    htmlFor={`mastered-${currentSentence.id}`}
                    className="text-xs text-spotify-text cursor-pointer flex items-center"
                  >
                    {currentSentence.mastered && <CheckCircle2 size={12} className="mr-1 text-green-500" />}
                    Mastered
                  </label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark as mastered to track your progress</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Switch 
                    id={`favorite-${currentSentence.id}`}
                    checked={currentSentence.favorite}
                    onCheckedChange={handleToggleFavorite}
                    className="data-[state=checked]:bg-yellow-500"
                  />
                  <label 
                    htmlFor={`favorite-${currentSentence.id}`}
                    className="text-xs text-spotify-text cursor-pointer flex items-center"
                  >
                    {currentSentence.favorite && <Star size={12} className="mr-1 text-yellow-500" fill="currentColor" />}
                    Favorite
                  </label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to favorites for quick access</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            disabled={loading}
            className="p-2 rounded-full bg-spotify-light hover:bg-opacity-70 transition-all duration-200 flex items-center gap-1"
            aria-label="Previous sentence"
            title="Previous sentence (← left arrow)"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={onNext}
            disabled={loading}
            className="p-2 rounded-full bg-spotify-light hover:bg-opacity-70 transition-all duration-200 flex items-center gap-1"
            aria-label="Next sentence"
            title="Next sentence (→ right arrow)"
          >
            {loading ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <ArrowRight size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;
