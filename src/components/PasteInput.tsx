
import React, { useState } from 'react';
import { useSentences } from '../context/SentencesContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Clipboard, Undo2 } from 'lucide-react';

const PasteInput: React.FC = () => {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAddedSentences, setLastAddedSentences] = useState<Array<string>>([]);
  const { bulkAddSentences, removeSentence, sentences } = useSentences();

  const handleProcess = () => {
    if (!text.trim()) {
      toast.error('Please paste some text first');
      return;
    }

    setIsProcessing(true);
    
    try {
      const sentencesToAdd = parseContent(text);
      
      if (sentencesToAdd.length === 0) {
        throw new Error('No valid sentences found in the pasted text');
      }
      
      bulkAddSentences(sentencesToAdd).then(addedSentences => {
        if (addedSentences && addedSentences.length > 0) {
          // Store IDs of added sentences for the undo feature
          const sentenceIds = addedSentences.map(sentence => sentence.id);
          setLastAddedSentences(sentenceIds);
          toast.success(`Added ${addedSentences.length} sentences successfully!`);
        }
      });
      
      // Reset the text area
      setText('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process text');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUndo = async () => {
    if (lastAddedSentences.length === 0) {
      toast.info('Nothing to undo');
      return;
    }

    try {
      // Create a copy before we start modifying the array
      const sentencesToRemove = [...lastAddedSentences];
      
      // Perform removal for each sentence
      for (const id of sentencesToRemove) {
        await removeSentence(id);
      }
      
      toast.success(`Undid the addition of ${sentencesToRemove.length} sentences`);
      
      // Clear the undo history after successful operation
      setLastAddedSentences([]);
    } catch (error) {
      toast.error('Failed to undo the last operation');
      console.error(error);
    }
  };

  const parseContent = (content: string): Array<{arabic: string, english: string, spokenArabic: string}> => {
    // Split by double newlines or multiple newlines to separate sentence groups
    const groups = content.split(/\n\s*\n+/).filter(group => group.trim().length > 0);
    
    const sentences: Array<{arabic: string, english: string, spokenArabic: string}> = [];
    
    for (const group of groups) {
      const lines = group.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      
      // We need at least 3 lines for a complete sentence
      if (lines.length >= 3) {
        const arabic = lines[0];
        const english = lines[1];
        const spokenArabic = lines[2];
        
        // Validate each part has content
        if (arabic && english && spokenArabic) {
          sentences.push({ arabic, english, spokenArabic });
        }
      }
    }
    
    return sentences;
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-3">Paste Multiple Sentences</h2>
      <p className="text-spotify-text mb-4">
        Paste multiple sentences directly. Format each sentence group as:
      </p>
      <ol className="text-spotify-text mb-4 list-decimal list-inside space-y-1">
        <li>Arabic text (first line)</li>
        <li>English translation (second line)</li>
        <li>Phonetic pronunciation (third line)</li>
      </ol>
      <p className="text-spotify-text mb-2">
        Separate each group with a blank line.
      </p>
      
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your sentences here..."
        className="min-h-[150px] mb-4 bg-spotify-black bg-opacity-50 text-spotify-white focus:ring-1 focus:ring-spotify-green focus:outline-none"
      />
      
      <div className="flex gap-2">
        <Button
          onClick={handleProcess}
          disabled={isProcessing}
          className="spotify-button w-full flex items-center justify-center"
        >
          <Clipboard size={18} className="mr-2" />
          {isProcessing ? 'Processing...' : 'Process Text'}
        </Button>
        
        <Button
          onClick={handleUndo}
          disabled={lastAddedSentences.length === 0}
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <Undo2 size={18} className="mr-2" />
          Undo Last Paste
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-spotify-text">
        <p className="font-medium mb-1">Format Example:</p>
        <pre className="bg-spotify-black bg-opacity-30 p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
          {`الطالب بسأل عن القاعدة
The student is asking about the rule
il-ṭālib bsaʾil ʿan il-qāʿida

الفيديو عن الصين
The video is about China
il-fidyū ʿan il-ṣīn`}
        </pre>
      </div>
    </div>
  );
};

export default PasteInput;
