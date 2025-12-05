// Mock data generator for Analytics Dashboard
// Generates realistic candidate performance data for different base games

export interface CandidateData {
  candidateName: string
  score: number
  timeTaken: number // seconds
  completionDate: string // ISO date string
  accuracyRate?: number // 0-100, for games that have accuracy
  attempts?: number // for games with multiple attempts
  [key: string]: any // for game-specific metadata
}

export interface GameMockData {
  gameType: string
  gameName: string
  candidates: CandidateData[]
}

// Generate random names
const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
  'Blake', 'Cameron', 'Dakota', 'Emery', 'Finley', 'Harper', 'Hayden', 'Jamie',
  'Kai', 'Logan', 'Parker', 'Reese', 'Rowan', 'Sage', 'Skylar', 'Tyler',
  'Aiden', 'Bella', 'Carter', 'Diana', 'Ethan', 'Fiona', 'Grace', 'Henry',
  'Isabella', 'Jack', 'Katherine', 'Liam', 'Mia', 'Noah', 'Olivia', 'Penelope',
  'Quinn', 'Ryan', 'Sophia', 'Thomas', 'Uma', 'Victoria', 'William', 'Zoe'
]

const lastNames = [
  'Anderson', 'Brown', 'Chen', 'Davis', 'Evans', 'Foster', 'Garcia', 'Harris',
  'Jackson', 'Kim', 'Lee', 'Martinez', 'Nguyen', 'Patel', 'Rodriguez', 'Singh',
  'Thompson', 'Wang', 'White', 'Wilson', 'Yang', 'Zhang', 'Adams', 'Baker',
  'Clark', 'Cooper', 'Edwards', 'Green', 'Hall', 'Hill', 'Johnson', 'Jones',
  'King', 'Lewis', 'Miller', 'Moore', 'Nelson', 'Parker', 'Roberts', 'Scott',
  'Smith', 'Taylor', 'Turner', 'Walker', 'Ward', 'Watson', 'Williams', 'Wright'
]

const getRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}

const getRandomDate = (daysAgo: number = 90) => {
  const now = new Date()
  const daysBack = Math.floor(Math.random() * daysAgo)
  const date = new Date(now)
  date.setDate(date.getDate() - daysBack)
  date.setHours(Math.floor(Math.random() * 24))
  date.setMinutes(Math.floor(Math.random() * 60))
  return date.toISOString()
}

// Game-specific data generators
const generateStroopTestData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 55; i++) {
    // Stroop Test: Score 0-100, time 45-180 seconds, accuracy 60-100%
    const score = Math.round(Math.random() * 40 + 60) // 60-100
    const timeTaken = Math.round(Math.random() * 135 + 45) // 45-180 seconds
    const accuracyRate = Math.round(Math.random() * 40 + 60) // 60-100%
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      accuracyRate,
      correctAnswers: Math.round((accuracyRate / 100) * 30),
      totalQuestions: 30
    })
  }
  return candidates
}

const generateMathSprintData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 58; i++) {
    // Math Sprint: Score 0-100, time 60-300 seconds, accuracy 50-95%
    const score = Math.round(Math.random() * 45 + 55) // 55-100
    const timeTaken = Math.round(Math.random() * 240 + 60) // 60-300 seconds
    const accuracyRate = Math.round(Math.random() * 45 + 50) // 50-95%
    const problemsSolved = Math.round(Math.random() * 30 + 20) // 20-50
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      accuracyRate,
      problemsSolved,
      totalProblems: problemsSolved + Math.round(Math.random() * 10)
    })
  }
  return candidates
}

const generateCreativeUsesData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 52; i++) {
    // Creative Uses: Score 0-100, time 120-600 seconds, originality score
    const score = Math.round(Math.random() * 50 + 50) // 50-100
    const timeTaken = Math.round(Math.random() * 480 + 120) // 120-600 seconds
    const usesGenerated = Math.round(Math.random() * 20 + 10) // 10-30
    const originalityScore = Math.round(Math.random() * 30 + 70) // 70-100
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      usesGenerated,
      originalityScore,
      fluencyScore: Math.round(score * 0.7),
      flexibilityScore: Math.round(score * 0.3)
    })
  }
  return candidates
}

const generateScenarioChallengeData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 48; i++) {
    // Scenario Challenge: Score 0-100, time 180-900 seconds
    const score = Math.round(Math.random() * 40 + 60) // 60-100
    const timeTaken = Math.round(Math.random() * 720 + 180) // 180-900 seconds
    const responseQuality = Math.round(Math.random() * 30 + 70) // 70-100
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      responseQuality,
      wordCount: Math.round(Math.random() * 300 + 200), // 200-500 words
      scenariosCompleted: Math.round(Math.random() * 2 + 3) // 3-5 scenarios
    })
  }
  return candidates
}

