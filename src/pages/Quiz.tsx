
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const Quiz = () => {
  const navigate = useNavigate();
  
  // Redirect to the games page, focusing on the quiz game
  useEffect(() => {
    // We'll navigate to the games tab and open the quiz game
    navigate('/games?game=quiz');
  }, [navigate]);
  
  return (
    <div className="container max-w-md mx-auto px-4 pt-12 pb-24 flex flex-col items-center justify-center">
      <Gamepad2 size={48} className="mb-4 animate-pulse" />
      <h1 className="text-2xl font-bold mb-2">Redirecting to Games</h1>
      <p className="text-center">The Quiz feature is now available in the Games section.</p>
    </div>
  );
};

export default Quiz;
