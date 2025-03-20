
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface GameContextType {
  selectedGame: string;
  setSelectedGame: (game: string) => void;
  gameScore: number;
  setGameScore: (score: number) => void;
  gameProgress: number;
  setGameProgress: (progress: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType>({
  selectedGame: '',
  setSelectedGame: () => {},
  gameScore: 0,
  setGameScore: () => {},
  gameProgress: 0,
  setGameProgress: () => {},
  resetGame: () => {}
});

export const GameProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameProgress, setGameProgress] = useState<number>(0);
  
  // Log when game selection changes
  useEffect(() => {
    if (selectedGame) {
      console.log(`Game context: selected game changed to ${selectedGame}`);
    }
  }, [selectedGame]);
  
  const resetGame = () => {
    setGameScore(0);
    setGameProgress(0);
  };
  
  return (
    <GameContext.Provider value={{ 
      selectedGame, 
      setSelectedGame,
      gameScore,
      setGameScore,
      gameProgress,
      setGameProgress,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
