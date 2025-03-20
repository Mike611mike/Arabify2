
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { RolePlayScenario } from '@/data/roleplay';
import GameBase from '../GameBase';

interface ScenarioSelectorProps {
  scenarios: RolePlayScenario[];
  onSelectScenario: (scenario: RolePlayScenario) => void;
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ 
  scenarios, 
  onSelectScenario 
}) => {
  return (
    <GameBase 
      title="Role-Play Simulator" 
      description="Practice real-life conversations in Arabic"
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
                <div className="bg-spotify-green bg-opacity-20 p-2 rounded-full mr-3">
                  <MessageSquare size={18} className="text-spotify-green" />
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
