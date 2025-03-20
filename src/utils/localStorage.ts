
import { Sentence } from '@/context/types/sentence.types';

// Keys for storing data
export const STORAGE_KEYS = {
  SENTENCES: 'arabicApp_sentences',
  THEME: 'arabicApp_theme',
  LAST_SYNC: 'arabicApp_lastSync',
  USER_PROGRESS: 'arabicApp_userProgress'
};

// Save sentences to local storage
export const saveSentencesToStorage = (sentences: Sentence[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SENTENCES, JSON.stringify(sentences));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, Date.now().toString());
    console.log(`Saved ${sentences.length} sentences to local storage`);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Load sentences from local storage
export const loadSentencesFromStorage = (): Sentence[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SENTENCES);
    const sentences = data ? JSON.parse(data) : null;
    if (sentences && sentences.length > 0) {
      console.log(`Loaded ${sentences.length} sentences from local storage`);
    }
    return sentences;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// Get last sync time
export const getLastSyncTime = (): number | null => {
  try {
    const time = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    return time ? parseInt(time, 10) : null;
  } catch (error) {
    console.error('Error getting last sync time:', error);
    return null;
  }
};

// Save user progress
export const saveUserProgress = (progress: Record<string, SentenceProgress>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    console.log(`Saved progress for ${Object.keys(progress).length} sentences`);
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
};

// Load user progress
export const loadUserProgress = (): Record<string, SentenceProgress> | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    const progress = data ? JSON.parse(data) : null;
    if (progress) {
      console.log(`Loaded progress for ${Object.keys(progress).length} sentences`);
    }
    return progress;
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
    return null;
  }
};

// Save theme preference
export const saveThemePreference = (isDark: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, isDark ? 'dark' : 'light');
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

// Load theme preference
export const loadThemePreference = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME);
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return null;
  }
};

// SentenceProgress interface for spaced repetition
export interface SentenceProgress {
  id: string;
  lastPracticed: number; // timestamp
  nextReviewDue: number; // timestamp
  easeFactor: number; // multiplier for spacing (higher = easier)
  interval: number; // days until next review
  repetitions: number; // number of times reviewed
  correct: number; // number of correct answers
  incorrect: number; // number of incorrect answers
}

// Initialize progress for a new sentence
export const initializeSentenceProgress = (id: string): SentenceProgress => {
  return {
    id,
    lastPracticed: Date.now(),
    nextReviewDue: Date.now(),
    easeFactor: 2.5, // Default ease factor (standard in spaced repetition systems)
    interval: 0, 
    repetitions: 0,
    correct: 0,
    incorrect: 0
  };
};

// Clear local storage (useful for debugging)
export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SENTENCES);
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
    console.log('Local storage cleared');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
