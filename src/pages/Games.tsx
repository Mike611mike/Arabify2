
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameGallery from '@/components/games/GameGallery';
import GameContent from '@/components/games/GameContent';
import { useGameContext } from '@/hooks/useGameContext';
import { GameProvider } from '@/hooks/useGameContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Games = () => {
  const location = useLocation();
  const { setSelectedGame } = useGameContext();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check if a specific game is requested via URL query parameter
    const params = new URLSearchParams(location.search);
    const gameParam = params.get('game');
    
    if (gameParam) {
      console.log("Setting game from URL param:", gameParam);
      setSelectedGame(gameParam);
    }
  }, [location.search, setSelectedGame]);
  
  return (
    <div className="container mx-auto px-4 pt-4 md:pt-8 pb-24">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Games</h1>
      <div className={`${isMobile ? 'flex flex-col space-y-6' : 'grid md:grid-cols-2 gap-6'}`}>
        <div className="bg-gradient-to-br from-slate-800/30 to-indigo-900/30 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-2xl shadow-purple-500/20 border border-white/10">
          <GameGallery />
        </div>
        <div className="bg-gradient-to-br from-slate-800/30 to-indigo-900/30 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-2xl shadow-purple-500/20 border border-white/10">
          <GameContent />
        </div>
      </div>
    </div>
  );
};

// Export a wrapped version with the GameProvider
const GamesWithProvider = () => (
  <GameProvider>
    <Games />
  </GameProvider>
);

export default GamesWithProvider;
