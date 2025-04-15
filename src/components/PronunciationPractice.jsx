import React, { useState, useEffect } from 'react';

const PronunciationPractice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentWord, setCurrentWord] = useState('hello');
  const [feedback, setFeedback] = useState('');

  const words = [
    'hello',
    'world',
    'pronunciation',
    'practice',
    'english'
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const spokenWord = event.results[0][0].transcript.toLowerCase();
        setTranscript(spokenWord);
        
        if (spokenWord.includes(currentWord.toLowerCase())) {
          setFeedback('Great pronunciation! 👏');
        } else {
          setFeedback(`Try again! You said: "${spokenWord}"`);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      if (isListening) {
        recognition.start();
      }

      return () => {
        recognition.stop();
      };
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  }, [isListening, currentWord]);

  const startListening = () => {
    setIsListening(true);
    setFeedback('');
  };

  const nextWord = () => {
    const currentIndex = words.indexOf(currentWord);
    const nextIndex = (currentIndex + 1) % words.length;
    setCurrentWord(words[nextIndex]);
    setFeedback('');
    setTranscript('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Pronunciation Practice</h2>
      
      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-4">{currentWord}</div>
        
        <button
          onClick={startListening}
          disabled={isListening}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isListening ? 'Listening...' : 'Start Speaking'}
        </button>
        
        <button
          onClick={nextWord}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
        >
          Next Word
        </button>
      </div>

      {feedback && (
        <div className={`text-center p-4 rounded-lg ${
          feedback.includes('Great') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default PronunciationPractice;
