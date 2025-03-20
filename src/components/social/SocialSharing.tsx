
import React from 'react';
import { Share2, Link, Facebook, Twitter, Copy, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SocialSharingProps {
  text: string;
  translation: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

const SocialSharing: React.FC<SocialSharingProps> = ({
  text,
  translation,
  size = 'sm',
  variant = 'ghost'
}) => {
  const [copied, setCopied] = React.useState(false);
  
  // Size mappings
  const sizeMap = {
    sm: { buttonSize: 'sm' as const, iconSize: 16 },
    md: { buttonSize: 'default' as const, iconSize: 18 },
    lg: { buttonSize: 'lg' as const, iconSize: 20 }
  };
  
  const { buttonSize, iconSize } = sizeMap[size];
  
  // Prepare the content to be shared
  const shareContent = `${text}\n\n${translation}\n\nLearned with Arabify`;
  
  // Function to copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareContent).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      toast.error('Failed to copy text');
    });
  };
  
  // Share via Twitter
  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent)}`;
    window.open(url, '_blank');
  };
  
  // Share via Facebook
  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareContent)}`;
    window.open(url, '_blank');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={buttonSize} variant={variant} aria-label="Share">
          <Share2 size={iconSize} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyToClipboard} className="flex items-center">
          {copied ? <CheckCheck size={16} className="mr-2 text-spotify-green" /> : <Copy size={16} className="mr-2" />}
          Copy to clipboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareTwitter} className="flex items-center">
          <Twitter size={16} className="mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareFacebook} className="flex items-center">
          <Facebook size={16} className="mr-2" />
          Share on Facebook
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialSharing;
