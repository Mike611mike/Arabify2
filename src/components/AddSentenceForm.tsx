
import React, { useState } from 'react';
import { useSentences } from '../context/SentencesContext';
import { toast } from 'sonner';

const AddSentenceForm: React.FC = () => {
  const [arabic, setArabic] = useState('');
  const [english, setEnglish] = useState('');
  const [spokenArabic, setSpokenArabic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addSentence } = useSentences();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!arabic.trim() || !english.trim() || !spokenArabic.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addSentence(arabic, english, spokenArabic);
      
      // Reset form
      setArabic('');
      setEnglish('');
      setSpokenArabic('');
      
      toast.success('Sentence added successfully!');
    } catch (error) {
      console.error('Error adding sentence:', error);
      toast.error('Failed to add sentence');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 glass-card rounded-xl p-6 animate-fade-in">
      <div>
        <label htmlFor="arabic" className="block text-xs uppercase tracking-wider text-spotify-text mb-1">
          Arabic
        </label>
        <input
          id="arabic"
          type="text"
          value={arabic}
          onChange={(e) => setArabic(e.target.value)}
          placeholder="اكتب الجملة العربية هنا"
          className="w-full bg-spotify-black bg-opacity-50 text-spotify-white p-3 rounded-md arabic-text focus:ring-1 focus:ring-spotify-green focus:outline-none"
          dir="rtl"
        />
      </div>
      
      <div>
        <label htmlFor="english" className="block text-xs uppercase tracking-wider text-spotify-text mb-1">
          English
        </label>
        <input
          id="english"
          type="text"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          placeholder="Enter the English translation here"
          className="w-full bg-spotify-black bg-opacity-50 text-spotify-white p-3 rounded-md focus:ring-1 focus:ring-spotify-green focus:outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="spokenArabic" className="block text-xs uppercase tracking-wider text-spotify-text mb-1">
          Spoken Arabic (Phonetic)
        </label>
        <input
          id="spokenArabic"
          type="text"
          value={spokenArabic}
          onChange={(e) => setSpokenArabic(e.target.value)}
          placeholder="Enter the phonetic transcription here"
          className="w-full bg-spotify-black bg-opacity-50 text-spotify-white p-3 rounded-md focus:ring-1 focus:ring-spotify-green focus:outline-none"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`spotify-button w-full flex justify-center items-center ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <span className="animate-pulse">Adding...</span>
        ) : (
          'Add Sentence'
        )}
      </button>
    </form>
  );
};

export default AddSentenceForm;
