
import React from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/hooks/useAudio';

interface SentenceCardContentProps {
  id: string;
  arabic: string;
  spokenArabic: string;
  english: string;
  hideEnglish?: boolean;
}

const SentenceCardContent: React.FC<SentenceCardContentProps> = ({ 
  id,
  arabic, 
  spokenArabic, 
  english, 
  hideEnglish = false
}) => {
  const { isDarkMode } = useTheme();
  const { playAudio, isPlaying, isLoading } = useAudio();

  const handlePlayAudio = () => {
    // Always prioritize spokenArabic (Amiyya) for audio playback
    playAudio(arabic, spokenArabic, id);
  };

  return (
    <>
      <div className="mb-3">
        <div className="flex justify-between items-start mb-2">
          <div className={`arabic-text text-xl font-arabic font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {arabic}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 p-1 h-8 w-8 rounded-full" 
            onClick={handlePlayAudio}
            disabled={isLoading(id)}
            aria-label="Play audio"
          >
            {isLoading(id) ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isPlaying(id) ? (
              <Volume2 size={18} className="text-spotify-green animate-pulse" />
            ) : (
              <Volume2 size={18} />
            )}
          </Button>
        </div>
        <div className={`font-medium ${isDarkMode ? 'text-indigo-100' : 'text-slate-700'}`}>
          {spokenArabic}
        </div>
      </div>

      {!hideEnglish && (
        <div className={`mt-2 transition-all duration-300 animate-fade-in text-base ${isDarkMode ? 'text-slate-50' : 'text-slate-900'}`}>
          {english}
        </div>
      )}
    </>
  );
};

export default SentenceCardContent;
