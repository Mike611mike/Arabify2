
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  School, 
  Home, 
  ShoppingCart, 
  Stethoscope 
} from 'lucide-react';
import { AmiyyaScenario } from '@/data/amiyya-roleplay/types';
import GameBase from '../GameBase';

interface ScenarioSelectorProps {
  scenarios: AmiyyaScenario[];
  onSelectScenario: (scenario: AmiyyaScenario) => void;
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ 
  scenarios, 
  onSelectScenario 
}) => {
  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'car-taxi':
        return <Car size={18} className="text-spotify-green" />;
      case 'school':
        return <School size={18} className="text-spotify-green" />;
      case 'home':
        return <Home size={18} className="text-spotify-green" />;
      case 'shopping-cart':
        return <ShoppingCart size={18} className="text-spotify-green" />;
      case 'stethoscope':
        return <Stethoscope size={18} className="text-spotify-green" />;
      default:
        return <Car size={18} className="text-spotify-green" />;
    }
  };

  return (
    <GameBase 
      title="Amiyya Role Play" 
      description="Practice real-life conversations in Egyptian Arabic"
    >
      <div className="glass-card p-4 rounded-lg mb-4">
        <h3 className="text-lg font-medium mb-2">Choose a Scenario</h3>
        <p className="text-sm text-spotify-text mb-4">Select a conversation situation to practice:</p>
        
        <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2">
          {scenarios.map(scenario => (
            <Button
              key={scenario.id}
              variant="outline"
              className="justify-start h-auto p-3"
              onClick={() => onSelectScenario(scenario)}
            >
              <div className="flex items-center">
                <div className="bg-spotify-orange bg-opacity-20 p-2 rounded-full mr-3">
                  {getIconComponent(scenario.icon)}
                </div>
                <div className="text-left">
                  <p className="font-medium">{scenario.title}</p>
                  <p className="text-xs text-spotify-text mt-1">{scenario.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </GameBase>
  );
};

export default ScenarioSelector;
