
import React from 'react';
import { Sentence } from '../types/sentence.types';
import { SentencesOnlineProps } from '../types/providers.types';
import * as sentenceService from '../../services/sentenceService';
import { saveSentencesToStorage } from '@/utils/localStorage';
import { toast } from 'sonner';

export const handleOnlineSentences = ({
  sentences,
  setSentences,
  progress,
  setProgress,
  initializeProgress
}: SentencesOnlineProps) => {
  const addSentence = async (arabic: string, english: string, spokenArabic: string) => {
    try {
      const newSentence = await sentenceService.addSentence(arabic, english, spokenArabic);
      
      const updatedSentences = [newSentence, ...sentences];
      setSentences(updatedSentences);
      
      // Save to local storage immediately
      saveSentencesToStorage(updatedSentences);
      
      // Initialize progress for the new sentence
      setProgress(prev => ({
        ...prev,
        [newSentence.id]: initializeProgress(newSentence.id)
      }));
      
      return newSentence;
    } catch (error) {
      console.error('Error in online addSentence:', error);
      toast.error('Failed to add sentence');
    }
  };

  const bulkAddSentences = async (newSentences: Array<{arabic: string, english: string, spokenArabic: string}>) => {
    try {
      const formattedSentences = await sentenceService.bulkAddSentences(newSentences);
      
      const updatedSentences = [...formattedSentences, ...sentences];
      setSentences(updatedSentences);
      
      // Save to local storage immediately
      saveSentencesToStorage(updatedSentences);
      
      // Initialize progress for all new sentences
      const newProgress = { ...progress };
      formattedSentences.forEach(sentence => {
        newProgress[sentence.id] = initializeProgress(sentence.id);
      });
      setProgress(newProgress);
      
      return formattedSentences;
    } catch (error) {
      console.error('Error in online bulkAddSentences:', error);
      toast.error('Failed to add sentences');
    }
  };

  const removeSentence = async (id: string) => {
    try {
      await sentenceService.removeSentence(id);
      
      const updatedSentences = sentences.filter(sentence => sentence.id !== id);
      setSentences(updatedSentences);
      
      // Save updated list to local storage immediately
      saveSentencesToStorage(updatedSentences);
      
      // Remove progress for this sentence
      const newProgress = { ...progress };
      delete newProgress[id];
      setProgress(newProgress);
    } catch (error) {
      console.error('Error in online removeSentence:', error);
      toast.error('Failed to remove sentence');
    }
  };

  const toggleMastered = async (id: string, mastered: boolean) => {
    try {
      await sentenceService.toggleMastered(id, mastered);
      
      const updatedSentences = sentences.map(sentence => 
        sentence.id === id ? { ...sentence, mastered } : sentence
      );
      setSentences(updatedSentences);
      
      // Save updated list to local storage immediately
      saveSentencesToStorage(updatedSentences);
    } catch (error) {
      console.error('Error in online toggleMastered:', error);
      toast.error('Failed to update mastered status');
    }
  };

  const toggleFavorite = async (id: string, favorite: boolean) => {
    try {
      await sentenceService.toggleFavorite(id, favorite);
      
      const updatedSentences = sentences.map(sentence => 
        sentence.id === id ? { ...sentence, favorite } : sentence
      );
      setSentences(updatedSentences);
      
      // Save updated list to local storage immediately
      saveSentencesToStorage(updatedSentences);
    } catch (error) {
      console.error('Error in online toggleFavorite:', error);
      toast.error('Failed to update favorite status');
    }
  };

  const fetchSentences = async () => {
    try {
      const data = await sentenceService.fetchSentences();
      setSentences(data);
      
      // Save fetched sentences to local storage
      saveSentencesToStorage(data);
      
      return data;
    } catch (error) {
      console.error('Error fetching online sentences:', error);
      return null;
    }
  };

  return {
    addSentence,
    bulkAddSentences,
    removeSentence,
    toggleMastered,
    toggleFavorite,
    fetchSentences
  };
};
