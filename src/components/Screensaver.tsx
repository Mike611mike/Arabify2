
import React, { useEffect, useState } from 'react';
import { useRandomSentence } from '@/hooks/useRandomSentence';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Brain, Star, BookOpen, Award } from 'lucide-react';
import SentenceCard from '@/components/SentenceCard';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useGameContext } from '@/hooks/useGameContext';
import GameGallery from '@/components/games/GameGallery';

export default function Screensaver() {
  const randomSentence = useRandomSentence(15000); // Change sentence every 15 seconds
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();
  const { setSelectedGame } = useGameContext();
  
  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (!randomSentence) return null;
  
  return (
    <div className={`h-[calc(100vh-4rem)] flex flex-col ${isMobile ? 'justify-start' : 'justify-between'} p-4 animate-fade-in overflow-auto`}>
      {/* Clock and Date - with brighter styling and shadow */}
      <div className="text-center mb-3 bg-gradient-to-br from-indigo-600/40 to-purple-600/40 backdrop-blur-sm rounded-lg p-3 shadow-xl shadow-purple-500/30 border border-white/10">
        <div className="text-4xl font-bold tracking-tighter text-white">
          {format(currentTime, 'HH:mm')}
        </div>
        <div className="text-sm text-purple-200">
          {format(currentTime, 'EEEE, MMMM d')}
        </div>
      </div>
      
      {/* Progress stats in smaller format - with shadow and colorful background */}
      <div className="mb-4 bg-gradient-to-br from-blue-600/40 to-indigo-600/40 backdrop-blur-sm rounded-lg p-3 shadow-xl shadow-blue-500/30 border border-white/10">
        <div className="flex justify-between items-center mb-1 text-xs text-blue-200">
          <span>Progress: {randomSentence?.stats?.percentage || 0}%</span>
          <span>Mastered: {randomSentence?.stats?.mastered || 0} / {randomSentence?.stats?.total || 0}</span>
        </div>
        <Progress value={randomSentence?.stats?.percentage || 0} className="h-1.5 bg-blue-900/40" />
      </div>
      
      {/* Quick Actions - more vibrant gradient buttons with enhanced shadows */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        <Link to="/review" className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600/80 to-purple-600/80 rounded-lg p-2 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/40 border border-white/10">
          <BookOpen size={18} className="text-pink-300 mb-0.5" />
          <span className="text-[10px] text-purple-100">Review</span>
        </Link>
        
        <Link to="/games" className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-600/80 to-pink-600/80 rounded-lg p-2 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/40 border border-white/10">
          <Brain size={18} className="text-pink-300 mb-0.5" />
          <span className="text-[10px] text-purple-100">Games</span>
        </Link>
        
        <Link to="/favorites" className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-600/80 to-fuchsia-600/80 rounded-lg p-2 hover:from-pink-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-pink-500/40 border border-white/10">
          <Star size={18} className="text-pink-300 mb-0.5" />
          <span className="text-[10px] text-purple-100">Favorites</span>
        </Link>
      </div>
      
      {/* Featured sentence - colorful gradient card with enhanced shadow */}
      <div className="mb-3">
        <Card className="w-full bg-gradient-to-br from-slate-800/80 via-indigo-900/60 to-purple-900/80 border-none shadow-2xl shadow-indigo-500/30 backdrop-blur-sm border border-white/10">
          <CardContent className="p-3">
            <h3 className="text-xs font-medium mb-1 flex items-center text-pink-300">
              <Award size={14} className="mr-1" /> Sentence of the Day
            </h3>
            <SentenceCard 
              sentence={randomSentence}
              showActions={false}
              hideMetadata={true}
              className="bg-transparent animate-pulse-subtle border-none p-0"
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Games section - more colorful with enhanced shadow */}
      <div className="flex-1">
        <h3 className="text-xs font-medium mb-1 flex items-center text-pink-300">
          <Brain size={14} className="mr-1" /> Quick Games
        </h3>
        <div className="h-[calc(100vh-400px)] overflow-y-auto bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-lg p-2 shadow-2xl shadow-purple-500/30 border border-white/10">
          <GameGallery isScreensaver={true} />
        </div>
      </div>
    </div>
  );
}
