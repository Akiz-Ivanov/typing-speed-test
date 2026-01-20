export type TextCategory = 'passages' | 'quotes' | 'poems' | 'lyrics' | 'speeches'
export type Difficulty = "Easy" | "Medium" | "Hard"
export type TimeMode =
  | "Timed (15s)"
  | "Timed (30s)"
  | "Timed (45s)"
  | "Timed (60s)"
  | "Timed (120s)"
  | "Passage"
type TestStatus = "idle" | "active" | "complete"
export interface TestResult {
  id: string;
  wpm: number;
  accuracy: number;
  difficulty: Difficulty;
  timeMode: TimeMode;
  date: string;
  correctChars: number;
  incorrectChars: number;
}
export interface TypingState {
  nickname: string | null

  //* Settings
  textCategory: TextCategory
  difficulty: Difficulty
  timeMode: TimeMode

  //* Test state
  status: TestStatus
  currentPassage: string
  userInput: string
  currentIndex: number

  //* Stats
  startTime: number | null
  elapsedTime: number
  wpm: number
  accuracy: number
  correctChars: number
  incorrectChars: number
  personalBest: number
  resultStatus: "first-test" | "personal-best" | "default"
  testHistory: TestResult[]

  //* Actions
  setCurrentPassage: (passage: string) => void
  setTextCategory: (category: TextCategory) => void
  setDifficulty: (difficulty: Difficulty) => void
  setTimeMode: (mode: TimeMode) => void
  setPersonalBest: (wpm: number) => void
  setNickname: (nickname: string) => void
  
  startTest: () => void
  generateRandomPassage: () => void
  handleKeyPress: (key: string) => void
  completeTest: () => void
  restartTest: () => void
  updateStats: () => void
  handleBackspace: () => void
  startTimer: () => void
  addToHistory: (result: Omit<TestResult, 'id' | 'date'>) => void
  clearHistory: () => void
}