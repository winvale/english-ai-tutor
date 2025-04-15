import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const LevelTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [level, setLevel] = useState('');

  const questions = [
    {
      question: "How would you introduce yourself in English?",
      options: [
        "Me... name...",
        "My name is...",
        "I can introduce myself fluently and add details about my background",
      ],
      level: ["A1", "A2", "B1-C2"]
    },
    {
      question: "How comfortable are you with English conversations?",
      options: [
        "I understand basic words",
        "I can have simple conversations",
        "I can discuss complex topics"
      ],
      level: ["A1", "A2-B1", "B2-C2"]
    },
    {
      question: "How well can you understand English movies without subtitles?",
      options: [
        "I need subtitles in my language",
        "I can understand with English subtitles",
        "I can understand without subtitles"
      ],
      level: ["A1-A2", "B1-B2", "C1-C2"]
    }
  ];

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate level
      const levels = newAnswers.map((ans, idx) => questions[idx].level[ans]);
      const estimatedLevel = calculateLevel(levels);
      setLevel(estimatedLevel);
      setShowResult(true);
    }
  };

  const calculateLevel = (levels) => {
    const levelMap = {
      'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6
    };
    
    let totalScore = 0;
    let count = 0;
    
    levels.forEach(level => {
      if (level.includes('-')) {
        const [min, max] = level.split('-');
        totalScore += (levelMap[min] + levelMap[max]) / 2;
      } else {
        totalScore += levelMap[level];
      }
      count++;
    });
    
    const averageScore = totalScore / count;
    
    if (averageScore <= 1.5) return 'A1';
    if (averageScore <= 2.5) return 'A2';
    if (averageScore <= 3.5) return 'B1';
    if (averageScore <= 4.5) return 'B2';
    if (averageScore <= 5.5) return 'C1';
    return 'C2';
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setLevel('');
  };

  const progressPercentage = (currentQuestion / questions.length) * 100;

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-blue-50 rounded-2xl p-8 mb-6">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your English Level</h2>
          <div className="text-5xl font-bold text-blue-600 mb-4">{level}</div>
          <p className="text-gray-600 mb-6">
            Based on your answers, we estimate your English level to be {level}. 
            This is a preliminary assessment and may vary based on specific skills.
          </p>
          <button
            onClick={restartTest}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Test Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelTest;
