
import React from 'react';
import { useGameContext } from '@/hooks/useGameContext';
import SentenceMatching from './SentenceMatching';
import MemoryCardGame from './MemoryCardGame';
import SentenceScramble from './SentenceScramble';
import SentenceAuction from './SentenceAuction';
import WordPuzzle from './WordPuzzle';
import RolePlaySimulator from './RolePlaySimulator';
import AmiyyaRolePlay from './AmiyyaRolePlay';
import QuizGame from './QuizGame';
import FillInTheBlank from './FillInTheBlank';

const GameContent: React.FC = () => {
  const { selectedGame } = useGameContext();
  
  console.log("Current selected game:", selectedGame);
  
  // If no game is selected, show a message
  if (!selectedGame) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center">
        <h3 className="text-lg font-medium mb-2">Select a Game</h3>
        <p className="text-sm text-gray-400">Choose a game from the list to start playing</p>
      </div>
    );
  }
  
  // Render appropriate game based on selection
  switch(selectedGame) {
    case 'matching':
      return <SentenceMatching />;
    case 'memory':
      return <MemoryCardGame />;
    case 'scramble':
      return <SentenceScramble />;
    case 'auction':
      return <SentenceAuction />;
    case 'word-puzzle':
      return <WordPuzzle />;
    case 'roleplay':
      return <RolePlaySimulator />;
    case 'amiyya-roleplay':
      return <AmiyyaRolePlay />;
    case 'quiz':
      return <QuizGame />;
    case 'fill-in-blank':
      return <FillInTheBlank />;
    default:
      return <div>Game not found</div>;
  }
};

export default GameContent;
