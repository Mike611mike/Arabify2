
import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import GameBase from './GameBase';
import { shuffle } from '@/utils/arrayUtils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, CornerDownLeft } from 'lucide-react';

const FillInTheBlank: React.FC = () => {
  const { sentences } = useSentences();
  const [currentSentence, setCurrentSentence] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameData, setGameData] = useState<any[]>([]);
  const [wordOptions, setWordOptions] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
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
    const sentencesToUse = shuffle([...sentences]).slice(0, 5);
    setMaxScore(sentencesToUse.length);
    
    // Process each sentence to create a game challenge
    const gameItems = sentencesToUse.map(sentence => {
      // Split the sentence into words
      const arabicWords = sentence.arabic.split(/\s+/);
      
      // Choose a random word to remove (avoid first/last word for very short sentences)
      const wordsToExclude = arabicWords.length <= 3 ? [0] : [0, arabicWords.length - 1];
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * arabicWords.length);
      } while (wordsToExclude.includes(randomIndex));
      
      const removedWord = arabicWords[randomIndex];
      
      // Replace the word with a blank
      arabicWords[randomIndex] = '_____';
      
      // Create misleading options from other sentences
      const otherSentences = sentences.filter(s => s.id !== sentence.id);
      const otherWords = shuffle([...otherSentences])
        .slice(0, 3)
        .map(s => {
          const words = s.arabic.split(/\s+/);
          return words[Math.floor(Math.random() * words.length)];
        });
      
      return {
        id: sentence.id,
        fullSentence: sentence.arabic,
        sentenceWithBlank: arabicWords.join(' '),
        correctWord: removedWord,
        english: sentence.english,
        options: shuffle([removedWord, ...otherWords])
      };
    });
    
    setGameData(gameItems);
    if (gameItems.length > 0) {
      setCurrentSentence(gameItems[0]);
      setWordOptions(gameItems[0].options);
    }
  };
  
  const handleSelectWord = (word: string) => {
    setSelectedWord(word);
    
    // Check if correct
    const isWordCorrect = word === currentSentence.correctWord;
    setIsCorrect(isWordCorrect);
    
    if (isWordCorrect) {
      toast.success('Correct!');
      setScore(prev => prev + 1);
    } else {
      toast.error('Incorrect. Try again!');
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentIndex < gameData.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedWord(null);
        setIsCorrect(null);
      } else {
        // Game completed
        toast.success('Game completed!');
      }
    }, 2000);
  };
  
  // Update current sentence when index changes
  useEffect(() => {
    if (gameData.length > 0 && currentIndex < gameData.length) {
      setCurrentSentence(gameData[currentIndex]);
      setWordOptions(gameData[currentIndex].options);
      setSelectedWord(null);
      setIsCorrect(null);
    }
  }, [currentIndex, gameData]);
  
  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelectedWord(null);
    setIsCorrect(null);
    prepareGameData();
  };
  
  if (!currentSentence) {
    return (
      <GameBase 
        title="Fill-in-the-Blank" 
        description="Complete Arabic sentences by choosing the missing word"
      >
        <div className="text-center py-8">Loading sentences...</div>
      </GameBase>
    );
  }
  
  return (
    <GameBase 
      title="Fill-in-the-Blank" 
      description="Complete Arabic sentences by choosing the missing word" 
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
          <span className="text-sm text-spotify-text">Question {currentIndex + 1} of {gameData.length}</span>
        </div>
        
        <div className="glass-card p-4 rounded-lg mb-4">
          <p className="text-lg mb-3 text-center font-arabic">
            {currentSentence.sentenceWithBlank}
          </p>
          <p className="text-sm text-spotify-text text-center">
            {currentSentence.english}
          </p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium mb-2">Choose the missing word:</p>
          <div className="grid grid-cols-2 gap-3">
            {wordOptions.map((word, index) => (
              <Button
                key={index}
                variant={selectedWord === word 
                  ? (isCorrect ? "default" : "destructive") 
                  : "outline"
                }
                className={`h-auto py-3 font-arabic text-lg ${
                  selectedWord && word === currentSentence.correctWord 
                    ? "bg-green-500 text-white hover:bg-green-600" 
                    : ""
                }`}
                onClick={() => handleSelectWord(word)}
                disabled={selectedWord !== null}
              >
                {word}
                {selectedWord && word === currentSentence.correctWord && (
                  <Check className="ml-2" size={16} />
                )}
              </Button>
            ))}
          </div>
        </div>
        
        {currentIndex >= gameData.length - 1 && isCorrect !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-medium mb-2">Game Complete!</h3>
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

export default FillInTheBlank;
