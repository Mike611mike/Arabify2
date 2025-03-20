
import { useContext } from 'react';
import { SentencesContext } from '../providers/SentencesProvider';
import { SentencesContextType } from '../types/sentence.types';

export const useSentences = (): SentencesContextType => {
  const context = useContext(SentencesContext);
  if (context === undefined) {
    throw new Error('useSentences must be used within a SentencesProvider');
  }
  return context;
};
