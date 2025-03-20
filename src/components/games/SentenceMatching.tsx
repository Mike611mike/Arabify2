
import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import GameBase from './GameBase';
import { shuffle } from '@/utils/arrayUtils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

interface MatchItem {
  id: string;
  text: string;
  type: 'arabic' | 'english';
}

const SentenceMatching: React.FC = () => {
  const { sentences } = useSentences();
  const [matchItems, setMatchItems] = useState<MatchItem[]>([]);
  const [selectedArabic, setSelectedArabic] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [correctMatches, setCorrectMatches] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  
  // Create pairs of Arabic and English sentences
  useEffect(() => {
    if (sentences.length > 0) {
      const getRandomSentences = () => {
        // Use up to 6 sentences for the game
        const sentencesToUse = shuffle([...sentences]).slice(0, 6);
        setMaxScore(sentencesToUse.length);
        
        // Create Arabic and English items
        const arabicItems = sentencesToUse.map(s => ({
          id: s.id,
          text: s.arabic,
          type: 'arabic' as const
        }));
        
        const englishItems = sentencesToUse.map(s => ({
          id: s.id,
          text: s.english,
          type: 'english' as const
        }));
        
        // Shuffle them separately and combine
        setMatchItems(shuffle([...shuffle(arabicItems), ...shuffle(englishItems)]));
      };
      
      getRandomSentences();
    }
  }, [sentences]);
  
  const handleSelect = (id: string, type: 'arabic' | 'english') => {
    // Don't allow selection of already matched items
    if (correctMatches.has(id)) return;
    
    if (type === 'arabic') {
      setSelectedArabic(id);
    } else {
      setSelectedEnglish(id);
    }
  };
  
  // Check for matches
  useEffect(() => {
    if (selectedArabic && selectedEnglish) {
      // Check if they match
      if (selectedArabic === selectedEnglish) {
        // Correct match
        setCorrectMatches(prev => new Set([...prev, selectedArabic]));
        setScore(prev => prev + 1);
        toast.success('Correct match!');
      } else {
        // Wrong match
        toast.error('Try again!');
      }
      
      // Reset selections after a delay
      setTimeout(() => {
        setSelectedArabic(null);
        setSelectedEnglish(null);
      }, 1000);
    }
  }, [selectedArabic, selectedEnglish]);
  
  // Check if game is complete
  useEffect(() => {
    if (maxScore > 0 && correctMatches.size === maxScore) {
      setIsGameComplete(true);
      toast.success('Game complete! Well done!');
    }
  }, [correctMatches.size, maxScore]);
  
  const resetGame = () => {
    setSelectedArabic(null);
    setSelectedEnglish(null);
    setCorrectMatches(new Set());
    setScore(0);
    setIsGameComplete(false);
    
    // Reload with new sentences
    if (sentences.length > 0) {
      const sentencesToUse = shuffle([...sentences]).slice(0, 6);
      setMaxScore(sentencesToUse.length);
      
      const arabicItems = sentencesToUse.map(s => ({
        id: s.id,
        text: s.arabic,
        type: 'arabic' as const
      }));
      
      const englishItems = sentencesToUse.map(s => ({
        id: s.id,
        text: s.english,
        type: 'english' as const
      }));
      
      setMatchItems(shuffle([...shuffle(arabicItems), ...shuffle(englishItems)]));
    }
  };
  
  return (
    <GameBase 
      title="Sentence Matching" 
      description="Match Arabic sentences with their English translations" 
      onRestart={resetGame}
      showScore={true}
      score={score}
      maxScore={maxScore}
    >
      {matchItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {matchItems.map((item) => (
            <Button
              key={`${item.id}-${item.type}`}
              variant={
                (item.type === 'arabic' && selectedArabic === item.id) || 
                (item.type === 'english' && selectedEnglish === item.id)
                  ? 'default'
                  : correctMatches.has(item.id)
                    ? 'outline'
                    : 'secondary'
              }
              className={`h-auto min-h-16 p-3 justify-start items-start text-left overflow-auto ${
                correctMatches.has(item.id) 
                  ? 'bg-green-500/20 text-green-600 border-green-500 cursor-default'
                  : ''
              } ${
                item.type === 'arabic' ? 'font-arabic text-lg' : ''
              }`}
              disabled={correctMatches.has(item.id)}
              onClick={() => handleSelect(item.id, item.type)}
            >
              <div className="line-clamp-4 break-words w-full">
                {item.text}
              </div>
              {correctMatches.has(item.id) && (
                <Check size={16} className="absolute top-2 right-2 text-green-500" />
              )}
            </Button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">Loading sentences...</div>
      )}
      
      {isGameComplete && (
        <div className="mt-4 p-4 rounded-lg bg-spotify-green/20 text-center">
          <h3 className="text-lg font-medium mb-2">Game Complete!</h3>
          <p>You've matched all sentences correctly.</p>
          <Button onClick={resetGame} className="mt-3">
            Play Again
          </Button>
        </div>
      )}
    </GameBase>
  );
};

export default SentenceMatching;
