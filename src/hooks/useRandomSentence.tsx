
import { useState, useEffect } from 'react';
import { useSentences } from '@/context/SentencesContext';
import { Sentence } from '@/context/types/sentence.types';

export function useRandomSentence(refreshInterval = 30000) {
  const { sentences } = useSentences();
  const [randomSentence, setRandomSentence] = useState<Sentence | null>(null);

  useEffect(() => {
    const pickRandomSentence = () => {
      if (sentences.length > 0) {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        const selected = sentences[randomIndex];
        
        // Add stats to the sentence object
        const totalCount = sentences.length;
        const masteredCount = sentences.filter(sentence => sentence.mastered).length;
        const percentage = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;
        
        setRandomSentence({
          ...selected,
          stats: {
            total: totalCount,
            mastered: masteredCount,
            percentage
          }
        });
      }
    };

    // Initial pick
    pickRandomSentence();

    // Set up interval for changing sentence
    const intervalId = setInterval(pickRandomSentence, refreshInterval);

    return () => clearInterval(intervalId);
  }, [sentences, refreshInterval]);

  return randomSentence;
}
