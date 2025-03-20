
import React, { useState, useRef } from 'react';
import { useSentences } from '../context/SentencesContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const BulkUpload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { bulkAddSentences } = useSentences();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const text = await file.text();
      const sentences = parseFileContent(text);
      
      if (sentences.length === 0) {
        throw new Error('No valid sentences found in the file');
      }
      
      bulkAddSentences(sentences);
      toast.success(`Added ${sentences.length} sentences successfully!`);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process file');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const parseFileContent = (content: string): Array<{arabic: string, english: string, spokenArabic: string}> => {
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-3">Bulk Upload</h2>
      <p className="text-spotify-text mb-4">
        Upload a text file with multiple sentences. Format each sentence group as:
      </p>
      <ol className="text-spotify-text mb-4 list-decimal list-inside space-y-1">
        <li>Arabic text (first line)</li>
        <li>English translation (second line)</li>
        <li>Phonetic pronunciation (third line)</li>
      </ol>
      <p className="text-spotify-text mb-4">
        Separate each group with a blank line.
      </p>
      
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      
      <Button
        onClick={handleButtonClick}
        disabled={isUploading}
        className="spotify-button w-full flex items-center justify-center"
      >
        <Upload size={18} className="mr-2" />
        {isUploading ? 'Processing...' : 'Upload File'}
      </Button>
      
      <div className="mt-4 text-sm text-spotify-text">
        <p className="font-medium mb-1">File Format Example:</p>
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

export default BulkUpload;
