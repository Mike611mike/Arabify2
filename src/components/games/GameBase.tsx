
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, RefreshCcw, Home } from 'lucide-react';
import { useGameContext } from '@/hooks/useGameContext';
import { useTheme } from '@/context/providers/ThemeProvider';

export interface GameBaseProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onRestart?: () => void;
  showScore?: boolean;
  score?: number;
  maxScore?: number;
  icon?: React.ReactNode;
  roundInfo?: string;
}

const GameBase: React.FC<GameBaseProps> = ({ 
  title, 
  description = "", 
  children, 
  onRestart, 
  showScore = false,
  score = 0,
  maxScore = 0,
  icon,
  roundInfo
}) => {
  const { setSelectedGame } = useGameContext();
  const { isDarkMode } = useTheme();
  
  return (
    <Card className={`glass-card animate-fade-in ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-800/80 via-indigo-900/60 to-purple-900/80 shadow-2xl shadow-purple-500/30 border border-white/10' 
        : 'bg-gradient-to-br from-white/90 via-indigo-50/90 to-purple-50/90 shadow-2xl shadow-purple-500/20 border border-purple-100/50'
    }`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {icon && <div>{icon}</div>}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
              {roundInfo && <div className="text-xs text-spotify-text">{roundInfo}</div>}
            </div>
          </div>
          {showScore && (
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isDarkMode 
                ? 'bg-gradient-to-r from-indigo-600/50 to-purple-600/50 text-spotify-green shadow-lg shadow-purple-500/30 border border-white/10' 
                : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-spotify-green shadow-md shadow-purple-500/20 border border-purple-200/50'
            }`}>
              <div className="flex items-center">
                <Trophy size={14} className="mr-1" />
                <span>{score} / {maxScore}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setSelectedGame('')}
          className={`shadow-lg ${isDarkMode ? 'shadow-indigo-500/20 border border-white/10 bg-indigo-900/30' : 'shadow-indigo-500/10 border border-indigo-200/50 bg-indigo-50/50'} hover:shadow-xl transition-shadow`}
        >
          <Home size={16} className="mr-1" />
          Games Menu
        </Button>
        {onRestart && (
          <Button 
            variant="outline"
            size="sm"
            onClick={onRestart}
            className={`shadow-lg ${isDarkMode ? 'shadow-purple-500/20 border border-white/10 bg-purple-900/30' : 'shadow-purple-500/10 border border-purple-200/50 bg-purple-50/50'} hover:shadow-xl transition-shadow`}
          >
            <RefreshCcw size={16} className="mr-1" />
            Restart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GameBase;
