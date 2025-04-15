import { useState } from 'react'
import LevelTest from './components/LevelTest'
import PronunciationPractice from './components/PronunciationPractice'
import AIChat from './components/AIChat'
import { BookOpenIcon, MicrophoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('test')

  const menuItems = [
    {
      id: 'test',
      name: 'Level Test',
      icon: BookOpenIcon,
      description: 'Find out your English level'
    },
    {
      id: 'pronunciation',
      name: 'Pronunciation',
      icon: MicrophoneIcon,
      description: 'Practice your pronunciation'
    },
    {
      id: 'chat',
      name: 'AI Chat',
      icon: ChatBubbleLeftRightIcon,
      description: 'Chat with AI tutor'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-blue-600">English AI Tutor</h1>
              <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Beta</span>
            </div>
            <nav className="mt-4 md:mt-0">
              <ul className="flex flex-wrap gap-2 md:gap-4">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentSection(item.id)}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                        currentSection === item.id
                          ? 'bg-blue-500 text-white shadow-lg scale-105'
                          : 'text-gray-600 hover:bg-blue-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`cursor-pointer p-6 rounded-xl transition-all duration-200 ${
                currentSection === item.id
                  ? 'bg-white shadow-lg scale-105 border-2 border-blue-500'
                  : 'bg-white/50 hover:bg-white hover:shadow-md'
              }`}
            >
              <item.icon className={`w-8 h-8 ${
                currentSection === item.id ? 'text-blue-500' : 'text-gray-500'
              }`} />
              <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {currentSection === 'test' && <LevelTest />}
          {currentSection === 'pronunciation' && <PronunciationPractice />}
          {currentSection === 'chat' && <AIChat />}
        </div>
      </main>

      <footer className="mt-12 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            English AI Tutor - Learn English with AI {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
