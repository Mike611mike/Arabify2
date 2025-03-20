
import React from 'react';
import { Trash2, Star } from 'lucide-react';
import { useSentences } from '@/context/SentencesContext';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/context/providers/ThemeProvider';

interface SentenceCardActionsProps {
  id: string;
  mastered: boolean;
  favorite: boolean;
  onToggleFavorite?: () => void;
  onToggleMastered?: () => void;
}

const SentenceCardActions: React.FC<SentenceCardActionsProps> = ({ 
  id, 
  mastered, 
  favorite,
  onToggleFavorite,
  onToggleMastered
}) => {
  const { removeSentence, toggleMastered, toggleFavorite } = useSentences();
  const { isDarkMode } = useTheme();

  const handleToggleMastered = () => {
    if (onToggleMastered) {
      onToggleMastered();
    } else {
      toggleMastered(id, !mastered);
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite();
    } else {
      toggleFavorite(id, !favorite);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 pt-2 border-t border-spotify-light">
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Switch 
                  id={`mastered-${id}`}
                  checked={mastered}
                  onCheckedChange={handleToggleMastered}
                  className="data-[state=checked]:bg-green-500"
                />
                <label 
                  htmlFor={`mastered-${id}`}
                  className={`text-sm cursor-pointer ${isDarkMode ? 'text-spotify-text' : 'text-gray-600'}`}
                >
                  Mastered
                </label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as mastered when you know this well</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Switch 
                  id={`favorite-${id}`}
                  checked={favorite}
                  onCheckedChange={handleToggleFavorite}
                  className="data-[state=checked]:bg-yellow-500"
                />
                <label 
                  htmlFor={`favorite-${id}`}
                  className={`text-sm flex items-center ${isDarkMode ? 'text-spotify-text' : 'text-gray-600'}`}
                >
                  {favorite && <Star size={12} className="mr-1 text-yellow-500" fill="currentColor" />}
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
      
      <button
        onClick={() => removeSentence(id)}
        className={`transition-colors duration-200 ${isDarkMode ? 'text-spotify-text hover:text-red-500' : 'text-gray-600 hover:text-red-500'}`}
        aria-label="Delete sentence"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default SentenceCardActions;
