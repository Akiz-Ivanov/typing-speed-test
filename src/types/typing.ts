export type Difficulty = "Easy" | "Medium" | "Hard"
export type TimeMode = "Timed (60s)" | "Passage"
type TestStatus = "idle" | "active" | "complete"

export interface TypingState {
  // Settings
  difficulty: Difficulty
  timeMode: TimeMode

  // Test state
  status: TestStatus
  currentPassage: string
  userInput: string
  currentIndex: number

  // Stats
  startTime: number | null
  elapsedTime: number
  remainingTime: number
  wpm: number
  accuracy: number
  correctChars: number
  incorrectChars: number

  // Personal best
  personalBest: number

  // Results
  resultStatus: "first-test" | "personal-best" | "default"

  // Actions
  setCurrentPassage: (passage: string) => void
  setDifficulty: (difficulty: Difficulty) => void
  setTimeMode: (mode: TimeMode) => void
  setPersonalBest: (wpm: number) => void
  startTest: () => void
  generateRandomPassage: () => void
  handleKeyPress: (key: string) => void
  completeTest: () => void
  restartTest: () => void
  updateStats: () => void
  handleBackspace: () => void
  startTimer: () => void
}