
import React, { useState } from 'react';
import { useSentences } from '../context/SentencesContext';
import { format } from 'date-fns';
import ReviewFilters from '../components/review/ReviewFilters';
import ReviewEmptyState from '../components/review/ReviewEmptyState';
import SentenceList from '../components/review/SentenceList';
import ReviewLoading from '../components/review/ReviewLoading';
import { Sentence } from '@/context/types/sentence.types';

const Review = () => {
  const { sentences, isLoading } = useSentences();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [masterFilter, setMasterFilter] = useState<'all' | 'mastered' | 'unmastered' | 'favorite'>('all');
  
  const filteredSentences = sentences.filter(sentence => {
    const matchesSearch = 
      sentence.arabic.includes(searchTerm) || 
      sentence.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sentence.spokenArabic.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (masterFilter === 'mastered') {
      matchesFilter = sentence.mastered;
    } else if (masterFilter === 'unmastered') {
      matchesFilter = !sentence.mastered;
    } else if (masterFilter === 'favorite') {
      matchesFilter = sentence.favorite;
    }
    
    if (selectedDate && matchesSearch && matchesFilter) {
      const createdAt = new Date(sentence.createdAt);
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      return createdAt >= startOfDay && createdAt <= endOfDay;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Group sentences by day
  const groupedSentences = filteredSentences.reduce((groups, sentence) => {
    const date = new Date(sentence.createdAt);
    const day = format(date, 'yyyy-MM-dd');
    
    if (!groups[day]) {
      groups[day] = [];
    }
    
    groups[day].push(sentence);
    return groups;
  }, {} as Record<string, Sentence[]>);

  // Sort days in descending order (newest first)
  const sortedDays = Object.keys(groupedSentences).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  const clearDateFilter = () => {
    setSelectedDate(undefined);
  };

  return (
    <div className="container max-w-md mx-auto px-4 pb-24 pt-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1 animate-fade-in bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Review Sentences</h1>
        <p className="text-spotify-text animate-fade-in">Browse all your saved Arabic phrases</p>
      </header>

      <div className="bg-gradient-to-br from-slate-800/40 to-indigo-900/40 backdrop-blur-sm rounded-lg p-4 mb-4 shadow-2xl shadow-purple-500/20 border border-white/10">
        <ReviewFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          masterFilter={masterFilter}
          setMasterFilter={setMasterFilter}
          clearDateFilter={clearDateFilter}
        />
      </div>

      {isLoading ? (
        <ReviewLoading />
      ) : filteredSentences.length === 0 ? (
        <div className="bg-gradient-to-br from-slate-800/40 to-purple-900/40 backdrop-blur-sm rounded-lg p-4 shadow-2xl shadow-purple-500/20 border border-white/10">
          <ReviewEmptyState 
            sentences={sentences} 
            selectedDate={selectedDate}
            clearDateFilter={clearDateFilter}
          />
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-800/40 to-purple-900/40 backdrop-blur-sm rounded-lg p-4 shadow-2xl shadow-purple-500/20 border border-white/10">
          <SentenceList 
            groupedSentences={groupedSentences} 
            sortedDays={sortedDays} 
          />
        </div>
      )}
    </div>
  );
};

export default Review;
