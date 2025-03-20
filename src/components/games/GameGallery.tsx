
import React from 'react';
import { Brain, Languages, Layout, BookOpen, DollarSign, Puzzle, Keyboard, School, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/hooks/useGameContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const games = [
  {
    id: 'quiz',
    name: 'Quiz',
    description: 'Test your knowledge of Arabic vocabulary',
    icon: <Brain size={24} />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'matching',
    name: 'Sentence Matching',
    description: 'Match Arabic with English translations',
    icon: <Languages size={24} />,
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'memory',
    name: 'Memory Cards',
    description: 'Find matching pairs of cards',
    icon: <Layout size={24} />,
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'scramble',
    name: 'Sentence Scramble',
    description: 'Rearrange words to form Arabic sentences',
    icon: <BookOpen size={24} />,
    color: 'from-violet-500 to-fuchsia-600'
  },
  {
    id: 'auction',
    name: 'Sentence Auction',
    description: 'Bid on correct Arabic sentences',
    icon: <DollarSign size={24} />,
    color: 'from-fuchsia-500 to-pink-600'
  },
  {
    id: 'word-puzzle',
    name: 'Word Puzzle',
    description: 'Unscramble Arabic words',
    icon: <Puzzle size={24} />,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'roleplay',
    name: 'Role-Play Simulator',
    description: 'Practice real conversations in MSA',
    icon: <Keyboard size={24} />,
    color: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'amiyya-roleplay',
    name: 'Amiyya Roleplay',
    description: 'Practice Egyptian Arabic conversations',
    icon: <School size={24} />,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'fill-in-blank',
    name: 'Fill in the Blank',
    description: 'Complete sentences with missing words',
    icon: <Edit size={24} />,
    color: 'from-green-500 to-emerald-600'
  }
];

interface GameGalleryProps {
  isScreensaver?: boolean;
}

const GameGallery: React.FC<GameGalleryProps> = ({ isScreensaver = false }) => {
  const { setSelectedGame, selectedGame } = useGameContext();
  const isMobile = useIsMobile();
  
  const handleGameSelection = (gameId: string) => {
    console.log("Game selected:", gameId);
    setSelectedGame(gameId);
  };

  // If in screensaver mode, show more compact layout
  if (isScreensaver) {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {games.map((game) => (
          <Link to="/games" key={game.id}>
            <Button
              variant="outline"
              size="sm"
              className={`h-auto py-1.5 px-2 w-full flex flex-col items-center justify-center bg-gradient-to-br ${game.color} shadow-lg shadow-${game.id === 'quiz' ? 'blue' : game.id === 'matching' ? 'indigo' : game.id === 'memory' ? 'purple' : game.id === 'scramble' ? 'violet' : game.id === 'auction' ? 'fuchsia' : game.id === 'word-puzzle' ? 'cyan' : game.id === 'roleplay' ? 'teal' : game.id === 'amiyya-roleplay' ? 'emerald' : 'green'}-500/30 border-0 text-white hover:opacity-90 transition-opacity text-xs border border-white/10`}
              onClick={() => handleGameSelection(game.id)}
            >
              <div className="mb-0.5">
                {React.cloneElement(game.icon, { size: 16 })}
              </div>
              <div className="font-medium text-[10px] truncate w-full text-center">{game.name}</div>
            </Button>
          </Link>
        ))}
      </div>
    );
  }
  
  // Standard layout - more vibrant with enhanced shadows
  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Games</h2>
      <div className={`grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'} gap-2 md:gap-3`}>
        {games.map((game) => (
          <Button
            key={game.id}
            variant={selectedGame === game.id ? "default" : "outline"}
            className={`h-auto py-2 px-3 flex flex-col items-center justify-center 
              ${selectedGame === game.id 
                ? `bg-gradient-to-r ${game.color} text-white shadow-xl shadow-${game.id === 'quiz' ? 'blue' : game.id === 'matching' ? 'indigo' : game.id === 'memory' ? 'purple' : game.id === 'scramble' ? 'violet' : game.id === 'auction' ? 'fuchsia' : game.id === 'word-puzzle' ? 'cyan' : game.id === 'roleplay' ? 'teal' : game.id === 'amiyya-roleplay' ? 'emerald' : 'green'}-500/40 border border-white/10` 
                : `bg-gradient-to-br from-slate-800/70 via-indigo-900/70 to-purple-900/70 text-white border border-white/10 shadow-lg shadow-purple-500/20 hover:from-slate-700/70 hover:via-indigo-800/70 hover:to-purple-800/70`
              }`}
            onClick={() => handleGameSelection(game.id)}
          >
            <div className="mb-1">
              {game.icon}
            </div>
            <div className="text-center">
              <div className="font-semibold text-xs md:text-sm mb-0.5">{game.name}</div>
              <div className="text-xs opacity-80 line-clamp-2 text-xs">{game.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GameGallery;
