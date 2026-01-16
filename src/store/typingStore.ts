import { create } from 'zustand'
import data from "../../data.json"

import type { TypingState } from '@/types/typing'

export const useTypingStore = create<TypingState>((set, get) => ({
  // Initial state
  difficulty: "Medium",
  timeMode: "Timed (60s)",
  status: "idle",
  currentPassage: "",
  userInput: "",
  currentIndex: 0,
  startTime: null,
  elapsedTime: 0,
  wpm: 0,
  accuracy: 100,
  correctChars: 0,
  incorrectChars: 0,
  personalBest: 0,
  resultStatus: "first-test",

  // Actions

  setCurrentPassage: (passage) => set({ currentPassage: passage }),

  setDifficulty: (difficulty) => set({ difficulty }),

  setTimeMode: (timeMode) => set({ timeMode }),

  setPersonalBest: (wpm) => set({ personalBest: wpm }),

  startTest: () => set({
    status: "active",
    userInput: "",
    currentIndex: 0,
    startTime: Date.now(),
    correctChars: 0,
    incorrectChars: 0
  }),

  generateRandomPassage: () => {
    const state = get()
    const difficultyLevel = state.difficulty.toLowerCase() as keyof typeof data;
    const passages = data[difficultyLevel]

    if (!passages || passages.length === 0) {
      console.error(`No passages found for difficulty: ${difficultyLevel}`)
      set({ currentPassage: "Error: No passages available" })
      return
    }

    const randomIndex = Math.floor(Math.random() * passages.length)
    set({ currentPassage: passages[randomIndex].text })
  },

  handleKeyPress: (key) => {

    const state = get()

    if (state.currentIndex >= state.currentPassage.length) return

    const expectedChar = state.currentPassage[state.currentIndex]

    if (key === expectedChar) {
      set({
        userInput: state.userInput + key,
        currentIndex: state.currentIndex + 1,
        correctChars: state.correctChars + 1
      })
    } else {
      set({
        userInput: state.userInput + key,
        currentIndex: state.currentIndex + 1,
        incorrectChars: state.incorrectChars + 1
      })
    }

    // Update stats after each keypress
    get().updateStats()
  },

  updateStats: () => {
    const now = Date.now()
    const state = get()

    if (!state.startTime) return

    const timeElapsed = (now - state.startTime) / 1000 / 60 // minutes
    const totalChars = state.correctChars + state.incorrectChars
    const wpm = Math.round((totalChars / 5) / timeElapsed)
    const accuracy = Math.round((state.correctChars / totalChars) * 100)

    set({
      wpm: wpm || 0,
      accuracy: accuracy || 100,
      elapsedTime: Math.floor((now - state.startTime) / 1000)
    })
  },

  completeTest: () => {
    const state = get()
    const oldPersonalBest = state.personalBest
    const currentWPM = state.wpm
    const isFirstTest = oldPersonalBest === 0
    const isNewPersonalBest = currentWPM > oldPersonalBest

    let resultStatus: "first-test" | "personal-best" | "default"
    if (isFirstTest) {
      resultStatus = "first-test"
    } else if (isNewPersonalBest) {
      resultStatus = "personal-best"
    } else {
      resultStatus = "default"
    }

    set({
      status: "complete",
      resultStatus,
      personalBest: currentWPM
    })
  },

  restartTest: () => set({
    status: "idle",
    userInput: "",
    currentIndex: 0,
    startTime: null,
    elapsedTime: 0,
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0
  })
}))