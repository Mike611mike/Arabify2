
import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
}

export const useKeyboardNavigation = ({
  onPrev,
  onNext,
  disabled = false
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return; // Don't process keypresses while disabled
      
      if (event.key === 'ArrowLeft') {
        onPrev();
      } else if (event.key === 'ArrowRight') {
        onNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [disabled, onPrev, onNext]);
};
