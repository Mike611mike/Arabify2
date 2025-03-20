import { SentenceProgress } from './localStorage';
import { Sentence } from '@/context/types/sentence.types';

// Calculate next review date based on spaced repetition algorithm (SM-2 inspired)
export const calculateNextReview = (
  progress: SentenceProgress,
  quality: number // 0-5 rating of answer quality (0 = wrong, 5 = perfect)
): SentenceProgress => {
  const now = Date.now();
  const newProgress = { ...progress };
  
  newProgress.lastPracticed = now;
  
  // Update correct/incorrect count
  if (quality >= 3) {
    newProgress.correct += 1;
  } else {
    newProgress.incorrect += 1;
  }
  
  // Adjust ease factor based on performance (minimum 1.3)
  newProgress.easeFactor = Math.max(
    1.3,
    newProgress.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );
  
  // Calculate new interval
  if (quality < 3) {
    // If answer was poor, reset interval
    newProgress.interval = 1;
  } else {
    // Increase interval based on repetitions and ease factor
    if (newProgress.repetitions === 0) {
      newProgress.interval = 1;
    } else if (newProgress.repetitions === 1) {
      newProgress.interval = 6;
    } else {
      newProgress.interval = Math.round(newProgress.interval * newProgress.easeFactor);
    }
  }
  
  newProgress.repetitions += 1;
  
  // Convert interval (days) to milliseconds and set next review date
  newProgress.nextReviewDue = now + newProgress.interval * 24 * 60 * 60 * 1000;
  
  return newProgress;
};

// Sort sentences by priority (due date and difficulty)
export const sortByReviewPriority = (
  sentences: Sentence[],
  progress: Record<string, SentenceProgress>
): Sentence[] => {
  return [...sentences].sort((a, b) => {
    const progressA = progress[a.id];
    const progressB = progress[b.id];
    
    // If neither has progress, keep original order
    if (!progressA && !progressB) return 0;
    
    // Sentences without progress go first
    if (!progressA) return -1;
    if (!progressB) return 1;
    
    // Sort by due date (overdue items first)
    if (progressA.nextReviewDue !== progressB.nextReviewDue) {
      return progressA.nextReviewDue - progressB.nextReviewDue;
    }
    
    // If due dates are the same, sort by difficulty (lower ease factor = harder = higher priority)
    return progressA.easeFactor - progressB.easeFactor;
  });
};

// Get a summary of learning progress
export const getLearningStats = (
  progress: Record<string, SentenceProgress>,
  sentences: Sentence[]
): {
  learned: number;
  mastered: number;
  dueSoon: number;
  overdue: number;
  totalReviews: number;
  accuracy: number;
} => {
  const now = Date.now();
  const oneDayFromNow = now + 24 * 60 * 60 * 1000;
  
  let learned = 0;
  let mastered = 0;
  let dueSoon = 0;
  let overdue = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;
  
  for (const sentenceId in progress) {
    const p = progress[sentenceId];
    const isOverdue = p.nextReviewDue < now;
    const isDueSoon = !isOverdue && p.nextReviewDue < oneDayFromNow;
    
    // Count as learned if reviewed at least once
    if (p.repetitions > 0) learned++;
    
    // Count as mastered if ease factor is high and interval is long (21+ days)
    if (p.easeFactor > 2.5 && p.interval >= 21) mastered++;
    
    if (isOverdue) overdue++;
    if (isDueSoon) dueSoon++;
    
    totalCorrect += p.correct;
    totalIncorrect += p.incorrect;
  }
  
  const totalReviews = totalCorrect + totalIncorrect;
  const accuracy = totalReviews > 0 ? totalCorrect / totalReviews : 0;
  
  return {
    learned,
    mastered,
    dueSoon,
    overdue,
    totalReviews,
    accuracy
  };
};

// Get sentences due for review
export const getDueForReview = (
  sentences: Sentence[],
  progress: Record<string, SentenceProgress>
): Sentence[] => {
  const now = Date.now();
  return sentences.filter(sentence => {
    // Sentences with no progress record are always due
    if (!progress[sentence.id]) return true;
    
    // Otherwise check if next review is due
    return progress[sentence.id].nextReviewDue <= now;
  });
};
