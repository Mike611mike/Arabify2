
import React, { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import GameBase from './GameBase';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/hooks/useAudio';
import { BookOpen, Volume2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

// Example story template (in a real app, you'd have a more elaborate story system)
const storyTemplate = {
  title: "A Day in Cairo",
  introduction: "You're visiting Cairo for the first time. Follow the story and select appropriate Arabic phrases.",
  scenes: [
    {
      id: "hotel",
      description: "You arrive at your hotel and want to check in.",
      prompt: "How would you greet the receptionist?",
      correctPhraseType: "greeting"
    },
    {
      id: "restaurant",
      description: "You're hungry and go to a nearby restaurant.",
      prompt: "How would you ask for a menu?",
      correctPhraseType: "askingForMenu"
    },
    {
      id: "taxi",
      description: "After lunch, you want to visit the pyramids. You need to find a taxi.",
      prompt: "How would you ask for directions to the pyramids?",
      correctPhraseType: "askingForPlace"
    },
    {
      id: "shop",
      description: "At a souvenir shop, you found a nice item but it seems expensive.",
      prompt: "How would you negotiate the price?",
      correctPhraseType: "bargaining"
    },
    {
      id: "goodbye",
      description: "It's getting late and you need to return to your hotel.",
      prompt: "How would you say goodbye?",
      correctPhraseType: "farewell"
    }
  ]
};

// Mapping of sentence types for the story
const sentenceTypes = {
  greeting: ["hello", "greeting", "welcome"],
  askingForMenu: ["menu", "food", "restaurant"],
  askingForPlace: ["where", "place", "location", "direction"],
  bargaining: ["price", "expensive", "money", "cost"],
  farewell: ["goodbye", "bye", "thank"]
};

const InteractiveStory: React.FC = () => {
  const { sentences } = useSentences();
  const { playAudio } = useAudio();
  const [storyProgress, setStoryProgress] = useState(0);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isStoryComplete, setIsStoryComplete] = useState(false);
  const [storyHistory, setStoryHistory] = useState<any[]>([]);
  
  // Initialize the story
  useEffect(() => {
    if (sentences.length > 0) {
      startStory();
    }
  }, [sentences]);
  
  const startStory = () => {
    setStoryProgress(0);
    setScore(0);
    setSelectedOption(null);
    setIsStoryComplete(false);
    setStoryHistory([]);
    generateOptions(0);
  };
  
  const generateOptions = (sceneIndex: number) => {
    if (sceneIndex >= storyTemplate.scenes.length) {
      setIsStoryComplete(true);
      return;
    }
    
    const currentScene = storyTemplate.scenes[sceneIndex];
    const correctType = currentScene.correctPhraseType;
    
    // Find relevant keywords for the current scene
    const relevantKeywords = sentenceTypes[correctType as keyof typeof sentenceTypes];
    
    // Find suitable sentences based on keywords
    // In a real app, you'd have sentences specifically tagged for story purposes
    const matchingSentences = sentences.filter(sentence => {
      return relevantKeywords.some(keyword => 
        sentence.english.toLowerCase().includes(keyword) || 
        sentence.spokenArabic.toLowerCase().includes(keyword)
      );
    });
    
    // If not enough matching sentences, fill with some random ones
    let selectedSentences = matchingSentences.slice(0, 3);
    if (selectedSentences.length < 3) {
      const randomSentences = sentences
        .filter(s => !matchingSentences.includes(s))
        .slice(0, 3 - selectedSentences.length);
      
      selectedSentences = [...selectedSentences, ...randomSentences];
    }
    
    // Shuffle the options
    setOptions(selectedSentences.sort(() => Math.random() - 0.5));
  };
  
  const selectOption = (optionId: string) => {
    setSelectedOption(optionId);
    
    const selectedSentence = options.find(option => option.id === optionId);
    const currentScene = storyTemplate.scenes[storyProgress];
    const correctType = currentScene.correctPhraseType;
    const relevantKeywords = sentenceTypes[correctType as keyof typeof sentenceTypes];
    
    // Check if the selected option matches the scene's required phrase type
    const isCorrect = relevantKeywords.some(keyword => 
      selectedSentence.english.toLowerCase().includes(keyword) || 
      selectedSentence.spokenArabic.toLowerCase().includes(keyword)
    );
    
    // Add to story history
    setStoryHistory(prev => [...prev, {
      scene: currentScene,
      selectedSentence,
      isCorrect
    }]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success("Good choice!");
    } else {
      toast.error("Not quite right for this situation.");
    }
    
    // Move to next scene after a delay
    setTimeout(() => {
      setStoryProgress(prev => prev + 1);
      setSelectedOption(null);
      generateOptions(storyProgress + 1);
    }, 2000);
  };
  
  const resetStory = () => {
    startStory();
  };
  
  if (sentences.length === 0) {
    return (
      <GameBase 
        title="Interactive Story" 
        description="Navigate through a story using Arabic phrases"
      >
        <div className="text-center py-8">Loading story...</div>
      </GameBase>
    );
  }
  
  return (
    <GameBase 
      title="Interactive Story" 
      description="Navigate through a story using Arabic phrases" 
      onRestart={resetStory}
      showScore={true}
      score={score}
      maxScore={storyTemplate.scenes.length}
    >
      <div className="space-y-6">
        <div className="progress-bar w-full h-2 bg-spotify-light bg-opacity-30 rounded-full mb-4">
          <div 
            className="h-full bg-spotify-green rounded-full transition-all duration-300"
            style={{ width: `${(storyProgress / storyTemplate.scenes.length) * 100}%` }}
          ></div>
        </div>
        
        {!isStoryComplete ? (
          <>
            <div className="glass-card p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <BookOpen size={18} className="mr-2 text-spotify-green" />
                {storyTemplate.title}
              </h3>
              
              {storyProgress === 0 && (
                <p className="text-sm text-spotify-text mb-4">
                  {storyTemplate.introduction}
                </p>
              )}
              
              <div className="mb-4">
                <p className="font-medium">{storyTemplate.scenes[storyProgress].description}</p>
                <p className="text-spotify-text mt-2">{storyTemplate.scenes[storyProgress].prompt}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {options.map(option => (
                <Button
                  key={option.id}
                  variant={selectedOption === option.id ? "default" : "outline"}
                  className={`w-full justify-between h-auto py-3 ${
                    selectedOption === option.id ? "bg-spotify-green text-black" : ""
                  }`}
                  onClick={() => selectOption(option.id)}
                  disabled={selectedOption !== null}
                >
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="font-arabic text-lg mb-1 line-clamp-2 break-words">{option.arabic}</p>
                    <p className="text-xs opacity-80 line-clamp-2 break-words">{option.english}</p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-8 w-8 flex-shrink-0 ml-2" 
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(option.arabic, option.spokenArabic, option.id);
                    }}
                  >
                    <Volume2 size={16} />
                  </Button>
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="glass-card p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-3 text-center">Story Complete!</h3>
              <p className="text-center mb-4">
                You scored {score} out of {storyTemplate.scenes.length}
              </p>
              
              <div className="space-y-6 mt-6">
                <h4 className="font-medium">Your Journey:</h4>
                
                {storyHistory.map((item, index) => (
                  <div key={index} className="border-l-2 pl-4 pb-6 relative">
                    <div 
                      className={`absolute w-3 h-3 rounded-full -left-[7px] top-0 ${
                        item.isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    
                    <p className="font-medium">{item.scene.description}</p>
                    <p className="text-sm text-spotify-text mb-2">{item.scene.prompt}</p>
                    
                    <div className="bg-spotify-light bg-opacity-20 p-3 rounded-lg mt-2">
                      <p className="font-arabic break-words line-clamp-3">{item.selectedSentence.arabic}</p>
                      <p className="text-sm text-spotify-text mt-1 break-words line-clamp-3">{item.selectedSentence.english}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={resetStory} 
              className="w-full"
            >
              Start New Story <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </GameBase>
  );
};

export default InteractiveStory;
