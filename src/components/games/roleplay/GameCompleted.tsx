
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface GameCompletedProps {
  scenarioTitle: string;
  onReset: () => void;
}

const GameCompleted: React.FC<GameCompletedProps> = ({ scenarioTitle, onReset }) => {
  return (
    <div className="p-4 rounded-lg bg-spotify-green/20 text-center">
      <h3 className="text-lg font-medium mb-2">Role-Play Complete!</h3>
      <p className="mb-4">You successfully completed the "{scenarioTitle}" scenario!</p>
      
      <Button onClick={onReset}>
        Try Another Scenario <ChevronRight size={16} className="ml-2" />
      </Button>
    </div>
  );
};

export default GameCompleted;
