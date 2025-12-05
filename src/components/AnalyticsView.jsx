import { useState, useMemo } from 'react'
import { getMockDataForGame, getAvailableGameTypes } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Filter, TrendingUp, Clock, Users } from 'lucide-react'

export default function AnalyticsView({ selectedGame }) {
  const [timeThreshold, setTimeThreshold] = useState(30)
  const [scoreMin, setScoreMin] = useState(0)
  const [scoreMax, setScoreMax] = useState(100)
  const [showOutliers, setShowOutliers] = useState(true)

  const gameData = getAvailableGameTypes().find(g => g.gameType === selectedGame)
  const allCandidates = getMockDataForGame(selectedGame)

  // Filter candidates based on filters
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter(candidate => {
      const meetsTimeThreshold = candidate.timeTaken >= timeThreshold
      const meetsScoreRange = candidate.score >= scoreMin && candidate.score <= scoreMax
      return meetsTimeThreshold && meetsScoreRange
    })
  }, [allCandidates, timeThreshold, scoreMin, scoreMax, selectedGame])

  // Calculate statistics
  const statistics = useMemo(() => {
    if (filteredCandidates.length === 0) {
      return { mean: 0, stdDev: 0, count: 0 }
    }

    const scores = filteredCandidates.map(c => c.score)
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    
    const variance = scores.reduce((sum, score) => {
      return sum + Math.pow(score - mean, 2)
    }, 0) / scores.length
    
    const stdDev = Math.sqrt(variance)

    return {
      mean: Math.round(mean * 100) / 100,
      stdDev: Math.round(stdDev * 100) / 100,
      count: filteredCandidates.length
    }
  }, [filteredCandidates])

  // Prepare data for histogram (score distribution)
  const histogramData = useMemo(() => {
    const bins = 20
    const minScore = Math.min(...filteredCandidates.map(c => c.score), 0)
    const maxScore = Math.max(...filteredCandidates.map(c => c.score), 100)
    const binWidth = (maxScore - minScore) / bins

    const binsData = Array.from({ length: bins }, (_, i) => ({
      range: `${Math.round(minScore + i * binWidth)}-${Math.round(minScore + (i + 1) * binWidth)}`,
      count: 0,
      midPoint: minScore + (i + 0.5) * binWidth
    }))

    filteredCandidates.forEach(candidate => {
      const binIndex = Math.min(
        Math.floor((candidate.score - minScore) / binWidth),
        bins - 1
      )
      if (binIndex >= 0) {
        binsData[binIndex].count++
      }
    })

    return binsData
  }, [filteredCandidates])

  // Identify outliers (candidates outside 2 standard deviations)
  const outliers = useMemo(() => {
    if (filteredCandidates.length === 0) return new Set()
    
    const outlierSet = new Set()
    const lowerBound = statistics.mean - 2 * statistics.stdDev
    const upperBound = statistics.mean + 2 * statistics.stdDev

    filteredCandidates.forEach((candidate, index) => {
      if (candidate.score < lowerBound || candidate.score > upperBound) {
        outlierSet.add(index)
      }
    })

    return outlierSet
  }, [filteredCandidates, statistics])

  const displayCandidates = showOutliers 
    ? filteredCandidates 
    : filteredCandidates.filter((_, index) => !outliers.has(index))

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-cyan-500" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time Threshold (seconds)
            </label>
            <input
              type="number"
              value={timeThreshold}
              onChange={(e) => setTimeThreshold(Number(e.target.value))}
              min="0"
              className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            <p className="text-xs text-gray-400 mt-1">
              Exclude attempts under {timeThreshold} seconds
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Score Range (Min)
            </label>
            <input
              type="number"
              value={scoreMin}
              onChange={(e) => setScoreMin(Number(e.target.value))}
              min="0"
              max="100"
              className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Score Range (Max)
            </label>
            <input
              type="number"
              value={scoreMax}
              onChange={(e) => setScoreMax(Number(e.target.value))}
              min="0"
              max="100"
              className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="showOutliers"
            checked={showOutliers}
            onChange={(e) => setShowOutliers(e.target.checked)}
            className="w-4 h-4 text-cyan-500 bg-black border-gray-800 rounded focus:ring-cyan-500"
          />
          <label htmlFor="showOutliers" className="text-sm text-gray-300">
            Show outliers (candidates outside 2 standard deviations)
          </label>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-cyan-500" />
            <h3 className="text-sm font-medium text-gray-400">Mean Score</h3>
          </div>
          <p className="text-3xl font-bold text-cyan-500">{statistics.mean.toFixed(2)}</p>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h3 className="text-sm font-medium text-gray-400">Standard Deviation</h3>
          </div>
          <p className="text-3xl font-bold text-purple-500">{statistics.stdDev.toFixed(2)}</p>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-green-500" />
            <h3 className="text-sm font-medium text-gray-400">Candidates</h3>
          </div>
          <p className="text-3xl font-bold text-green-500">{statistics.count}</p>
        </div>
      </div>

      {/* Distribution Graph */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Score Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
            <XAxis 
              dataKey="range" 
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              stroke="#4b5563"
            />
            <YAxis 
              tick={{ fill: '#9ca3af' }}
              stroke="#4b5563"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0a0a0a', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#06b6d4" 
              fill="#06b6d4" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">
            Candidate Performance Data ({displayCandidates.length} candidates)
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Time Taken
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#0a0a0a] divide-y divide-gray-800">
              {displayCandidates.map((candidate, index) => {
                // Find the original index in filteredCandidates
                const originalIndex = filteredCandidates.findIndex(
                  c => c.candidateName === candidate.candidateName && 
                       c.completionDate === candidate.completionDate
                )
                const isOutlier = originalIndex >= 0 && outliers.has(originalIndex)
                
                return (
                  <tr
                    key={index}
                    className={isOutlier && showOutliers ? 'bg-yellow-500/10' : 'hover:bg-black transition'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {candidate.candidateName}
                        {isOutlier && showOutliers && (
                          <span className="ml-2 px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded">
                            Outlier
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white font-semibold">{candidate.score}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        <Clock className="w-4 h-4 inline mr-1 text-cyan-500" />
                        {candidate.timeTaken}s
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {new Date(candidate.completionDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          // TODO: Implement view details modal
                          console.log('View details for:', candidate)
                        }}
                        className="text-cyan-500 hover:text-cyan-400 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {displayCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No candidates match the current filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

