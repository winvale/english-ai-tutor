import React, { useState } from 'react';

const LevelTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

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
    }
  ];

  const handleAnswer = (answerIndex) => {
    setAnswers([...answers, answerIndex]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate level
      const levels = answers.map((ans, idx) => questions[idx].level[ans]);
      // For now just show the last selected level
      alert(`Based on your answers, your estimated level is: ${levels[levels.length - 1]}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">English Level Test</h2>
      {currentQuestion < questions.length ? (
        <div>
          <h3 className="text-xl mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full p-3 text-left rounded-lg border border-gray-300 hover:bg-blue-50"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Test completed! Check your results above.</p>
        </div>
      )}
    </div>
  );
};

export default LevelTest;
