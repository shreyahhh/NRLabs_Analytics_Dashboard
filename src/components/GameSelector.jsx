import { getAvailableGameTypes } from '../data/mockData'
import { Gamepad2, Calculator, Eye, BookOpen, CreditCard, Grid, MessageSquare, User, Lightbulb } from 'lucide-react'

const gameIcons = {
  stroop_test: Eye,
  math_sprint: Calculator,
  creative_uses: Lightbulb,
  scenario_challenge: BookOpen,
  card_flip: CreditCard,
  sign_sudoku: Grid,
  debate_mode: MessageSquare,
  interview_mode: User,
  bart_test: Gamepad2
}

const gameColors = {
  stroop_test: 'blue',
  math_sprint: 'green',
  creative_uses: 'yellow',
  scenario_challenge: 'purple',
  card_flip: 'orange',
  sign_sudoku: 'indigo',
  debate_mode: 'pink',
  interview_mode: 'teal',
  bart_test: 'red'
}

export default function GameSelector({ selectedGame, onGameSelect }) {
  const games = getAvailableGameTypes()

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Select Base Game</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => {
          const Icon = gameIcons[game.gameType] || Gamepad2
          const color = gameColors[game.gameType] || 'gray'
          const isSelected = selectedGame === game.gameType

          const colorClasses = {
            blue: isSelected ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-cyan-500/50 text-white',
            green: isSelected ? 'bg-green-500 text-black border-green-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-green-500/50 text-white',
            yellow: isSelected ? 'bg-yellow-500 text-black border-yellow-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-yellow-500/50 text-white',
            purple: isSelected ? 'bg-purple-500 text-black border-purple-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-purple-500/50 text-white',
            orange: isSelected ? 'bg-orange-500 text-black border-orange-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-orange-500/50 text-white',
            indigo: isSelected ? 'bg-indigo-500 text-black border-indigo-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-indigo-500/50 text-white',
            pink: isSelected ? 'bg-pink-500 text-black border-pink-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-pink-500/50 text-white',
            teal: isSelected ? 'bg-teal-500 text-black border-teal-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-teal-500/50 text-white',
            red: isSelected ? 'bg-red-500 text-black border-red-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-red-500/50 text-white',
            gray: isSelected ? 'bg-gray-500 text-black border-gray-400' : 'bg-[#0a0a0a] border-gray-800 hover:border-gray-500/50 text-white'
          }

          const iconColorClass = isSelected ? 'text-black' : 
            color === 'blue' ? 'text-cyan-500' :
            color === 'green' ? 'text-green-500' :
            color === 'yellow' ? 'text-yellow-500' :
            color === 'purple' ? 'text-purple-500' :
            color === 'orange' ? 'text-orange-500' :
            color === 'indigo' ? 'text-indigo-500' :
            color === 'pink' ? 'text-pink-500' :
            color === 'teal' ? 'text-teal-500' :
            color === 'red' ? 'text-red-500' : 'text-gray-400'

          return (
            <button
              key={game.gameType}
              onClick={() => onGameSelect(game.gameType)}
              className={`p-4 rounded-lg border-2 transition-all ${colorClasses[color]} ${
                isSelected ? 'shadow-lg shadow-cyan-500/20 scale-105' : 'shadow'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${iconColorClass}`} />
                <span className="font-semibold text-left">{game.gameName}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

