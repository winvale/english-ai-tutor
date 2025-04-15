import { useState } from 'react'
import LevelTest from './components/LevelTest'
import PronunciationPractice from './components/PronunciationPractice'
import AIChat from './components/AIChat'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('test')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">English AI Tutor</h1>
          <nav className="mt-4">
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => setCurrentSection('test')}
                  className={`px-4 py-2 rounded-lg ${currentSection === 'test' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                >
                  Level Test
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentSection('pronunciation')}
                  className={`px-4 py-2 rounded-lg ${currentSection === 'pronunciation' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                >
                  Pronunciation Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentSection('chat')}
                  className={`px-4 py-2 rounded-lg ${currentSection === 'chat' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                >
                  Chat with AI
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentSection === 'test' && <LevelTest />}
        {currentSection === 'pronunciation' && <PronunciationPractice />}
        {currentSection === 'chat' && <AIChat />}
      </main>
    </div>
  )
}

export default App
