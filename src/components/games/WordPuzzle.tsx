import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import { Puzzle, Check, HelpCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useGameContext } from '@/hooks/useGameContext';
import GameBase from './GameBase';

const WordPuzzle: React.FC = () => {
  const { sentences } = useSentences();
  const { setGameScore, setGameProgress, resetGame } = useGameContext();
  const [currentWord, setCurrentWord] = useState<string>('');
  const [scrambledWord, setScrambledWord] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hint, setHint] = useState<string>('');
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [gameSentences, setGameSentences] = useState<string[]>([]);
  
  // Initialize the game with sentences
  useEffect(() => {
    if (sentences.length > 0) {
      resetGame();
      prepareGameSentences();
    }
  }, [sentences]);
  
  // Extract Arabic words from sentences to use in the game
  const prepareGameSentences = () => {
    const wordsArray = sentences
      .filter(s => s.arabic && s.arabic.length > 3) // Only words longer than 3 chars
      .map(s => s.arabic.split(' '))
      .flat()
      .filter(word => word.length > 3) // Again filter for longer words
      .slice(0, 20); // Limit to 20 words for the game
    
    setGameSentences(wordsArray);
    selectNewWord(wordsArray);
  };
  
  // Select a new word and scramble it
  const selectNewWord = (words = gameSentences) => {
    if (words.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * words.length);
    const selected = words[randomIndex];
    
    setCurrentWord(selected);
    setScrambledWord(scrambleWord(selected));
    setUserAnswer('');
    setIsCorrect(null);
    setHint('');
  };
  
  // Scramble a word - ensure it's different from original
  const scrambleWord = (word: string): string => {
    let result = word;
    let attempts = 0;
    
    // Keep scrambling until we get a different order or hit max attempts
    while ((result === word) && attempts < 10) {
      const array = word.split('');
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      result = array.join('');
      attempts++;
    }
    
    return result;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userAnswer) {
      toast.error('Please enter your answer');
      return;
    }
    
    // Check if the answer is correct
    const correct = userAnswer.trim().toLowerCase() === currentWord.trim().toLowerCase();
    setIsCorrect(correct);
    
    if (correct) {
      // Calculate score based on word length and hints used
      const wordScore = currentWord.length - hintsUsed;
      const newScore = score + Math.max(1, wordScore);
      
      setScore(newScore);
      setGameScore(newScore);
      toast.success('Correct! Great job!');
      
      // Move to next round
      setTimeout(() => {
        setRound(prev => prev + 1);
        setHintsUsed(0);
        selectNewWord();
        
        // Update game progress (assuming 10 rounds total)
        setGameProgress(Math.min(100, (round * 10)));
      }, 1500);
    } else {
      toast.error('Not quite right, try again!');
    }
  };
  
  // Provide a hint
  const getHint = () => {
    if (hintsUsed >= Math.floor(currentWord.length / 2)) {
      toast.info('No more hints available for this word!');
      return;
    }
    
    const hintsUsedBefore = hintsUsed;
    setHintsUsed(prev => prev + 1);
    
    // Reveal a character from the word that isn't already in the hint
    const revealedIndices = hint.split('').map((char, index) => {
      return char !== '_' ? index : -1;
    }).filter(index => index !== -1);
    
    // Find indices that haven't been revealed yet
    const hiddenIndices = currentWord.split('').map((_, index) => {
      return revealedIndices.includes(index) ? -1 : index;
    }).filter(index => index !== -1);
    
    // If all are revealed, don't provide more hints
    if (hiddenIndices.length === 0) {
      toast.info('All characters are already revealed!');
      setHintsUsed(hintsUsedBefore); // Reset hint count
      return;
    }
    
    // Choose a random index to reveal
    const randomHiddenIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
    
    // Create the new hint with the revealed character
    const newHint = currentWord.split('').map((char, index) => {
      if (index === randomHiddenIndex || (hint && hint[index] !== '_')) {
        return char;
      }
      return '_';
    }).join(' ');
    
    setHint(newHint);
    toast.info('Hint provided!');
  };
  
  // Reset the current round
  const handleReset = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setHint('');
    setHintsUsed(0);
    selectNewWord();
  };
  
  // Skip the current word
  const handleSkip = () => {
    toast.info('Skipped this word');
    setRound(prev => prev + 1);
    selectNewWord();
    setHintsUsed(0);
    setGameProgress(Math.min(100, (round * 10)));
  };
  
  return (
    <GameBase 
      title="Word Puzzle" 
      icon={<Puzzle />}
      score={score}
      maxScore={100}
      roundInfo={`Round ${round}`}
    >
      {currentWord ? (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-4 text-center">
            <h3 className="font-medium mb-2">Unscramble the Arabic Word</h3>
            <div className="text-2xl font-bold tracking-wider mb-4 text-spotify-text">
              {scrambledWord}
            </div>
            
            {hint && (
              <div className="text-sm bg-spotify-light bg-opacity-40 p-2 rounded-lg mb-3">
                <span className="font-medium">Hint: </span> 
                <span className="tracking-wider">{hint}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer"
                className={`w-full px-4 py-2 rounded border ${
                  isCorrect === null ? 'border-gray-300 dark:border-gray-600' :
                  isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900' :
                  'border-red-500 bg-red-50 dark:bg-red-900'
                }`}
                dir="rtl"
              />
              
              <div className="flex flex-wrap justify-center gap-2">
                <Button type="submit" className="min-w-[100px]">
                  <Check size={16} className="mr-1" />
                  Check
                </Button>
                
                <Button type="button" variant="outline" onClick={getHint}>
                  <HelpCircle size={16} className="mr-1" />
                  Hint {hintsUsed > 0 ? `(${hintsUsed})` : ''}
                </Button>
                
                <Button type="button" variant="ghost" onClick={handleReset}>
                  <RefreshCw size={16} className="mr-1" />
                  Reset
                </Button>
                
                <Button type="button" variant="ghost" onClick={handleSkip}>
                  Skip
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Loading word puzzle...</p>
        </div>
      )}
    </GameBase>
  );
};

export default WordPuzzle;
