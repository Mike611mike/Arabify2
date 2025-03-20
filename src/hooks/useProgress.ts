import { useState, useEffect } from 'react';
import { Sentence } from '@/context/types/sentence.types';
import { 
  saveUserProgress, 
  loadUserProgress, 
  SentenceProgress, 
  initializeSentenceProgress 
} from '@/utils/localStorage';
import { calculateNextReview, getLearningStats, sortByReviewPriority } from '@/utils/spacedRepetition';

export const useProgress = (sentences: Sentence[]) => {
  const [progress, setProgress] = useState<Record<string, SentenceProgress>>({});
  const [stats, setStats] = useState({
    learned: 0,
    mastered: 0,
    dueSoon: 0,
    overdue: 0,
    totalReviews: 0,
    accuracy: 0
  });

  // Load progress from localStorage on init
  useEffect(() => {
    const savedProgress = loadUserProgress();
    if (savedProgress) {
      setProgress(savedProgress);
    }
  }, []);

  // Update stats when progress or sentences change
  useEffect(() => {
    if (sentences.length > 0) {
      const newStats = getLearningStats(progress, sentences);
      setStats(newStats);
    }
  }, [progress, sentences]);

  // Save progress to localStorage when it changes
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      saveUserProgress(progress);
    }
  }, [progress]);

  // Initialize progress for a new sentence
  const initializeProgress = (sentenceId: string): SentenceProgress => {
    return initializeSentenceProgress(sentenceId);
  };

  // Update progress after a review
  const updateReviewProgress = (sentenceId: string, quality: number) => {
    const sentenceProgress = progress[sentenceId] || initializeSentenceProgress(sentenceId);
    const updatedProgress = calculateNextReview(sentenceProgress, quality);
    
    const newProgress = {
      ...progress,
      [sentenceId]: updatedProgress
    };
    
    setProgress(newProgress);
  };

  // Get sentences that are due for review
  const getSentencesDueForReview = () => {
    const now = Date.now();
    const dueForReviewUnsorted = sentences.filter(sentence => {
      if (!progress[sentence.id]) return true;
      return progress[sentence.id].nextReviewDue <= now;
    });
    
    return sortByReviewPriority(dueForReviewUnsorted, progress);
  };

  return {
    progress,
    stats,
    setProgress,
    initializeProgress,
    updateReviewProgress,
    getSentencesDueForReview
  };
};
