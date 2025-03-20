
import React from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameCompletedProps {
  scenarioTitle: string;
  onReset: () => void;
}

const GameCompleted: React.FC<GameCompletedProps> = ({ scenarioTitle, onReset }) => {
  return (
    <div className="text-center py-6 space-y-4">
      <div className="mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/40 border border-white/10">
          <Trophy className="text-white" size={32} />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-1">Conversation Complete!</h3>
      <p className="text-slate-100 text-base mb-4">
        You've successfully completed the "{scenarioTitle}" conversation.
      </p>
      
      <Button 
        variant="default" 
        onClick={onReset}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-2xl shadow-purple-500/30 border border-white/10 text-white font-medium"
      >
        Try Another Scenario
      </Button>
    </div>
  );
};

export default GameCompleted;
