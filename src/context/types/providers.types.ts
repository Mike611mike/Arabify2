
import { Dispatch, SetStateAction } from 'react';
import { Sentence } from './sentence.types';
import { SentenceProgress } from '@/utils/localStorage';

export interface SentencesProviderBaseProps {
  sentences: Sentence[];
  setSentences: Dispatch<SetStateAction<Sentence[]>>;
  progress: Record<string, SentenceProgress>;
  setProgress: Dispatch<SetStateAction<Record<string, SentenceProgress>>>;
  initializeProgress: (id: string) => SentenceProgress;
}

export interface SentencesOnlineProps extends SentencesProviderBaseProps {}

export interface SentencesOfflineProps extends SentencesProviderBaseProps {
  isOffline: boolean;
}
