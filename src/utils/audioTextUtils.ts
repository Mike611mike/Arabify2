
/**
 * Process Arabic text to make it sound more natural when spoken
 * Applies various transformations to improve pronunciation clarity
 * and add natural pauses, focused on Amiyya (Egyptian Arabic)
 */
export const processTextForNaturalSpeech = (text: string, spokenArabic: string): string => {
  if (!text) return '';
  
  // Always prioritize Amiyya/spokenArabic when available
  const textToProcess = spokenArabic || text;
  if (!textToProcess) return '';
  
  // Enhanced pronunciation for clarity with increased separation and emphasis
  return textToProcess
    // Add clearer pauses after punctuation for better comprehension
    .replace(/([.،؛!؟])(\s*)/g, '$1 ... $2')
    
    // Enhanced pauses for question marks to improve intonation
    .replace(/([؟?])(\s*)/g, ' ... $1 ... $2')
    
    // Better emphasis on important words in Egyptian dialect
    .replace(/\b(من|إلى|على|في|ده|دي|أنا|إنت|هو|هي|إحنا|هم|لأ|أيوة|عايز|مش|فين|إزيك)\b/g, ' $1 ')
    
    // Add stronger breathing pauses for longer sentences to improve clarity
    .replace(/([^.،؛!؟]{15,30})(\s)/g, '$1 ... $2')
    
    // Separate numbers more clearly for better pronunciation
    .replace(/(\d+)/g, function(match) {
      return match.split('').join(' ');
    })
    
    // Add more pronounced pauses between complex consonant clusters for clarity
    .replace(/([بتثجحخدذرزسشصضطظعغفقكلمنهوي]{2,})/g, '$1 ')
    
    // Enhanced vowel elongation for better natural flow and clarity
    .replace(/([اوي])/g, '$1$1$1')
    
    // Special treatment for Amiyya-specific sounds with clearer pronunciation
    .replace(/ج/g, 'ج́́')    // Egyptian pronunciation is a hard G
    .replace(/ق/g, 'أ')     // in Egyptian dialect ق often becomes a glottal stop
    .replace(/ث/g, 'س')     // in Egyptian dialect ث becomes 's'
    .replace(/ذ/g, 'ز')     // in Egyptian dialect ذ becomes 'z'
    .replace(/ظ/g, 'ز')     // in Egyptian dialect ظ becomes 'z'
    .replace(/ض/g, 'د')     // in Egyptian dialect ض often pronounced as 'd'
    
    // Clean up extra spaces
    .replace(/\s+/g, ' ')
    .trim();
};
