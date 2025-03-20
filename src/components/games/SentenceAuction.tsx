
import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import GameBase from './GameBase';
import { Button } from '@/components/ui/button';
import { shuffle } from '@/utils/arrayUtils';
import { Check, X, BadgeDollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

interface AuctionItem {
  id: string;
  arabic: string;
  english: string;
  spokenArabic: string;
  isCorrect: boolean;
  yourBid: number | null;
  auctionValue: number;
}

const SentenceAuction: React.FC = () => {
  const { sentences } = useSentences();
  const [gameData, setGameData] = useState<AuctionItem[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [coins, setCoins] = useState(1000);
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
    // Create 10 auction items with a mix of correct and incorrect sentences
    const correctSentences = shuffle([...sentences]).slice(0, 5);
    
    // Create incorrect versions by mixing up parts
    const incorrectSentences = correctSentences.map(sentence => {
      // Find a different sentence to mix with
      const otherSentence = sentences.find(s => s.id !== sentence.id) || sentences[0];
      
      // Create an incorrect version (e.g., mix arabic with wrong english)
      return {
        id: `incorrect-${sentence.id}`,
        arabic: sentence.arabic,
        english: otherSentence.english, // Wrong english translation
        spokenArabic: sentence.spokenArabic,
        isCorrect: false,
        yourBid: null,
        auctionValue: Math.floor(Math.random() * 300) + 100 // Random value between 100-400
      };
    });
    
    // Prepare correct sentences
    const correctItems = correctSentences.map(sentence => ({
      id: sentence.id,
      arabic: sentence.arabic,
      english: sentence.english,
      spokenArabic: sentence.spokenArabic,
      isCorrect: true,
      yourBid: null,
      auctionValue: Math.floor(Math.random() * 300) + 100 // Random value between 100-400
    }));
    
    // Combine and shuffle
    const allItems = shuffle([...correctItems, ...incorrectSentences]);
    setGameData(allItems);
    setMaxScore(allItems.length);
    setCurrentRound(0);
    setCoins(1000);
    setScore(0);
    setGameComplete(false);
  };
  
  const placeBid = (bidAmount: number) => {
    if (currentRound >= gameData.length) return;
    
    // Check if player has enough coins
    if (bidAmount > coins) {
      toast.error("You don't have enough coins!");
      return;
    }
    
    // Place the bid
    const updatedData = [...gameData];
    const currentItem = updatedData[currentRound];
    currentItem.yourBid = bidAmount;
    setGameData(updatedData);
    
    // Update coins
    setCoins(prev => prev - bidAmount);
    
    // Check if bid was correct (bid on correct sentence or didn't bid on incorrect)
    const bidCorrectly = (bidAmount > 0 && currentItem.isCorrect) || 
                         (bidAmount === 0 && !currentItem.isCorrect);
    
    // Update score
    if (bidCorrectly) {
      setScore(prev => prev + 1);
      
      if (bidAmount > 0) {
        // If they bid correctly on a correct sentence, they win the auction value
        setCoins(prev => prev + currentItem.auctionValue);
        toast.success(`Correct bid! You won ${currentItem.auctionValue} coins.`);
      } else {
        // If they correctly avoided an incorrect sentence
        toast.success("Good call passing on that one!");
      }
    } else {
      if (bidAmount > 0) {
        // They bid on an incorrect sentence
        toast.error("That sentence wasn't correct! You lost your bid.");
      } else {
        // They didn't bid on a correct sentence
        toast.error("That was a correct sentence! You missed out.");
      }
    }
    
    // Move to next round
    setTimeout(() => {
      if (currentRound < gameData.length - 1) {
        setCurrentRound(prev => prev + 1);
      } else {
        setGameComplete(true);
        toast.success("Auction complete!");
      }
    }, 2000);
  };
  
  const resetGame = () => {
    startGame();
  };
  
  if (gameData.length === 0) {
    return (
      <GameBase 
        title="Sentence Auction" 
        description="Bid on correct Arabic sentences to win coins"
      >
        <div className="text-center py-8">Loading auction items...</div>
      </GameBase>
    );
  }
  
  const currentItem = gameData[currentRound];
  
  return (
    <GameBase 
      title="Sentence Auction" 
      description="Bid on correct Arabic sentences to win coins" 
      onRestart={resetGame}
      showScore={true}
      score={score}
      maxScore={maxScore}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BadgeDollarSign size={18} className="mr-2 text-yellow-500" />
            <span className="font-medium">{coins} Coins</span>
          </div>
          <div className="text-sm text-spotify-text">
            Round {currentRound + 1} of {gameData.length}
          </div>
        </div>
        
        <div className="progress-bar w-full h-2 bg-spotify-light bg-opacity-30 rounded-full mb-4">
          <div 
            className="h-full bg-spotify-green rounded-full transition-all duration-300"
            style={{ width: `${(currentRound / gameData.length) * 100}%` }}
          ></div>
        </div>
        
        {!gameComplete && (
          <div className="glass-card p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium mb-4 text-center">Current Auction</h3>
            
            <div className="mb-6">
              <p className="text-xl font-arabic text-center mb-2">{currentItem.arabic}</p>
              <p className="text-spotify-text text-center">{currentItem.spokenArabic}</p>
              <p className="mt-3 text-center">{currentItem.english}</p>
            </div>
            
            <div className="p-3 rounded-lg bg-spotify-light bg-opacity-20 flex justify-between items-center mb-4">
              <span>Value:</span>
              <span className="font-medium">{currentItem.auctionValue} coins</span>
            </div>
            
            {currentItem.yourBid === null ? (
              <div className="space-y-3">
                <p className="text-center text-sm mb-2">Is this sentence correct? Place your bid!</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => placeBid(0)}
                    className="h-auto py-3"
                  >
                    <X size={18} className="mr-2 text-red-500" />
                    Pass (Incorrect)
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => placeBid(100)}
                    className="h-auto py-3"
                  >
                    <TrendingUp size={18} className="mr-2 text-yellow-500" />
                    Bid 100 Coins
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => placeBid(200)}
                    className="h-auto py-3"
                  >
                    <TrendingUp size={18} className="mr-2 text-yellow-500" />
                    Bid 200 Coins
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => placeBid(300)}
                    className="h-auto py-3"
                  >
                    <TrendingUp size={18} className="mr-2 text-yellow-500" />
                    Bid 300 Coins
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <p>Your bid: {currentItem.yourBid > 0 ? `${currentItem.yourBid} coins` : "Pass"}</p>
                
                <div className={`p-3 rounded-lg ${
                  currentItem.isCorrect 
                    ? "bg-green-500 bg-opacity-20 text-green-600" 
                    : "bg-red-500 bg-opacity-20 text-red-600"
                }`}>
                  {currentItem.isCorrect ? (
                    <div className="flex items-center justify-center">
                      <Check size={18} className="mr-2" />
                      <span>Correct Sentence!</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <X size={18} className="mr-2" />
                      <span>Incorrect Sentence!</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {gameComplete && (
          <div className="p-4 rounded-lg bg-spotify-green/20 text-center">
            <h3 className="text-lg font-medium mb-2">Auction Complete!</h3>
            <p className="mb-2">Your final score: {score} out of {maxScore}</p>
            <p className="mb-4">Coins remaining: {coins}</p>
            
            <Button onClick={resetGame}>
              Start New Auction
            </Button>
          </div>
        )}
      </div>
    </GameBase>
  );
};

export default SentenceAuction;