const generateCardFlipData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 50; i++) {
    // Card Flip: Score 0-100, time 60-300 seconds, attempts
    const score = Math.round(Math.random() * 50 + 50) // 50-100
    const timeTaken = Math.round(Math.random() * 240 + 60) // 60-300 seconds
    const attempts = Math.round(Math.random() * 20 + 15) // 15-35 attempts
    const pairsFound = Math.round(attempts * 0.6)
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      attempts,
      pairsFound,
      totalPairs: 12,
      accuracyRate: Math.round((pairsFound / attempts) * 100)
    })
  }
  return candidates
}

const generateSignSudokuData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 47; i++) {
    // Sign Sudoku: Score 0-100, time 120-600 seconds
    const score = Math.round(Math.random() * 40 + 60) // 60-100
    const timeTaken = Math.round(Math.random() * 480 + 120) // 120-600 seconds
    const cellsCompleted = Math.round(Math.random() * 20 + 60) // 60-80 cells
    const errors = Math.round(Math.random() * 5)
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      cellsCompleted,
      totalCells: 81,
      errors,
      accuracyRate: Math.round(((cellsCompleted - errors) / cellsCompleted) * 100)
    })
  }
  return candidates
}

const generateDebateModeData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 45; i++) {
    // Debate Mode: Score 0-100, time 300-1200 seconds
    const score = Math.round(Math.random() * 35 + 65) // 65-100
    const timeTaken = Math.round(Math.random() * 900 + 300) // 300-1200 seconds
    const prosCount = Math.round(Math.random() * 5 + 5) // 5-10 pros
    const consCount = Math.round(Math.random() * 5 + 5) // 5-10 cons
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      prosCount,
      consCount,
      argumentQuality: Math.round(Math.random() * 25 + 75), // 75-100
      wordCount: Math.round(Math.random() * 400 + 300) // 300-700 words
    })
  }
  return candidates
}

const generateInterviewModeData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 43; i++) {
    // Interview Mode: Score 0-100, time 600-1800 seconds
    const score = Math.round(Math.random() * 30 + 70) // 70-100
    const timeTaken = Math.round(Math.random() * 1200 + 600) // 600-1800 seconds
    const questionsAnswered = Math.round(Math.random() * 2 + 3) // 3-5 questions
    const averageResponseLength = Math.round(Math.random() * 200 + 300) // 300-500 words
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      questionsAnswered,
      averageResponseLength,
      responseQuality: Math.round(Math.random() * 20 + 80) // 80-100
    })
  }
  return candidates
}

const generateBARTTestData = (): CandidateData[] => {
  const candidates: CandidateData[] = []
  for (let i = 0; i < 40; i++) {
    // BART Test: Score 0-100, time 180-600 seconds
    const score = Math.round(Math.random() * 50 + 50) // 50-100
    const timeTaken = Math.round(Math.random() * 420 + 180) // 180-600 seconds
    const balloonsPopped = Math.round(Math.random() * 10 + 5) // 5-15
    const totalPumps = Math.round(Math.random() * 50 + 30) // 30-80
    const riskScore = Math.round(Math.random() * 40 + 60) // 60-100
    
    candidates.push({
      candidateName: getRandomName(),
      score,
      timeTaken,
      completionDate: getRandomDate(),
      balloonsPopped,
      totalPumps,
      riskScore,
      averagePumpsPerBalloon: Math.round(totalPumps / (balloonsPopped + 1))
    })
  }
  return candidates
}

// Export all mock data
export const mockData: GameMockData[] = [
  {
    gameType: 'stroop_test',
    gameName: 'Stroop Test',
    candidates: generateStroopTestData()
  },
  {
    gameType: 'math_sprint',
    gameName: 'Mental Math Sprint',
    candidates: generateMathSprintData()
  },
  {
    gameType: 'creative_uses',
    gameName: 'Creative Uses',
    candidates: generateCreativeUsesData()
  },
  {
    gameType: 'scenario_challenge',
    gameName: 'Scenario Challenge',
    candidates: generateScenarioChallengeData()
  },
  {
    gameType: 'card_flip',
    gameName: 'Card Flip Challenge',
    candidates: generateCardFlipData()
  },
  {
    gameType: 'sign_sudoku',
    gameName: 'Sign Sudoku',
    candidates: generateSignSudokuData()
  },
  {
    gameType: 'debate_mode',
    gameName: 'Debate Mode',
    candidates: generateDebateModeData()
  },
  {
    gameType: 'interview_mode',
    gameName: 'Interview Mode',
    candidates: generateInterviewModeData()
  },
  {
    gameType: 'bart_test',
    gameName: 'BART Test',
    candidates: generateBARTTestData()
  }
]

// Helper function to get mock data for a specific game type
export const getMockDataForGame = (gameType: string): CandidateData[] => {
  const gameData = mockData.find(g => g.gameType === gameType)
  return gameData?.candidates || []
}

// Helper function to get all available game types
export const getAvailableGameTypes = (): Array<{ gameType: string; gameName: string }> => {
  return mockData.map(g => ({ gameType: g.gameType, gameName: g.gameName }))
}

