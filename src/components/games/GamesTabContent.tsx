
import React from 'react';
import GameGallery from './GameGallery';
import GameContent from './GameContent';
import { useGameContext } from '@/hooks/useGameContext';
import { GameProvider } from '@/hooks/useGameContext';

const GamesTabContentInner: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="mb-4">
        <GameGallery />
      </div>
      <div className="mt-4 bg-spotify-dark/50 rounded-lg p-3 shadow-lg shadow-purple-500/10">
        <GameContent />
      </div>
    </div>
  );
};

// Wrap with GameProvider to ensure context is available
const GamesTabContent: React.FC = () => (
  <GameProvider>
    <GamesTabContentInner />
  </GameProvider>
);

export default GamesTabContent;
