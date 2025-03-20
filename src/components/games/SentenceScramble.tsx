
import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import GameBase from './GameBase';
import { shuffle } from '@/utils/arrayUtils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, RefreshCcw, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SentenceScramble: React.FC = () => {
  const { sentences } = useSentences();
  const [gameData, setGameData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  
  // Prepare game data
  useEffect(() => {
    if (sentences.length > 0) {
      prepareGameData();
    }
  }, [sentences]);
  
  const prepareGameData = () => {
    // Choose up to 5 sentences for the game
    const sentencesToUse = shuffle([...sentences])
      .filter(s => s.arabic.split(/\s+/).length >= 3) // Ensure at least 3 words
      .slice(0, 5);
    
    setMaxScore(sentencesToUse.length);
    
    // Process each sentence for the game
    const gameItems = sentencesToUse.map(sentence => {
      const arabicWords = sentence.arabic.split(/\s+/);
      
      return {
        id: sentence.id,
        originalSentence: sentence.arabic,
        words: arabicWords,
        english: sentence.english
      };
    });
    
    setGameData(gameItems);
    if (gameItems.length > 0) {
      // Set the first scrambled sentence
      setScrambledWords(shuffle([...gameItems[0].words]));
      setSelectedWords([]);
    }
  };
  
  // Check if the sentence is correctly formed
  useEffect(() => {
    if (selectedWords.length > 0 && gameData.length > 0) {
      const currentSentence = gameData[currentIndex];
      
      // Check if all words are selected and in the correct order
      if (selectedWords.length === currentSentence.words.length) {
        const isCorrect = selectedWords.join(' ') === currentSentence.originalSentence;
        
        if (isCorrect) {
          setScore(prev => prev + 1);
          setIsComplete(true);
          toast.success('Correct!');
        }
      }
    }
  }, [selectedWords, gameData, currentIndex]);
  
  const selectWord = (word: string, index: number) => {
    // Add to selected words
    setSelectedWords(prev => [...prev, word]);
    
    // Remove from scrambled words
    setScrambledWords(prev => prev.filter((_, i) => i !== index));
  };
  
  const unselectWord = (index: number) => {
    // Get the word to remove
    const word = selectedWords[index];
    
    // Remove from selected words
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
    
    // Add back to scrambled words
    setScrambledWords(prev => [...prev, word]);
  };
  
  const nextSentence = () => {
    if (currentIndex < gameData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsComplete(false);
      
      // Reset with the next sentence
      const nextSentence = gameData[currentIndex + 1];
      setScrambledWords(shuffle([...nextSentence.words]));
      setSelectedWords([]);
    } else {
      // Game completed
      toast.success('Game completed!');
    }
  };
  
  const resetCurrentSentence = () => {
    const currentSentence = gameData[currentIndex];
    setScrambledWords(shuffle([...currentSentence.words]));
    setSelectedWords([]);
    setIsComplete(false);
  };
  
  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setIsComplete(false);
    prepareGameData();
  };
  
  if (gameData.length === 0) {
    return (
      <GameBase 
        title="Sentence Scramble" 
        description="Rearrange the words to form correct Arabic sentences"
      >
        <div className="text-center py-8">Loading sentences...</div>
      </GameBase>
    );
  }
  
  const currentSentence = gameData[currentIndex];
  
  return (
    <GameBase 
      title="Sentence Scramble" 
      description="Rearrange the words to form correct Arabic sentences" 
      onRestart={resetGame}
      showScore={true}
      score={score}
      maxScore={maxScore}
    >
      <div className="space-y-6">
        <div className="progress-bar w-full h-2 bg-spotify-light bg-opacity-30 rounded-full mb-4">
          <div 
            className="h-full bg-spotify-green rounded-full transition-all duration-300"
            style={{ width: `${(currentIndex / gameData.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="text-center mb-4">
          <span className="text-sm text-spotify-text">Sentence {currentIndex + 1} of {gameData.length}</span>
        </div>
        
        <div className="glass-card p-4 rounded-lg mb-4">
          <p className="text-sm text-spotify-text text-center mb-2">English translation:</p>
          <p className="text-base text-center">
            {currentSentence.english}
          </p>
        </div>
        
        {/* Selected words (being arranged) */}
        <div className="min-h-16 p-4 bg-spotify-light bg-opacity-20 rounded-lg flex flex-wrap gap-2 justify-center items-center">
          {selectedWords.length > 0 ? (
            selectedWords.map((word, index) => (
              <Badge
                key={`selected-${index}`}
                className="px-3 py-2 font-arabic text-base cursor-pointer"
                onClick={() => !isComplete && unselectWord(index)}
              >
                {word}
              </Badge>
            ))
          ) : (
            <span className="text-spotify-text">Select words to form the sentence</span>
          )}
        </div>
        
        {/* Available scrambled words */}
        <div className="min-h-20 flex flex-wrap gap-2 justify-center">
          {scrambledWords.map((word, index) => (
            <Button
              key={`scrambled-${index}`}
              variant="outline"
              className="font-arabic text-base"
              onClick={() => selectWord(word, index)}
            >
              {word}
            </Button>
          ))}
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetCurrentSentence}
            disabled={isComplete || scrambledWords.length === currentSentence.words.length}
          >
            <RefreshCcw size={16} className="mr-1" />
            Reset
          </Button>
          
          {isComplete && (
            <Button 
              size="sm" 
              onClick={nextSentence}
              className="bg-spotify-green text-black hover:bg-spotify-green/90"
            >
              {currentIndex < gameData.length - 1 ? (
                <>
                  Next <ArrowRight size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Complete <Check size={16} className="ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
        
        {isComplete && currentIndex === gameData.length - 1 && (
          <div className="mt-6 p-4 rounded-lg bg-spotify-green/20 text-center">
            <h3 className="text-lg font-medium mb-2">Game Complete!</h3>
            <p>You've successfully unscrambled all sentences!</p>
            <p>Your score: {score} out of {maxScore}</p>
            <Button onClick={resetGame} className="mt-4">
              Play Again
            </Button>
          </div>
        )}
      </div>
    </GameBase>
  );
};

export default SentenceScramble;
