
import React, { useState } from 'react';
import { Volume2, Volume1, VolumeX, Play, Pause, SkipBack, Ear } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface EnhancedAudioControlsProps {
  arabic: string;
  spokenArabic: string;
  id: string;
  showSpeedControl?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

const EnhancedAudioControls: React.FC<EnhancedAudioControlsProps> = ({
  arabic,
  spokenArabic,
  id,
  showSpeedControl = true,
  size = 'md',
  variant = 'outline'
}) => {
  const { playAudio, isPlaying, isLoading } = useAudio();
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(1.0);
  const [muted, setMuted] = useState(false);
  
  // Size mappings
  const sizeMap = {
    sm: {
      buttonSize: 'sm' as const,
      iconSize: 16,
      containerClass: 'gap-1'
    },
    md: {
      buttonSize: 'sm' as const,
      iconSize: 18,
      containerClass: 'gap-2'
    },
    lg: {
      buttonSize: 'default' as const,
      iconSize: 20,
      containerClass: 'gap-3'
    }
  };
  
  const { buttonSize, iconSize, containerClass } = sizeMap[size];
  
  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    setMuted(newVolume[0] === 0);
    
    // In a real implementation, this would adjust the actual audio element volume
    toast.info(`Volume set to ${newVolume[0]}%`, { duration: 1000 });
  };
  
  // Handle speed change
  const handleSpeedChange = (newSpeed: number[]) => {
    setSpeed(newSpeed[0]);
    
    // In a real implementation, this would adjust the speech rate
    toast.info(`Speed set to ${newSpeed[0].toFixed(1)}x`, { duration: 1000 });
  };
  
  // Handle play button click
  const handlePlay = () => {
    if (muted) {
      toast.error('Audio is muted. Increase volume to play.', { duration: 2000 });
      return;
    }
    
    // Call the existing playAudio function with additional params
    playAudio(arabic, spokenArabic, id);
  };
  
  // Get volume icon based on current volume
  const getVolumeIcon = () => {
    if (muted || volume === 0) return <VolumeX size={iconSize} />;
    if (volume < 50) return <Volume1 size={iconSize} />;
    return <Volume2 size={iconSize} />;
  };
  
  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
    if (!muted) {
      toast.info('Audio muted', { duration: 1000 });
    } else {
      toast.info('Audio unmuted', { duration: 1000 });
      setVolume(80); // Reset to default volume when unmuting
    }
  };
  
  return (
    <div className={`flex items-center ${containerClass}`}>
      {/* Play Button */}
      <Button 
        size={buttonSize} 
        variant={variant}
        onClick={handlePlay}
        disabled={isLoading(id)}
        className="relative"
        aria-label={isPlaying(id) ? 'Pause' : 'Play'}
      >
        {isLoading(id) ? (
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : isPlaying(id) ? (
          <Pause size={iconSize} />
        ) : (
          <Play size={iconSize} />
        )}
      </Button>
      
      {/* Volume Control */}
      <div className="flex items-center gap-1">
        <Button 
          size={buttonSize} 
          variant="ghost"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {getVolumeIcon()}
        </Button>
        <Slider
          defaultValue={[volume]}
          max={100}
          step={1}
          value={[muted ? 0 : volume]}
          onValueChange={handleVolumeChange}
          className="w-20"
        />
      </div>
      
      {/* Speed Control (optional) */}
      {showSpeedControl && (
        <div className="flex items-center gap-1">
          <Button
            size={buttonSize}
            variant="ghost"
            onClick={() => setSpeed(1.0)}
            aria-label="Reset speed"
          >
            <Ear size={iconSize} />
          </Button>
          <Slider
            defaultValue={[1.0]}
            min={0.5}
            max={2.0}
            step={0.1}
            value={[speed]}
            onValueChange={handleSpeedChange}
            className="w-20"
          />
          <span className="text-xs text-spotify-text">
            {speed.toFixed(1)}x
          </span>
        </div>
      )}
    </div>
  );
};

export default EnhancedAudioControls;
