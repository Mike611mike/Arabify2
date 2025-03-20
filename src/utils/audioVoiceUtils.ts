
// Utility functions for selecting and optimizing speech synthesis voices

// Exclusively targeting Egyptian Arabic dialect for Amiyya
export const ARABIC_DIALECT = 'ar-EG';

/**
 * Finds the optimal voice for Arabic speech synthesis,
 * with strong preference for Egyptian (Amiyya) dialect voices
 */
export const getBestArabicVoice = (availableVoices: SpeechSynthesisVoice[]) => {
  if (!availableVoices.length) return null;
  
  // Prioritize voices in this order:
  
  // 1. Egyptian Arabic dialect (ar-EG) - Amiyya
  const egyptianDialectVoice = availableVoices.find(voice => 
    voice.lang === ARABIC_DIALECT
  );
  if (egyptianDialectVoice) return egyptianDialectVoice;
  
  // 2. Premium/cloud female Egyptian-like voices
  const premiumFemaleEgyptian = availableVoices.find(voice => 
    voice.lang.startsWith('ar') && 
    !voice.localService &&
    (voice.name.toLowerCase().includes('laila') || // Common Egyptian female names
     voice.name.toLowerCase().includes('salma') ||
     voice.name.toLowerCase().includes('samira') ||
     voice.name.toLowerCase().includes('amira') ||
     voice.name.toLowerCase().includes('nour'))
  );
  if (premiumFemaleEgyptian) return premiumFemaleEgyptian;
  
  // 3. Any premium Arabic voice (better quality than local)
  const premiumArabicVoice = availableVoices.find(voice => 
    voice.lang.startsWith('ar') && 
    !voice.localService
  );
  if (premiumArabicVoice) return premiumArabicVoice;
  
  // 4. Any Arabic voice as fallback
  const anyArabicVoice = availableVoices.find(voice => 
    voice.lang.startsWith('ar')
  );
  if (anyArabicVoice) return anyArabicVoice;
  
  // Last resort: first available voice
  return availableVoices[0];
};

/**
 * Apply enhanced audio quality settings for clearer speech
 */
export const enhanceAudioQuality = (utterance: SpeechSynthesisUtterance): void => {
  // Adjust rate for clearer articulation based on text length
  const textLength = utterance.text.length;
  let rate = 0.85; // Slower base rate for better clarity
  
  if (textLength < 15) {
    rate = 0.9; // Slightly faster for short phrases
  } else if (textLength > 100) {
    rate = 0.8; // Slower for longer passages for clarity
  }
  
  utterance.rate = rate;
  
  // Subtle pitch adjustments for more natural Egyptian dialect sound
  utterance.pitch = 1.05;
  
  // Full volume for clarity
  utterance.volume = 1.0;
};
