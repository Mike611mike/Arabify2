
import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import GameBase from './GameBase';
import { shuffle } from '@/utils/arrayUtils';
import { toast } from 'sonner';
import { Volume2 } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

interface Card {
  id: string;
  sentenceId: string;
  text: string;
  type: 'arabic' | 'english';
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCardGame: React.FC = () => {
  const { sentences } = useSentences();
  const { playAudio } = useAudio();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Initialize the game
  useEffect(() => {
    if (sentences.length > 0) {
      startGame();
    }
  }, [sentences]);
  
  const startGame = () => {
    // Select a subset of sentences for the game (4 pairs = 8 cards)
    const gameSentences = shuffle([...sentences]).slice(0, 4);
    setMaxScore(gameSentences.length);
    
    // Create card pairs
    const cardPairs: Card[] = [];
    
    gameSentences.forEach((sentence) => {
      // Arabic card
      cardPairs.push({
        id: `arabic-${sentence.id}`,
        sentenceId: sentence.id,
        text: sentence.arabic,
        type: 'arabic',
        isFlipped: false,
        isMatched: false
      });
      
      // English card
      cardPairs.push({
        id: `english-${sentence.id}`,
        sentenceId: sentence.id,
        text: sentence.english,
        type: 'english',
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle the cards
    setCards(shuffle(cardPairs));
    setFlippedCards([]);
    setMatchedPairs(new Set());
    setMoves(0);
    setScore(0);
    setGameComplete(false);
  };
  
  const handleCardClick = (clickedCard: Card) => {
    // Ignore clicks on already flipped or matched cards
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    
    // Ignore if two cards are already flipped
    if (flippedCards.length === 2) return;
    
    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === clickedCard.id 
        ? { ...card, isFlipped: true } 
        : card
    );
    setCards(updatedCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);
    
    // If Arabic card is clicked, play the audio
    if (clickedCard.type === 'arabic') {
      const sentence = sentences.find(s => s.id === clickedCard.sentenceId);
      if (sentence) {
        playAudio(sentence.arabic, sentence.spokenArabic, sentence.id);
      }
    }
    
    // Check for a match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const firstCardId = newFlippedCards[0];
      const secondCardId = newFlippedCards[1];
      
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);
      
      if (firstCard && secondCard && firstCard.sentenceId === secondCard.sentenceId) {
        // Match found
        setTimeout(() => {
          // Mark as matched
          const updatedCards = cards.map(card => 
            card.sentenceId === firstCard.sentenceId 
              ? { ...card, isMatched: true } 
              : card
          );
          setCards(updatedCards);
          
          // Add to matched pairs
          setMatchedPairs(prev => new Set([...prev, firstCard.sentenceId]));
          
          // Increment score
          setScore(prev => prev + 1);
          
          // Reset flipped cards
          setFlippedCards([]);
          
          // Check if game is complete
          if (matchedPairs.size + 1 === maxScore) {
            setGameComplete(true);
            toast.success('Game complete! Well done!');
          } else {
            toast.success('Match found!');
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          // Flip cards back
          const updatedCards = cards.map(card => 
            flippedCards.includes(card.id) 
              ? { ...card, isFlipped: false } 
              : card
          );
          setCards(updatedCards);
          
          // Reset flipped cards
          setFlippedCards([]);
        }, 1500);
      }
    }
  };
  
  const resetGame = () => {
    startGame();
  };
  
  return (
    <GameBase 
      title="Memory Card Game" 
      description="Match Arabic sentences with their English translations" 
      onRestart={resetGame}
      showScore={true}
      score={score}
      maxScore={maxScore}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Moves: {moves}</span>
          <span className="text-sm">Pairs: {matchedPairs.size} / {maxScore}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {cards.map(card => (
            <div
              key={card.id}
              className={`rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 ${
                card.isFlipped 
                  ? 'scale-100 rotate-0' 
                  : 'scale-95 rotate-1'
              } ${
                card.isMatched
                  ? 'opacity-70'
                  : 'opacity-100'
              }`}
              style={{ perspective: '1000px' }}
              onClick={() => handleCardClick(card)}
            >
              <div 
                className={`w-full h-36 transform-style-preserve-3d transition-transform duration-500 ${
                  card.isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Card Back */}
                <div 
                  className={`absolute w-full h-full flex items-center justify-center bg-spotify-dark p-3 rounded-lg shadow ${
                    card.isFlipped ? 'hidden' : 'card-back flex'
                  }`}
                >
                  <span className="text-2xl font-bold">?</span>
                </div>
                
                {/* Card Front */}
                <div 
                  className={`absolute w-full h-full rotate-y-180 bg-spotify-light bg-opacity-30 p-3 rounded-lg shadow-lg flex flex-col items-center justify-center ${
                    card.isFlipped ? 'card-front' : 'hidden'
                  } ${
                    card.type === 'arabic' ? 'border-r-4 border-r-spotify-green' : 'border-l-4 border-l-spotify-green'
                  }`}
                >
                  <div className="w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-spotify-green">
                    <p className={`text-center break-words ${card.type === 'arabic' ? 'font-arabic text-base' : 'text-sm'}`}>
                      {card.text}
                    </p>
                  </div>
                  
                  {card.type === 'arabic' && (
                    <button 
                      className="absolute bottom-1 right-1 p-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        const sentence = sentences.find(s => s.id === card.sentenceId);
                        if (sentence) {
                          playAudio(sentence.arabic, sentence.spokenArabic, sentence.id);
                        }
                      }}
                    >
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {gameComplete && (
          <div className="mt-4 p-4 rounded-lg bg-spotify-green/20 text-center">
            <h3 className="text-lg font-medium mb-2">Game Complete!</h3>
            <p>You've matched all pairs in {moves} moves.</p>
            <button 
              className="mt-3 px-4 py-2 bg-spotify-green text-black rounded-lg font-medium"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </GameBase>
  );
};

export default MemoryCardGame;
