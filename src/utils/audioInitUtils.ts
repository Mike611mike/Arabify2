
/**
 * Force browser to load voices early
 * This helps prevent the first utterance from using the default voice
 */
export const forceVoiceLoading = (): void => {
  if (typeof speechSynthesis !== 'undefined') {
    // Create a silent utterance to force voice loading
    const utterance = new SpeechSynthesisUtterance('');
    utterance.volume = 0;
    utterance.rate = 0;
    
    // Add onvoiceschanged handler - will fire when voices are ready
    if (speechSynthesis.getVoices().length === 0) {
      console.log('Preloading speech synthesis voices...');
      speechSynthesis.addEventListener('voiceschanged', () => {
        console.log('Speech synthesis voices loaded:', speechSynthesis.getVoices().length);
      }, { once: true });
    }
    
    // Speak the silent utterance to trigger voice loading
    speechSynthesis.speak(utterance);
    speechSynthesis.cancel();
  }
};

/**
 * Prewarm the speech synthesis engine with Arabic sounds
 * This helps voice quality be more consistent from the first utterance
 */
export const prewarmSpeechEngine = (): void => {
  if (typeof speechSynthesis !== 'undefined') {
    // Common Arabic sounds to prewarm the speech engine
    const preloadText = 'ا ب ت';
    const utterance = new SpeechSynthesisUtterance(preloadText);
    utterance.lang = 'ar-EG';
    utterance.volume = 0; // Silent
    utterance.rate = 3; // Fast - just to prime the engine
    
    console.log('Prewarming speech synthesis engine for Arabic...');
    speechSynthesis.speak(utterance);
    
    // Cancel after a short delay to prevent any potential sound
    setTimeout(() => {
      speechSynthesis.cancel();
      console.log('Speech engine prewarmed for Arabic');
    }, 100);
  }
};
