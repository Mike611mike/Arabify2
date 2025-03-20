
// Re-export everything from the files we just created
// This maintains backward compatibility
import { SentencesProvider } from './providers/SentencesProvider';
import { useSentences } from './hooks/useSentencesContext';
import { Sentence, SentencesContextType } from './types/sentence.types';

export { SentencesProvider, useSentences };
export type { Sentence, SentencesContextType };
