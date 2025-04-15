import React, { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your English tutor. Let's practice conversation. What would you like to talk about today? We can discuss:",
      suggestions: [
        "Your hobbies",
        "Your daily routine",
        "Your favorite movies",
        "Your future plans"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedSuggestion) return;

    const userMessage = {
      role: 'user',
      content: selectedSuggestion || input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedSuggestion(null);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: getSimulatedResponse(userMessage.content),
        suggestions: getRandomSuggestions()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getRandomSuggestions = () => {
    const allSuggestions = [
      ["Tell me more about that", "Why do you like it?", "How often do you do that?"],
      ["What's your opinion on that?", "Can you give an example?", "How does that make you feel?"],
      ["That's interesting! What else?", "When did you start?", "What's your favorite part?"],
      ["Do you have any goals related to that?", "What inspired you?", "How do you practice?"]
    ];
    return allSuggestions[Math.floor(Math.random() * allSuggestions.length)];
  };

  const getSimulatedResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('hobby') || input.includes('like to')) {
      return "That's a fascinating hobby! Could you tell me more about when you started and what you enjoy most about it?";
    } else if (input.includes('routine') || input.includes('daily')) {
      return "Interesting! Having a daily routine is important. What's your favorite part of your day?";
    } else if (input.includes('movie') || input.includes('film')) {
      return "Movies are a great way to learn English! What genres do you prefer, and do you watch them with subtitles?";
    } else if (input.includes('future') || input.includes('plan')) {
      return "It's great that you're thinking about the future! What steps are you taking to achieve your goals?";
    } else {
      return "That's really interesting! Could you elaborate more on that? I'd love to hear more details.";
    }
  };

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div key={index} className="mb-6">
              <div
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm md:text-base">{message.content}</p>
                </div>
              </div>
              
              {message.suggestions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSuggestion(suggestion)}
                      className="text-sm bg-gray-50 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={selectedSuggestion || input}
              onChange={(e) => {
                setSelectedSuggestion(null);
                setInput(e.target.value);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={startRecording}
              className={`p-2 rounded-lg transition-colors ${
                isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MicrophoneIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-6">
        <h4 className="font-medium text-blue-800 mb-3">Conversation Tips:</h4>
        <ul className="space-y-2 text-sm text-blue-600">
          <li>• Try to speak in complete sentences</li>
          <li>• Don't worry about making mistakes</li>
          <li>• Use the suggestion buttons for ideas</li>
          <li>• Practice speaking naturally with the voice input</li>
        </ul>
      </div>
    </div>
  );
};

export default AIChat;
