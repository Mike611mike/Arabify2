
import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { getBestArabicVoice, enhanceAudioQuality, ARABIC_DIALECT } from '../utils/audioVoiceUtils';
import { processTextForNaturalSpeech } from '../utils/audioTextUtils';
import { forceVoiceLoading, prewarmSpeechEngine } from '../utils/audioInitUtils';

export function useAudio() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const retryAttempts = useRef<Record<string, number>>({});
  
  // Check if the browser supports speech synthesis
  const speechSynthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  
  // Clean up any ongoing speech when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesisSupported) {
        window.speechSynthesis.cancel();
      }
      
      // Close AudioContext if it exists
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [speechSynthesisSupported]);

  // Initialize AudioContext for better audio processing
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new AudioContext();
      
      // Resume AudioContext on user interaction to ensure audio playback works
      const resumeAudioContext = () => {
        if (audioContextRef.current && audioContextRef.current.state !== 'running') {
          audioContextRef.current.resume();
        }
      };
      
      document.addEventListener('click', resumeAudioContext);
      document.addEventListener('touchstart', resumeAudioContext);
      
      return () => {
        document.removeEventListener('click', resumeAudioContext);
        document.removeEventListener('touchstart', resumeAudioContext);
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };
    }
  }, []);

  // Load and cache voices when available with enhanced error handling
  useEffect(() => {
    if (!speechSynthesisSupported) return;

    // Prime the speech engine immediately on component mount
    forceVoiceLoading();
    prewarmSpeechEngine();

    // Function to update available voices
    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Log available voices to help with debugging
      if (voices.length) {
        const arabicVoices = voices.filter(voice => voice.lang.startsWith('ar'));
        console.log('Available Arabic voices:', arabicVoices.map(v => `${v.name} (${v.lang})`));
        
        // Check specifically for Egyptian Arabic voices
        const egyptianVoices = voices.filter(voice => voice.lang === ARABIC_DIALECT);
        if (egyptianVoices.length) {
          console.log('Egyptian Arabic voices available:', egyptianVoices.map(v => v.name));
        }
      }
    };

    // Initial load
    updateVoices();

    // Listen for voices changed event (happens asynchronously in some browsers)
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    };
  }, [speechSynthesisSupported]);

  const playAudio = async (text: string, spokenArabic: string, id: string) => {
    try {
      // If already playing this audio, stop it
      if (currentlyPlaying === id) {
        if (speechSynthesisSupported) {
          window.speechSynthesis.cancel();
        }
        setCurrentlyPlaying(null);
        return;
      }
      
      // Check if speech synthesis is supported
      if (!speechSynthesisSupported) {
        throw new Error('Speech synthesis is not supported in this browser');
      }

      setIsLoading({ ...isLoading, [id]: true });
      
      // Always prioritize spokenArabic (Amiyya dialect) for better clarity
      const textToSpeak = spokenArabic || text;
      
      // Process text for more natural speech patterns with emphasis on Amiyya dialect features
      const processedText = processTextForNaturalSpeech(textToSpeak, spokenArabic);
      
      // Cancel any ongoing speech to prevent queuing
      window.speechSynthesis.cancel();
      
      // Create a new speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(processedText);
      
      // Force Egyptian Arabic dialect for all audio
      utterance.lang = ARABIC_DIALECT;
      
      // Apply enhanced audio quality settings
      enhanceAudioQuality(utterance);
      
      // Get the best voice for Arabic (forcing Egyptian dialect)
      const bestVoice = getBestArabicVoice(availableVoices);
      if (bestVoice) {
        utterance.voice = bestVoice;
        console.log(`Using voice: ${bestVoice.name} (${bestVoice.lang})`);
      } else {
        console.log('No optimal Arabic voice found, using default voice.');
      }
      
      // Set event handlers with enhanced error recovery
      utterance.onstart = () => {
        setCurrentlyPlaying(id);
        setIsLoading(prev => ({ ...prev, [id]: false }));
        // Reset retry counter on successful start
        retryAttempts.current[id] = 0;
      };
      
      utterance.onend = () => {
        setCurrentlyPlaying(null);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        
        // Implement retry logic for better reliability
        const attempts = retryAttempts.current[id] || 0;
        if (attempts < 2) {
          retryAttempts.current[id] = attempts + 1;
          console.log(`Retrying audio playback (attempt ${attempts + 1})`);
          
          // Small delay before retry
          setTimeout(() => {
            window.speechSynthesis.speak(utterance);
          }, 500);
          return;
        }
        
        setCurrentlyPlaying(null);
        setIsLoading(prev => ({ ...prev, [id]: false }));
        toast.error('Audio playback failed. Try again.');
      };
      
      // Pre-warm the synthesis engine with a small delay
      // This helps prevent cut-off at the beginning of speech
      window.speechSynthesis.cancel();
      
      // Add a pre-utterance silence for more natural start
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 150);
      
    } catch (error) {
      console.error('Error playing audio:', error);
      toast.error('Failed to play audio. Please try again.');
      setIsLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  return {
    playAudio,
    isPlaying: (id: string) => currentlyPlaying === id,
    isLoading: (id: string) => isLoading[id] || false,
    clearCache: () => {
      if (speechSynthesisSupported) {
        window.speechSynthesis.cancel();
      }
    }
  };
}
