
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { SentencesContextType, Sentence } from '../types/sentence.types';
import { 
  loadSentencesFromStorage,
  saveSentencesToStorage,
  initializeSentenceProgress,
  SentenceProgress
} from '@/utils/localStorage';
import { useProgress } from '@/hooks/useProgress';
import { useConnectivity } from '@/hooks/useConnectivity';
import { toast } from 'sonner';
import { handleOfflineSentences } from './SentencesOfflineProvider';
import { handleOnlineSentences } from './SentencesOnlineProvider';

export const SentencesContext = createContext<SentencesContextType | undefined>(undefined);

export const SentencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOffline } = useConnectivity();
  const { 
    progress, 
    stats: progressStats, 
    updateReviewProgress: updateProgressHook, 
    getSentencesDueForReview,
    initializeProgress: initializeProgressHook,
    setProgress 
  } = useProgress(sentences);

  // Fixed: Return a properly typed SentenceProgress object instead of a nested object
  const initializeProgress = (id: string): SentenceProgress => {
    return initializeProgressHook(id);
  };

  // Create offline and online handlers
  const offlineHandler = handleOfflineSentences({
    isOffline,
    sentences,
    setSentences,
    progress,
    setProgress,
    initializeProgress
  });

  const onlineHandler = handleOnlineSentences({
    sentences,
    setSentences,
    progress,
    setProgress,
    initializeProgress
  });

  // Save sentences whenever they change
  useEffect(() => {
    if (sentences.length > 0) {
      saveSentencesToStorage(sentences);
    }
  }, [sentences]);

  // Load sentences from API or local storage
  useEffect(() => {
    const loadSentences = async () => {
      try {
        setIsLoading(true);
        
        if (!navigator.onLine) {
          offlineHandler.loadOfflineSentences();
        } else {
          const data = await onlineHandler.fetchSentences();
          if (!data) {
            throw new Error('Failed to fetch sentences');
          }
        }
      } catch (error) {
        console.error('Error loading sentences:', error);
        
        const localSentences = loadSentencesFromStorage();
        if (localSentences && localSentences.length > 0) {
          setSentences(localSentences);
          toast.info('Using locally cached sentences due to connection issues');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSentences();
  }, []);

  // Conditionally use either online or offline handler methods
  const addSentence = async (arabic: string, english: string, spokenArabic: string) => {
    return isOffline 
      ? offlineHandler.addSentence(arabic, english, spokenArabic)
      : onlineHandler.addSentence(arabic, english, spokenArabic);
  };

  const bulkAddSentences = async (newSentences: Array<{arabic: string, english: string, spokenArabic: string}>) => {
    return isOffline
      ? offlineHandler.bulkAddSentences(newSentences)
      : onlineHandler.bulkAddSentences(newSentences);
  };

  const removeSentence = async (id: string) => {
    return isOffline
      ? offlineHandler.removeSentence(id)
      : onlineHandler.removeSentence(id);
  };

  const toggleMastered = async (id: string, mastered: boolean) => {
    return isOffline
      ? offlineHandler.toggleMastered(id, mastered)
      : onlineHandler.toggleMastered(id, mastered);
  };

  const toggleFavorite = async (id: string, favorite: boolean) => {
    return isOffline
      ? offlineHandler.toggleFavorite(id, favorite)
      : onlineHandler.toggleFavorite(id, favorite);
  };

  const getRandomSentence = (): Sentence | null => {
    if (sentences.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  };

  // Convert progress stats to the format expected by the SentencesContextType
  const stats = {
    total: progressStats.learned + (sentences.length - progressStats.learned), // All sentences
    mastered: progressStats.mastered,
    percentage: sentences.length > 0 
      ? Math.round((progressStats.mastered / sentences.length) * 100)
      : 0
  };

  // Update the review progress to use the number-based quality param
  const updateReviewProgress = (id: string, quality: number) => {
    updateProgressHook(id, quality);
  };

  return (
    <SentencesContext.Provider value={{ 
      sentences, 
      addSentence, 
      bulkAddSentences, 
      removeSentence, 
      getRandomSentence,
      toggleMastered,
      toggleFavorite,
      isLoading,
      isOffline,
      updateReviewProgress,
      getSentencesDueForReview,
      sentenceProgress: progress,
      stats
    }}>
      {children}
    </SentencesContext.Provider>
  );
};
