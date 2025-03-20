
import React from 'react';
import { Sentence } from '../types/sentence.types';
import { SentencesOfflineProps } from '../types/providers.types';
import { saveSentencesToStorage } from '@/utils/localStorage';
import { 
  addOfflineSentence, 
  bulkAddOfflineSentences, 
  removeOfflineSentence, 
  toggleOfflineMastered,
  toggleOfflineFavorite,
  getOfflineSentences
} from '@/services/offlineSentenceService';
import { toast } from 'sonner';

export const handleOfflineSentences = ({
  isOffline,
  sentences,
  setSentences,
  progress,
  setProgress,
  initializeProgress
}: SentencesOfflineProps) => {
  const addSentence = async (arabic: string, english: string, spokenArabic: string) => {
    try {
      const newSentence = addOfflineSentence(arabic, english, spokenArabic, sentences);
      
      const updatedSentences = [newSentence, ...sentences];
      setSentences(updatedSentences);
      
      // Initialize progress for the new sentence
      setProgress(prev => ({
        ...prev,
        [newSentence.id]: initializeProgress(newSentence.id)
      }));
      
      return newSentence;
    } catch (error) {
      console.error('Error in offline addSentence:', error);
      toast.error('Failed to add sentence');
    }
  };

  const bulkAddSentences = async (newSentences: Array<{arabic: string, english: string, spokenArabic: string}>) => {
    try {
      const formattedSentences = bulkAddOfflineSentences(newSentences, sentences);
      
      const updatedSentences = [...formattedSentences, ...sentences];
      setSentences(updatedSentences);
      
      // Initialize progress for all new sentences
      const newProgress = { ...progress };
      formattedSentences.forEach(sentence => {
        newProgress[sentence.id] = initializeProgress(sentence.id);
      });
      setProgress(newProgress);
      
      return formattedSentences;
    } catch (error) {
      console.error('Error in offline bulkAddSentences:', error);
      toast.error('Failed to add sentences');
    }
  };

  const removeSentence = async (id: string) => {
    try {
      const updatedSentences = removeOfflineSentence(id, sentences);
      setSentences(updatedSentences);
      
      // Remove progress for this sentence
      const newProgress = { ...progress };
      delete newProgress[id];
      setProgress(newProgress);
    } catch (error) {
      console.error('Error in offline removeSentence:', error);
      toast.error('Failed to remove sentence');
    }
  };

  const toggleMastered = async (id: string, mastered: boolean) => {
    try {
      toast.info('Mastery status saved locally. Will sync when online.');
      
      const updatedSentences = toggleOfflineMastered(id, mastered, sentences);
      setSentences(updatedSentences);
    } catch (error) {
      console.error('Error in offline toggleMastered:', error);
      toast.error('Failed to update mastered status');
    }
  };

  const toggleFavorite = async (id: string, favorite: boolean) => {
    try {
      toast.info('Favorite status saved locally. Will sync when online.');
      
      const updatedSentences = toggleOfflineFavorite(id, favorite, sentences);
      setSentences(updatedSentences);
    } catch (error) {
      console.error('Error in offline toggleFavorite:', error);
      toast.error('Failed to update favorite status');
    }
  };

  const loadOfflineSentences = () => {
    const localSentences = getOfflineSentences();
    if (localSentences.length > 0) {
      setSentences(localSentences);
      toast.info('Loaded sentences from local storage (offline mode)');
      return true;
    }
    toast.error('No saved sentences found in local storage');
    return false;
  };

  return {
    addSentence,
    bulkAddSentences,
    removeSentence,
    toggleMastered,
    toggleFavorite,
    loadOfflineSentences
  };
};
