
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Brain, Star, ArrowRight, X } from 'lucide-react';
import { useSentences } from '../context/SentencesContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import SentenceCard from '@/components/SentenceCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRandomSentence } from '@/hooks/useRandomSentence';
import Screensaver from '@/components/Screensaver';
import { GameProvider } from '@/hooks/useGameContext';

const Index = () => {
  const { sentences, isLoading } = useSentences();
  const isMobile = useIsMobile();
  const randomSentence = useRandomSentence();
  const [screensaverMode, setScreensaverMode] = useState(false);
  
  // Get favorite and recent sentences
  const favoriteSentences = sentences.filter(sentence => sentence.favorite);
  const recentSentences = [...sentences].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  // Calculate stats
  const totalCount = sentences.length;
  const masteredCount = sentences.filter(sentence => sentence.mastered).length;
  
  // Early return for screensaver mode
  if (screensaverMode) {
    return (
      <GameProvider>
        <div className="relative">
          <Screensaver />
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-4 right-4 rounded-full h-8 w-8 p-0 bg-white/20 backdrop-blur-sm text-white shadow-lg hover:bg-white/30"
            onClick={() => setScreensaverMode(false)}
          >
            <X size={16} />
          </Button>
        </div>
      </GameProvider>
    );
  }
  
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6 rounded-lg mt-4 shadow-2xl shadow-purple-500/20 border border-white/10 bg-gradient-to-br from-slate-800/30 to-indigo-900/30 backdrop-blur-sm">
      <header className="mb-4 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Levantine Arabic</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white border-0 shadow-lg shadow-indigo-500/30 hover:opacity-90"
              onClick={() => setScreensaverMode(true)}
            >
              <span className="text-xs">Screensaver</span>
            </Button>
            <Link to="/favorites">
              <Button variant="outline" size="sm" className="gap-1 bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white border-0 shadow-lg shadow-purple-500/30 hover:opacity-90">
                <Star size={16} className="text-yellow-300" fill="currentColor" />
                <span className="text-xs">{favoriteSentences.length}</span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Quick Stats Row - more vibrant colors with enhanced shadows */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gradient-to-br from-blue-600/90 to-indigo-600/90 rounded-lg p-2 text-center shadow-xl shadow-blue-500/30 border border-white/10">
            <p className="text-xs text-blue-200">Total</p>
            <p className="text-lg font-bold text-white">{totalCount}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600/90 to-purple-600/90 rounded-lg p-2 text-center shadow-xl shadow-indigo-500/30 border border-white/10">
            <p className="text-xs text-indigo-200">Mastered</p>
            <p className="text-lg font-bold text-white">{masteredCount}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 rounded-lg p-2 text-center shadow-xl shadow-purple-500/30 border border-white/10">
            <p className="text-xs text-purple-200">Progress</p>
            <p className="text-lg font-bold text-white">
              {totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0}%
            </p>
          </div>
        </div>
      </header>

      {/* Quick Actions - vibrant gradient buttons with enhanced shadows */}
      <div className="grid grid-cols-3 gap-2 mb-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <Link to="/review" className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-600/90 to-indigo-600/90 rounded-lg p-3 shadow-xl shadow-blue-500/30 hover:from-blue-500/90 hover:to-indigo-500/90 transition-all border border-white/10">
          <BookOpen size={24} className="text-blue-200 mb-1" />
          <span className="text-xs text-white">Review</span>
        </Link>
        
        <Link to="/add" className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600/90 to-purple-600/90 rounded-lg p-3 shadow-xl shadow-indigo-500/30 hover:from-indigo-500/90 hover:to-purple-500/90 transition-all border border-white/10">
          <Plus size={24} className="text-indigo-200 mb-1" />
          <span className="text-xs text-white">Add</span>
        </Link>
        
        <Link to="/games" className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-600/90 to-pink-600/90 rounded-lg p-3 shadow-xl shadow-purple-500/30 hover:from-purple-500/90 hover:to-pink-500/90 transition-all border border-white/10">
          <Brain size={24} className="text-purple-200 mb-1" />
          <span className="text-xs text-white">Games</span>
        </Link>
      </div>

      {/* Recent Sentences Section - more vibrant styling with enhanced shadow */}
      <div className="animate-fade-in mb-4" style={{ animationDelay: '150ms' }}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Recent Sentences</h2>
          <Link to="/review" className="text-xs text-pink-400 flex items-center">
            See all <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-pink-500 border-t-transparent rounded-full"></div>
          </div>
        ) : recentSentences.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-350px)] pr-2 rounded-md shadow-xl shadow-purple-500/20" type="always">
            <div className="space-y-3">
              {recentSentences.map(sentence => (
                <SentenceCard 
                  key={sentence.id}
                  sentence={sentence}
                  hideMetadata={true}
                  className="hover:bg-white/5 transition-colors backdrop-blur-sm shadow-xl shadow-purple-500/20 border border-white/10"
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="bg-gradient-to-br from-slate-800/50 to-indigo-900/50 rounded-lg p-4 text-center shadow-xl shadow-purple-500/20 border border-white/10">
            <p className="text-purple-200">No sentences added yet</p>
            <Link to="/add" className="mt-2 inline-block text-pink-400 hover:text-pink-300 transition-colors">
              Add your first sentence
            </Link>
          </div>
        )}
      </div>

      {/* Sentence of the Day - more vibrant card with enhanced shadow */}
      {randomSentence && (
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Sentence of the Day</h2>
          </div>
          <div className="bg-gradient-to-br from-slate-800/60 via-indigo-900/50 to-purple-900/60 rounded-lg p-4 shadow-xl shadow-purple-500/30 backdrop-blur-sm border border-white/10">
            <SentenceCard 
              sentence={randomSentence}
              showActions={false}
              hideMetadata={true}
              className="bg-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
