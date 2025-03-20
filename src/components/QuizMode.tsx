
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { useQuizState } from '@/hooks/useQuizState';
import { useSentences } from '@/context/SentencesContext';
import ProgressTracker from './quiz/ProgressTracker';
import QuizInfo from './quiz/QuizInfo';
import QuizContent from './QuizContent';
import EmptyState from './quiz/EmptyState';
import DateFilter from './quiz/DateFilter';
import QuizControls from './quiz/QuizControls';

export default function QuizMode() {
  const { toggleMastered } = useSentences();
  
  const {
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
    setSelectedDate
  } = useQuizState();

  // Track which sentences have had their translations revealed
  const [revealedTranslations, setRevealedTranslations] = useState<Set<string>>(new Set());

  const handleShowTranslation = () => {
    if (currentSentence) {
      // Add current sentence ID to revealed translations
      setRevealedTranslations(prev => {
        const newSet = new Set(prev);
        newSet.add(currentSentence.id);
        return newSet;
      });
    }
  };

  const handleToggleMastered = async (id: string, mastered: boolean) => {
    await toggleMastered(id, mastered);
  };

  // Reset translation visibility when navigating to a new sentence
  React.useEffect(() => {
    if (currentSentence) {
      // When moving to a new sentence, ensure translation is hidden
      setRevealedTranslations(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentSentence.id);
        return newSet;
      });
    }
  }, [currentIndex, currentSentence]);

  // Check if the current sentence's translation should be shown
  const shouldShowTranslation = currentSentence ? revealedTranslations.has(currentSentence.id) : false;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p>Loading sentences...</p>
        </div>
      </div>
    );
  }

  if (filteredSentences.length === 0) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <DateFilter
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            clearDateFilter={clearDateFilter}
          />
          <div className="mb-4">
            <QuizControls
              masterFilter={masterFilter}
              setMasterFilter={setMasterFilter}
              showStats={showStats}
              setShowStats={setShowStats}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              clearDateFilter={clearDateFilter}
            />
          </div>
        </div>
        
        <EmptyState
          selectedDate={selectedDate}
          clearDateFilter={clearDateFilter}
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <DateFilter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          clearDateFilter={clearDateFilter}
        />
        <div className="mt-4">
          <QuizControls
            masterFilter={masterFilter}
            setMasterFilter={setMasterFilter}
            showStats={showStats}
            setShowStats={setShowStats}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            clearDateFilter={clearDateFilter}
          />
        </div>
      </div>

      {showStats && (
        <div className="mb-4">
          <ProgressTracker 
            totalSentences={filteredSentences.length}
            masteredCount={filteredSentences.filter(s => s.mastered).length}
          />
        </div>
      )}

      <div className="glass-card rounded-xl p-6 animate-fade-in">
        {currentSentence && (
          <div>
            <QuizContent
              currentSentence={currentSentence}
              currentIndex={currentIndex}
              filteredSentences={filteredSentences}
              loading={loading}
              onPrev={prevSentence}
              onNext={nextSentence}
              onToggleMastered={handleToggleMastered}
              showTranslation={shouldShowTranslation}
              onShowTranslation={handleShowTranslation}
            />

            <Separator className="my-4" />
            
            <QuizInfo 
              selectedDate={selectedDate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
