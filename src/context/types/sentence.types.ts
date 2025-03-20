
export interface Sentence {
  id: string;
  arabic: string;
  spokenArabic: string;
  english: string;
  createdAt: string | number; // Update to accept both string and number
  updatedAt: string | number; // Update to accept both string and number
  favorite: boolean;
  mastered: boolean;
  stats?: {
    total: number;
    mastered: number;
    percentage: number;
  };
}

export type AddSentencePayload = {
  arabic: string;
  spokenArabic: string;
  english: string;
};

export type UpdateSentencePayload = Partial<Sentence>;

export interface SentencesContextType {
  sentences: Sentence[];
  addSentence: (arabic: string, english: string, spokenArabic: string) => Promise<Sentence | undefined>;
  bulkAddSentences: (newSentences: Array<{arabic: string, english: string, spokenArabic: string}>) => Promise<Sentence[] | undefined>;
  removeSentence: (id: string) => Promise<void>;
  getRandomSentence: () => Sentence | null;
  toggleMastered: (id: string, mastered: boolean) => Promise<void>;
  toggleFavorite: (id: string, favorite: boolean) => Promise<void>;
  isLoading: boolean;
  isOffline: boolean;
  updateReviewProgress: (id: string, quality: number) => void; // Change from 'success' | 'fail' to number
  getSentencesDueForReview: () => Sentence[];
  sentenceProgress: Record<string, any>;
  stats: {
    total: number;
    mastered: number;
    percentage: number;
  };
}
