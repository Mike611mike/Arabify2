
import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import GameBase from './GameBase';
import { Button } from '@/components/ui/button';
import { shuffle } from '@/utils/arrayUtils';
import { useAudio } from '@/hooks/useAudio';
import { MessageCircle, Volume2, Check, RefreshCcw, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

// Example dialogue templates
const dialogueTemplates = [
  {
    title: "At a Restaurant",
    expectedOrder: ["greeting", "askingForMenu", "ordering", "askingForBill", "thanking"],
    roles: ["Customer", "Waiter"]
  },
  {
    title: "Shopping",
    expectedOrder: ["greeting", "askingForItem", "askingForPrice", "bargaining", "paying"],
    roles: ["Customer", "Shopkeeper"]
  },
  {
    title: "Asking for Directions",
    expectedOrder: ["greeting", "askingForPlace", "responding", "thanking", "farewell"],
    roles: ["Tourist", "Local"]
  }
];

const DialogueBuilder: React.FC = () => {
  const { sentences } = useSentences();
  const { playAudio } = useAudio();
  const [dialogues, setDialogues] = useState<any[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<any>(null);
  const [availablePhrases, setAvailablePhrases] = useState<any[]>([]);
  const [selectedPhrases, setSelectedPhrases] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Initialize the game
  useEffect(() => {
    if (sentences.length > 0) {
      // For a real implementation, you would need dialogue-specific sentences
      // Here we'll use existing sentences and assign them dummy dialogue roles
      prepareDialogues();
    }
  }, [sentences]);
  
  const prepareDialogues = () => {
    // Randomly select a dialogue template
    const template = dialogueTemplates[Math.floor(Math.random() * dialogueTemplates.length)];
    setActiveTemplate(template);
    
    // In a real app, you'd have proper dialogue sentences
    // Here we'll simulate by using existing sentences and assigning them roles
    const shuffledSentences = shuffle([...sentences]).slice(0, 10);
    
    // Assign dialogue roles to sentences
    const dialoguePhrases = shuffledSentences.map((sentence, index) => {
      const phaseIndex = index % template.expectedOrder.length;
      const phase = template.expectedOrder[phaseIndex];
      const role = template.roles[index % 2];
      
      return {
        id: sentence.id,
        text: sentence.arabic,
        english: sentence.english,
        spokenArabic: sentence.spokenArabic,
        phase: phase,
        phaseIndex: phaseIndex,
        role: role
      };
    });
    
    // Sort by correct order initially for the expected solution
    const sortedDialogue = [...dialoguePhrases].sort((a, b) => a.phaseIndex - b.phaseIndex);
    
    // But we'll present them shuffled to the user
    setAvailablePhrases(shuffle(dialoguePhrases));
    setSelectedPhrases([]);
    setDialogues(sortedDialogue);
    setIsComplete(false);
    setScore(0);
  };
  
  const selectPhrase = (phrase: any, index: number) => {
    // Move from available to selected
    setSelectedPhrases([...selectedPhrases, phrase]);
    setAvailablePhrases(availablePhrases.filter((_, i) => i !== index));
    
    // Check if all phrases are selected
    if (selectedPhrases.length + 1 === dialogues.length) {
      checkDialogueOrder([...selectedPhrases, phrase]);
    }
  };
  
  const removePhrase = (index: number) => {
    // Move from selected back to available
    const phrase = selectedPhrases[index];
    setAvailablePhrases([...availablePhrases, phrase]);
    setSelectedPhrases(selectedPhrases.filter((_, i) => i !== index));
  };
  
  const checkDialogueOrder = (phrases: any[]) => {
    // Compare selected phrases with correct dialogue order
    let correctCount = 0;
    
    phrases.forEach((phrase, index) => {
      // For demo purposes, we'll simplify and just check if the phaseIndex matches position
      if (phrase.phaseIndex === index) {
        correctCount++;
      }
    });
    
    const accuracy = Math.round((correctCount / phrases.length) * 100);
    setScore(accuracy);
    setIsComplete(true);
    
    if (accuracy >= 80) {
      toast.success(`Great job! ${accuracy}% correct`);
    } else if (accuracy >= 50) {
      toast.info(`Not bad! ${accuracy}% correct`);
    } else {
      toast.error(`Try again! ${accuracy}% correct`);
    }
  };
  
  const resetGame = () => {
    prepareDialogues();
  };
  
  if (!activeTemplate) {
    return (
      <GameBase 
        title="Dialogue Builder" 
        description="Create logical conversations in Arabic"
      >
        <div className="text-center py-8">Loading dialogue phrases...</div>
      </GameBase>
    );
  }
  
  return (
    <GameBase 
      title="Dialogue Builder" 
      description="Create logical conversations in Arabic" 
      onRestart={resetGame}
    >
      <div className="space-y-6">
        <div className="glass-card p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <MessageCircle size={18} className="mr-2 text-spotify-green" />
            {activeTemplate.title}
          </h3>
          <p className="text-sm text-spotify-text">
            Arrange the phrases to create a logical dialogue between {activeTemplate.roles.join(' and ')}.
          </p>
        </div>
        
        {/* Selected phrases (dialogue being built) */}
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium flex items-center">
            <Check size={16} className="mr-2 text-spotify-green" />
            Your Dialogue
          </h4>
          
          <div className="min-h-32 p-4 rounded-lg border border-dashed border-spotify-light space-y-2">
            {selectedPhrases.length > 0 ? (
              selectedPhrases.map((phrase, index) => (
                <div 
                  key={`selected-${phrase.id}`}
                  className="p-3 rounded-lg bg-spotify-light bg-opacity-20 flex justify-between items-start"
                  onClick={() => !isComplete && removePhrase(index)}
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">
                      {phrase.role}:
                    </div>
                    <div className="text-base font-arabic">
                      {phrase.text}
                    </div>
                    <div className="text-xs text-spotify-text mt-1">
                      {phrase.english}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-8 w-8" 
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(phrase.text, phrase.spokenArabic, phrase.id);
                    }}
                  >
                    <Volume2 size={16} />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-spotify-text">
                Select phrases to build your dialogue
              </div>
            )}
          </div>
        </div>
        
        {/* Available phrases */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center">
            <ArrowUpDown size={16} className="mr-2 text-spotify-green" />
            Available Phrases
          </h4>
          
          <div className="space-y-2">
            {availablePhrases.length > 0 ? (
              availablePhrases.map((phrase, index) => (
                <div 
                  key={`available-${phrase.id}`}
                  className="p-3 rounded-lg bg-spotify-dark border border-spotify-light border-opacity-20 flex justify-between items-start cursor-pointer hover:bg-spotify-light hover:bg-opacity-10 transition-colors"
                  onClick={() => !isComplete && selectPhrase(phrase, index)}
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">
                      {phrase.role}:
                    </div>
                    <div className="text-base font-arabic">
                      {phrase.text}
                    </div>
                    <div className="text-xs text-spotify-text mt-1">
                      {phrase.english}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-8 w-8" 
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(phrase.text, phrase.spokenArabic, phrase.id);
                    }}
                  >
                    <Volume2 size={16} />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-spotify-text">
                No more phrases available
              </div>
            )}
          </div>
        </div>
        
        {isComplete && (
          <div className="mt-6 p-4 rounded-lg bg-spotify-green/20 text-center">
            <h3 className="text-lg font-medium mb-2">Dialogue Complete!</h3>
            <p>Your accuracy: {score}%</p>
            <div className="flex justify-center mt-4">
              <Button 
                onClick={resetGame} 
                className="mr-2"
              >
                <RefreshCcw size={16} className="mr-2" />
                New Dialogue
              </Button>
            </div>
          </div>
        )}
      </div>
    </GameBase>
  );
};

export default DialogueBuilder;
