
import React from 'react';
import AddSentenceForm from '../components/AddSentenceForm';
import BulkUpload from '../components/BulkUpload';
import PasteInput from '../components/PasteInput';

const Add = () => {
  return (
    <div className="container max-w-md mx-auto px-4 pb-24 pt-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1 animate-fade-in bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Add Sentences</h1>
        <p className="text-spotify-text animate-fade-in">Save new Levantine Arabic phrases to your collection</p>
      </header>

      <div className="animate-fade-in bg-gradient-to-br from-slate-800/40 to-indigo-900/40 backdrop-blur-sm rounded-lg p-4 mb-4 shadow-2xl shadow-blue-500/20 border border-white/10" style={{ animationDelay: '100ms' }}>
        <BulkUpload />
      </div>

      <div className="animate-fade-in bg-gradient-to-br from-slate-800/40 to-purple-900/40 backdrop-blur-sm rounded-lg p-4 mb-4 shadow-2xl shadow-indigo-500/20 border border-white/10" style={{ animationDelay: '125ms' }}>
        <PasteInput />
      </div>

      <div className="animate-fade-in bg-gradient-to-br from-slate-800/40 to-fuchsia-900/40 backdrop-blur-sm rounded-lg p-4 mb-4 shadow-2xl shadow-purple-500/20 border border-white/10" style={{ animationDelay: '150ms' }}>
        <AddSentenceForm />
      </div>

      <div className="mt-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-5 rounded-lg animate-fade-in shadow-2xl shadow-indigo-500/20 border border-white/10" style={{ animationDelay: '200ms' }}>
        <h3 className="text-lg font-medium mb-2 text-white">Input Format</h3>
        <ol className="text-spotify-text space-y-2 list-decimal list-inside">
          <li>Arabic: Original Arabic text (displayed right-to-left)</li>
          <li>English: The English translation</li>
          <li>Phonetic: How to pronounce it (transliteration)</li>
        </ol>
      </div>
    </div>
  );
};

export default Add;
