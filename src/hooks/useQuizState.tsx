
import { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import { Sentence } from '@/context/types/sentence.types';
import { useKeyboardNavigation } from './useKeyboardNavigation';

export function useQuizState() {
  const { sentences, sentenceProgress, stats, isLoading } = useSentences();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [masterFilter, setMasterFilter] = useState<'all' | 'mastered' | 'unmastered' | 'favorite'>('all');
  const [showStats, setShowStats] = useState(true);

  // Filter sentences based on selected date and mastery status
  const filteredSentences = sentences.filter(sentence => {
    // First, apply the mastery filter
    if (masterFilter === 'mastered' && !sentence.mastered) return false;
    if (masterFilter === 'unmastered' && sentence.mastered) return false;
    if (masterFilter === 'favorite' && !sentence.favorite) return false;
    
    // Then, if a date is selected, filter by date
    if (selectedDate) {
      const sentenceDate = new Date(sentence.createdAt);
      const selectedDateStart = new Date(selectedDate);
      selectedDateStart.setHours(0, 0, 0, 0);
      
      const selectedDateEnd = new Date(selectedDate);
      selectedDateEnd.setHours(23, 59, 59, 999);
      
      return sentenceDate >= selectedDateStart && sentenceDate <= selectedDateEnd;
    }
    
    return true;
  });

  // Reset current index when filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedDate, masterFilter, sentences.length]);

  const currentSentence = filteredSentences[currentIndex];

  const nextSentence = () => {
    setLoading(true);
    setTimeout(() => {
      if (currentIndex < filteredSentences.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        // Loop back to the beginning if at the end
        setCurrentIndex(0);
      }
      setLoading(false);
    }, 300); // Short delay for transition effect
  };

  const prevSentence = () => {
    setLoading(true);
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(prevIndex => prevIndex - 1);
      } else {
        // Loop to the end if at the beginning
        setCurrentIndex(filteredSentences.length - 1);
      }
      setLoading(false);
    }, 300); // Short delay for transition effect
  };

  const clearDateFilter = () => {
    setSelectedDate(undefined);
  };

  // Set up keyboard navigation
  useKeyboardNavigation({
    onNext: nextSentence,
    onPrev: prevSentence
  });

  return {
    isLoading,
    currentSentence,
    currentIndex,
    loading,
    selectedDate,
    filteredSentences,
    masterFilter,
    setMasterFilter,
    showStats,
    setShowStats,
    stats,
    nextSentence,
    prevSentence,
    clearDateFilter,
    sentenceProgress,
    setSelectedDate,
    sentences
  };
}
