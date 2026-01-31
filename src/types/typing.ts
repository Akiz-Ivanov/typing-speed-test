export type TextCategory = 'passages' | 'quotes' | 'poems' | 'lyrics' | 'speeches'

export type Difficulty = "Easy" | "Medium" | "Hard"

export type TimeMode =
  | "Timed (15s)"
  | "Timed (30s)"
  | "Timed (45s)"
  | "Timed (60s)"
  | "Timed (120s)"
  | "Passage"

export interface PassageMetadata {
  id: string
  text: string
  title?: string
  author?: string
  speaker?: string
  year?: number | string
}

export interface TestResult {
  id: string
  wpm: number
  accuracy: number
  difficulty: Difficulty
  timeMode: TimeMode
  date: string
  correctChars: number
  incorrectChars: number
}