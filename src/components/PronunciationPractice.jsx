import React, { useState, useEffect } from 'react';
import { MicrophoneIcon, SpeakerWaveIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const PronunciationPractice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentWord, setCurrentWord] = useState('hello');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  const words = [
    { word: 'hello', difficulty: 'easy' },
    { word: 'world', difficulty: 'easy' },
    { word: 'pronunciation', difficulty: 'medium' },
    { word: 'vocabulary', difficulty: 'medium' },
    { word: 'conversation', difficulty: 'medium' },
    { word: 'enthusiastic', difficulty: 'hard' },
    { word: 'particularly', difficulty: 'hard' },
    { word: 'entrepreneurship', difficulty: 'hard' }
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
          setFeedback('Perfect pronunciation! ');
          setStreak(prev => prev + 1);
        } else {
          setFeedback(`Try again! You said: "${spokenWord}"`);
          setStreak(0);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setFeedback('Could not hear you clearly. Please try again.');
      };

      if (isListening) {
        recognition.start();
      }

      return () => {
        recognition.stop();
      };
    } else {
      setFeedback('Speech recognition is not supported in this browser.');
    }
  }, [isListening, currentWord]);

  const startListening = () => {
    setIsListening(true);
    setFeedback('');
  };

  const nextWord = () => {
    const currentIndex = words.findIndex(w => w.word === currentWord);
    const nextIndex = (currentIndex + 1) % words.length;
    setCurrentWord(words[nextIndex].word);
    setFeedback('');
    setTranscript('');
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const getCurrentWordObject = () => words.find(w => w.word === currentWord) || words[0];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Current Word</h3>
            <p className={`text-sm ${getDifficultyColor(getCurrentWordObject().difficulty)}`}>
              {getCurrentWordObject().difficulty.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Streak: {streak}</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">{streak}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-4">{currentWord}</div>
          
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={speakWord}
              className="flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <SpeakerWaveIcon className="w-5 h-5 mr-2" />
              Hear Word
            </button>
            
            <button
              onClick={nextWord}
              className="flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <ArrowPathIcon className="w-5 h-5 mr-2" />
              Next Word
            </button>
          </div>

          <button
            onClick={startListening}
            disabled={isListening}
            className={`flex items-center justify-center w-full py-4 rounded-xl transition-all duration-200 ${
              isListening
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <MicrophoneIcon className="w-6 h-6 mr-2" />
            {isListening ? 'Listening...' : 'Start Speaking'}
          </button>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg text-center ${
            feedback.includes('Perfect') 
              ? 'bg-green-50 text-green-800' 
              : feedback.includes('Try again') 
                ? 'bg-yellow-50 text-yellow-800'
                : 'bg-red-50 text-red-800'
          }`}>
            {feedback}
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-medium mb-4">Tips for Better Pronunciation:</h4>
        <ul className="space-y-2 text-gray-600">
          <li>• Listen to the word carefully before speaking</li>
          <li>• Pay attention to word stress and rhythm</li>
          <li>• Practice in a quiet environment</li>
          <li>• Try to match the speed of the audio</li>
        </ul>
      </div>
    </div>
  );
};

export default PronunciationPractice;
