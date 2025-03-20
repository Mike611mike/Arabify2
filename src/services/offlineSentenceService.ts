
import { Sentence } from '@/context/types/sentence.types';
import { saveSentencesToStorage, loadSentencesFromStorage } from '@/utils/localStorage';
import { toast } from 'sonner';

// Get sentences from local storage
export const getOfflineSentences = (): Sentence[] => {
  const localSentences = loadSentencesFromStorage();
  if (localSentences && localSentences.length > 0) {
    return localSentences;
  }
  return [];
};

// Add a single sentence in offline mode
export const addOfflineSentence = (
  arabic: string, 
  english: string, 
  spokenArabic: string, 
  existingSentences: Sentence[]
): Sentence => {
  const now = new Date().toISOString();
  const newSentence: Sentence = {
    id: `temp_${Date.now()}`,
    arabic,
    english,
    spokenArabic,
    createdAt: now,
    updatedAt: now,
    mastered: false,
    favorite: false
  };
  
  const updatedSentences = [newSentence, ...existingSentences];
  saveSentencesToStorage(updatedSentences);
  
  toast.info('Sentence saved locally. Will sync when online.');
  
  return newSentence;
};

// Add multiple sentences in offline mode
export const bulkAddOfflineSentences = (
  newSentences: Array<{arabic: string, english: string, spokenArabic: string}>,
  existingSentences: Sentence[]
): Sentence[] => {
  const now = new Date().toISOString();
  const formattedSentences: Sentence[] = newSentences.map((s, index) => ({
    id: `temp_bulk_${Date.now()}_${index}`,
    arabic: s.arabic,
    english: s.english,
    spokenArabic: s.spokenArabic,
    createdAt: now,
    updatedAt: now,
    mastered: false,
    favorite: false
  }));
  
  const updatedSentences = [...formattedSentences, ...existingSentences];
  saveSentencesToStorage(updatedSentences);
  
  toast.info('Sentences saved locally. Will sync when online.');
  
  return formattedSentences;
};

// Remove a sentence in offline mode
export const removeOfflineSentence = (
  id: string, 
  existingSentences: Sentence[]
): Sentence[] => {
  const updatedSentences = existingSentences.filter(sentence => sentence.id !== id);
  saveSentencesToStorage(updatedSentences);
  return updatedSentences;
};

// Toggle mastered status in offline mode
export const toggleOfflineMastered = (
  id: string, 
  mastered: boolean, 
  existingSentences: Sentence[]
): Sentence[] => {
  const updatedSentences = existingSentences.map(sentence => 
    sentence.id === id ? { ...sentence, mastered, updatedAt: new Date().toISOString() } : sentence
  );
  saveSentencesToStorage(updatedSentences);
  return updatedSentences;
};

// Toggle favorite status in offline mode
export const toggleOfflineFavorite = (
  id: string, 
  favorite: boolean, 
  existingSentences: Sentence[]
): Sentence[] => {
  const updatedSentences = existingSentences.map(sentence => 
    sentence.id === id ? { ...sentence, favorite, updatedAt: new Date().toISOString() } : sentence
  );
  saveSentencesToStorage(updatedSentences);
  return updatedSentences;
};
