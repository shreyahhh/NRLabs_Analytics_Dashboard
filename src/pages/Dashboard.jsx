import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import GameSelector from '../components/GameSelector'
import AnalyticsView from '../components/AnalyticsView'
import { getAvailableGameTypes } from '../data/mockData'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [selectedGame, setSelectedGame] = useState(null)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const gameName = getAvailableGameTypes().find(g => g.gameType === selectedGame)?.gameName || 'Analytics'

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-[#0a0a0a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <img 
                src="/neurazor-logo.png" 
                alt="NeuRazor Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">NeuRazor Analytics</h1>
                <p className="text-sm text-gray-400">Performance Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.email}</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedGame ? (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to Analytics Dashboard</h2>
              <p className="text-gray-400">
                Select a base game below to view aggregate candidate performance data.
              </p>
            </div>
            <GameSelector
              selectedGame={selectedGame}
              onGameSelect={setSelectedGame}
            />
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="text-cyan-500 hover:text-cyan-400 mb-2 text-sm font-medium transition"
                >
                  ← Back to Game Selection
                </button>
                <h2 className="text-3xl font-bold text-white">{gameName}</h2>
              </div>
            </div>
            <AnalyticsView selectedGame={selectedGame} />
          </div>
        )}
      </main>
    </div>
  )
}

