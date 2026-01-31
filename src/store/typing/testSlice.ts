// src/store/typing/testSlice.ts
import type { StateCreator } from 'zustand'
import type { PassageMetadata } from '@/types/typing'
import type { TypingStore } from './index'
import { getRandomText, getTextsByCategory } from '@/services/dataService'
import parseTimeFromTimeMode from '@/utils/parseTimeFromTimeMode'

type TestStatus = "idle" | "active" | "complete"
type ResultStatus = "first-test" | "personal-best" | "default"

export interface TestSlice {
  status: TestStatus
  resultStatus: ResultStatus
  currentPassage: string
  passageMetadata: PassageMetadata | undefined
  userInput: string
  currentIndex: number

  startTest: () => void
  completeTest: () => void
  restartTest: () => void
  handleKeyPress: (key: string) => void
  handleBackspace: () => void
  generateRandomPassage: () => Promise<void>
  setCurrentPassage: (passage: string) => void
  setPassageMetadata: (metadata: PassageMetadata) => void
}

export const createTestSlice: StateCreator<
  TypingStore,
  [],
  [],
  TestSlice
> = (set, get) => ({
  //* Test lifecycle state
  status: "idle",
  resultStatus: "first-test",

  //* Passage state
  currentPassage: "",
  passageMetadata: undefined,

  //* Input state
  userInput: "",
  currentIndex: 0,


  //* ====== Actions ======
  setCurrentPassage: (passage) => set({ currentPassage: passage }),
  setPassageMetadata: (metadata) => set({ passageMetadata: metadata }),

  startTest: () => {
    const state = get()
    const timeLimit = parseTimeFromTimeMode(state.timeMode)

    //* For Passage mode: start at 0, count up
    //* For Timed mode: start at the time limit, count down
    const initialElapsedTime = timeLimit === null ? 0 : timeLimit

    set({
      status: "active",
      userInput: "",
      currentIndex: 0,
      startTime: Date.now(),
      elapsedTime: initialElapsedTime,
      correctChars: 0,
      incorrectChars: 0,
      wpm: 0,
      accuracy: 100
    })

    state.startTimer()
  },

  generateRandomPassage: async () => {
    const state = get()
    const { textCategory, difficulty } = state

    try {
      //* Load data for category if not cached
      await getTextsByCategory(textCategory)

      //* Get random text
      const passage = getRandomText(textCategory, difficulty)

      if (passage.id === state.passageMetadata?.id) {
        state.generateRandomPassage()
        return
      }

      //* Normalize hyphens
      const normalized = passage.text.replace(/[\u2010-\u2015\u2043\uFE63\uFF0D\u2212]/g, '-')

      set({
        currentPassage: normalized,
        passageMetadata: { ...passage, text: normalized }
      })
    } catch (error) {
      console.error('Failed to generate passage:', error)
      //* Fallback to a default message
      set({ currentPassage: "Error: Unable to load text. Please try again." })
    }
  },

  handleBackspace: () => {
    const state = get()
    if (state.currentIndex === 0) return

    set({
      currentIndex: state.currentIndex - 1,
      userInput: state.userInput.slice(0, -1),
    })
  },

  handleKeyPress: (key) => {
    if (key.length > 1 && key !== 'Backspace') return

    const state = get()

    if (key === 'Backspace') {
      state.handleBackspace()
      return
    }

    //* Return if out of bounds
    if (state.currentIndex >= state.currentPassage.length) return

    const expectedChar = state.currentPassage[state.currentIndex]
    const isCorrect = key === expectedChar
    const newIndex = state.currentIndex + 1

    //* Update state
    set({
      userInput: state.userInput + key,
      currentIndex: newIndex,
      correctChars: isCorrect ? state.correctChars + 1 : state.correctChars,
      incorrectChars: !isCorrect ? state.incorrectChars + 1 : state.incorrectChars
    })

    //* Update stats
    state.updateStats()

    //* Check completion
    if (newIndex >= state.currentPassage.length) {
      state.completeTest()
    }
  },

  completeTest: () => {
    const state = get()

    //* Clear timer if running
    if (state.timerInterval) {
      clearInterval(state.timerInterval)
      set({ timerInterval: null })
    }

    const finalWPM = state.wpm
    const finalAccuracy = state.accuracy
    const oldPersonalBest = state.personalBest
    const isFirstTest = oldPersonalBest === 0
    const isNewPersonalBest = finalWPM > oldPersonalBest

    let resultStatus: ResultStatus
    if (isFirstTest) {
      resultStatus = "first-test"
    } else if (isNewPersonalBest) {
      resultStatus = "personal-best"
    } else {
      resultStatus = "default"
    }

    //* Update state
    set({
      status: "complete",
      resultStatus,
      personalBest: isNewPersonalBest || isFirstTest ? finalWPM : oldPersonalBest
    })

    //* Add to history
    state.addToHistory({
      wpm: finalWPM,
      accuracy: finalAccuracy,
      difficulty: state.difficulty,
      timeMode: state.timeMode,
      correctChars: state.correctChars,
      incorrectChars: state.incorrectChars,
    })
  },

  restartTest: () => {
    const state = get()

    //* Clear timer if running
    if (state.timerInterval) {
      clearInterval(state.timerInterval)
      set({ timerInterval: null })
    }

    const timeLimit = parseTimeFromTimeMode(state.timeMode)
    const initialElapsedTime = timeLimit === null ? 0 : timeLimit

    set({
      status: "idle",
      userInput: "",
      currentIndex: 0,
      startTime: null,
      elapsedTime: initialElapsedTime,
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0
    })
  }
})