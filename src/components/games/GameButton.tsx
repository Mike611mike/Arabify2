
import React from 'react';
import { useGameContext } from '@/hooks/useGameContext';

interface GameButtonProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  gameId: string;
}

const GameButton: React.FC<GameButtonProps> = ({ icon, name, description, gameId }) => {
  const { setSelectedGame } = useGameContext();
  
  return (
    <button 
      className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg p-4 text-left transition-all 
                hover:from-purple-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-purple-500/20
                focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
      onClick={() => setSelectedGame(gameId)}
    >
      <div className="flex items-center text-fuchsia-300 mb-2">
        <span className="mr-2 text-pink-300">
          {icon}
        </span>
        <span className="font-medium text-sm">{name}</span>
      </div>
      <p className="text-xs text-slate-200">{description}</p>
    </button>
  );
};

export default GameButton;
