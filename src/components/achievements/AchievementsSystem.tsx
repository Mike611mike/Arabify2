
import React from 'react';
import { useSentences } from '@/context/SentencesContext';
import { Award, Star, Check, Clock, Medal, Gamepad2, BookOpen, Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number; // 0-100
  unlocked: boolean;
}

const AchievementsSystem: React.FC = () => {
  const { sentences, stats } = useSentences();
  
  // Calculate various stats for achievements
  const masteredPercentage = stats.percentage || 0;
  const totalSentences = sentences.length;
  // Mock data for games played
  const gamesPlayed = 12;
  
  // Generate achievements based on user stats
  const achievements: Achievement[] = [
    {
      id: 'first-sentence',
      name: 'First Steps',
      description: 'Add your first sentence',
      icon: <BookOpen size={20} />,
      color: '#3B82F6',
      progress: totalSentences > 0 ? 100 : 0,
      unlocked: totalSentences > 0
    },
    {
      id: 'ten-sentences',
      name: 'Getting Started',
      description: 'Add 10 sentences to your collection',
      icon: <BookOpen size={20} />,
      color: '#3B82F6',
      progress: Math.min(100, (totalSentences / 10) * 100),
      unlocked: totalSentences >= 10
    },
    {
      id: 'mastery-beginner',
      name: 'Beginner Mastery',
      description: 'Master 5 sentences',
      icon: <Star size={20} />,
      color: '#F59E0B',
      progress: Math.min(100, (stats.mastered / 5) * 100),
      unlocked: stats.mastered >= 5
    },
    {
      id: 'mastery-intermediate',
      name: 'Intermediate Mastery',
      description: 'Master 25 sentences',
      icon: <Star size={20} />,
      color: '#F59E0B',
      progress: Math.min(100, (stats.mastered / 25) * 100),
      unlocked: stats.mastered >= 25
    },
    {
      id: 'mastery-advanced',
      name: 'Advanced Mastery',
      description: 'Master 50 sentences',
      icon: <Star size={20} />,
      color: '#F59E0B',
      progress: Math.min(100, (stats.mastered / 50) * 100),
      unlocked: stats.mastered >= 50
    },
    {
      id: 'first-game',
      name: 'Game Beginner',
      description: 'Play your first game',
      icon: <Gamepad2 size={20} />,
      color: '#8B5CF6',
      progress: gamesPlayed > 0 ? 100 : 0,
      unlocked: gamesPlayed > 0
    },
    {
      id: 'game-master',
      name: 'Game Master',
      description: 'Play 10 games',
      icon: <Gamepad2 size={20} />,
      color: '#8B5CF6',
      progress: Math.min(100, (gamesPlayed / 10) * 100),
      unlocked: gamesPlayed >= 10
    },
    {
      id: 'perfect-score',
      name: 'Perfect Score',
      description: 'Get a perfect score in any game',
      icon: <Medal size={20} />,
      color: '#EC4899',
      progress: 100, // Mock - would be based on actual game scores
      unlocked: true // Mock - would be based on actual game scores
    },
    {
      id: 'consistent-learner',
      name: 'Consistent Learner',
      description: 'Log in for 5 consecutive days',
      icon: <Clock size={20} />,
      color: '#10B981',
      progress: 100, // Mock - would be based on actual login streak
      unlocked: true // Mock - would be based on actual login streak
    }
  ];
  
  // Filter achievements
  const unlockedAchievements = achievements.filter(achievement => achievement.unlocked);
  const inProgressAchievements = achievements.filter(achievement => !achievement.unlocked);
  
  return (
    <div className="space-y-6 pb-6">
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>
      
      {/* Achievements Overview */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center mb-3">
          <Award className="mr-2 text-spotify-orange" size={24} />
          <h2 className="text-lg font-semibold">Your Achievements</h2>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-spotify-text">Unlocked</p>
            <p className="text-2xl font-bold">{unlockedAchievements.length}</p>
          </div>
          <div>
            <p className="text-sm text-spotify-text">Total</p>
            <p className="text-2xl font-bold">{achievements.length}</p>
          </div>
          <div>
            <p className="text-sm text-spotify-text">Completion</p>
            <p className="text-2xl font-bold">
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </p>
          </div>
        </div>
        
        <Progress 
          value={(unlockedAchievements.length / achievements.length) * 100} 
          className="h-2" 
        />
      </div>
      
      {/* Unlocked Achievements */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <Check className="mr-2 text-spotify-green" size={20} />
          Unlocked Achievements
        </h2>
        
        <div className="space-y-3">
          {unlockedAchievements.map(achievement => (
            <div 
              key={achievement.id}
              className="glass-card rounded-xl p-4 flex items-center"
            >
              <div 
                className="rounded-full p-3 mr-4" 
                style={{ backgroundColor: achievement.color }}
              >
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-medium">{achievement.name}</h3>
                <p className="text-sm text-spotify-text">{achievement.description}</p>
              </div>
              <div className="ml-auto">
                <div className="bg-spotify-green bg-opacity-20 text-spotify-green text-xs font-medium px-2 py-1 rounded-full">
                  Unlocked
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* In Progress Achievements */}
      {inProgressAchievements.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Clock className="mr-2 text-spotify-blue" size={20} />
            In Progress
          </h2>
          
          <div className="space-y-3">
            {inProgressAchievements.map(achievement => (
              <div 
                key={achievement.id}
                className="glass-card rounded-xl p-4"
              >
                <div className="flex items-center mb-2">
                  <div 
                    className="rounded-full p-2 mr-3 text-white"
                    style={{ backgroundColor: achievement.color }}
                  >
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-spotify-text">{achievement.description}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsSystem;
