
import React from 'react';
import { useTheme } from '@/context/providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-spotify-light' : 'bg-white shadow-md'}`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-slate-700" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
