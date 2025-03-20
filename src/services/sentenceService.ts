
import { supabase } from '@/integrations/supabase/client';
import { Sentence } from '../context/types/sentence.types';
import { toast } from 'sonner';

export const fetchSentences = async (): Promise<Sentence[]> => {
  try {
    const { data, error } = await supabase
      .from('sentences')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sentences:', error);
      toast.error('Failed to load sentences');
      throw error;
    }

    if (!data) {
      return [];
    }

    // Transform the data to match our Sentence interface
    return data.map(item => ({
      id: item.id,
      arabic: item.arabic,
      english: item.english,
      spokenArabic: item.spoken_arabic,
      createdAt: item.created_at,
      updatedAt: item.created_at, // Use created_at as updatedAt if not available
      mastered: item.mastered,
      favorite: item.favorite
    }));
  } catch (error) {
    console.error('Error in fetchSentences:', error);
    toast.error('Failed to load sentences');
    throw error;
  }
};

export const addSentence = async (arabic: string, english: string, spokenArabic: string): Promise<Sentence> => {
  try {
    const { data, error } = await supabase
      .from('sentences')
      .insert({
        arabic,
        english,
        spoken_arabic: spokenArabic
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding sentence:', error);
      toast.error('Failed to add sentence');
      throw error;
    }

    if (!data) {
      throw new Error('Failed to create sentence - no data returned');
    }

    return {
      id: data.id,
      arabic: data.arabic,
      english: data.english,
      spokenArabic: data.spoken_arabic,
      createdAt: data.created_at,
      updatedAt: data.created_at, // Use created_at as updatedAt if not available
      mastered: data.mastered,
      favorite: data.favorite
    };
  } catch (error) {
    console.error('Error in addSentence:', error);
    toast.error('Failed to add sentence');
    throw error;
  }
};

export const bulkAddSentences = async (
  newSentences: Array<{arabic: string, english: string, spokenArabic: string}>
): Promise<Sentence[]> => {
  try {
    // Format the sentences for Supabase insert
    const sentencesForInsert = newSentences.map(sentence => ({
      arabic: sentence.arabic,
      english: sentence.english,
      spoken_arabic: sentence.spokenArabic
    }));

    const { data, error } = await supabase
      .from('sentences')
      .insert(sentencesForInsert)
      .select();

    if (error) {
      console.error('Error bulk adding sentences:', error);
      toast.error('Failed to add sentences');
      throw error;
    }

    if (!data) {
      throw new Error('Failed to create sentences - no data returned');
    }

    // Transform the returned data to match our Sentence interface
    const formattedSentences: Sentence[] = data.map(item => ({
      id: item.id,
      arabic: item.arabic,
      english: item.english,
      spokenArabic: item.spoken_arabic,
      createdAt: item.created_at,
      updatedAt: item.created_at, // Use created_at as updatedAt if not available
      mastered: item.mastered,
      favorite: item.favorite
    }));

    toast.success(`Added ${formattedSentences.length} sentences successfully!`);
    return formattedSentences;
  } catch (error) {
    console.error('Error in bulkAddSentences:', error);
    toast.error('Failed to add sentences');
    throw error;
  }
};

export const removeSentence = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('sentences')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error removing sentence:', error);
      toast.error('Failed to remove sentence');
      throw error;
    }
  } catch (error) {
    console.error('Error in removeSentence:', error);
    toast.error('Failed to remove sentence');
    throw error;
  }
};

export const toggleMastered = async (id: string, mastered: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('sentences')
      .update({ mastered })
      .eq('id', id);

    if (error) {
      console.error('Error updating mastered status:', error);
      toast.error('Failed to update mastered status');
      throw error;
    }
    
    toast.success(`Sentence marked as ${mastered ? 'mastered' : 'not mastered'}`);
  } catch (error) {
    console.error('Error in toggleMastered:', error);
    toast.error('Failed to update mastered status');
    throw error;
  }
};

export const toggleFavorite = async (id: string, favorite: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('sentences')
      .update({ favorite })
      .eq('id', id);

    if (error) {
      console.error('Error updating favorite status:', error);
      toast.error('Failed to update favorite status');
      throw error;
    }
    
    toast.success(`Sentence ${favorite ? 'added to' : 'removed from'} favorites`);
  } catch (error) {
    console.error('Error in toggleFavorite:', error);
    toast.error('Failed to update favorite status');
    throw error;
  }
};
