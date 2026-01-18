import { create } from 'zustand'
import data from "../../data.json"

import type { TypingState } from '@/types/typing'

let timerInterval: NodeJS.Timeout | null = null

export const useTypingStore = create<TypingState>((set, get) => ({
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

  setCurrentPassage: (passage) => set({ currentPassage: passage }),

  setDifficulty: (difficulty) => set({ difficulty }),

  setTimeMode: (timeMode) => set({ timeMode }),

  setPersonalBest: (wpm) => set({ personalBest: wpm }),

  startTest: () => {
    set({
      status: "active",
      userInput: "",
      currentIndex: 0,
      startTime: Date.now(),
      elapsedTime: 0,
      correctChars: 0,
      incorrectChars: 0
    })

    if (get().timeMode === "Timed (60s)") {
      get().startTimer()
    }
  },

  generateRandomPassage: () => {
    const state = get()
    const difficultyLevel = state.difficulty.toLowerCase() as keyof typeof data
    const passages = data[difficultyLevel]

    if (!passages || passages.length === 0) {
      console.error(`No passages found for difficulty: ${difficultyLevel}`)
      set({ currentPassage: "Error: No passages available" })
      return
    }

    const randomIndex = Math.floor(Math.random() * passages.length)
    set({ currentPassage: passages[randomIndex].text })
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

    if (key === 'Backspace') {
      get().handleBackspace()
      return
    }

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

    // Check if passage complete
    if (get().currentIndex >= get().currentPassage.length) {
      get().completeTest()
    }
  },

  startTimer: () => {
    // Clear any existing timer
    if (timerInterval) {
      clearInterval(timerInterval)
    }

    timerInterval = setInterval(() => {
      const state = get()

      if (!state.startTime || state.status !== "active") {
        if (timerInterval) clearInterval(timerInterval)
        return
      }

      const now = Date.now()
      const elapsed = Math.floor((now - state.startTime) / 1000)

      set({ elapsedTime: elapsed })

      // Complete test when 60 seconds elapsed
      if (elapsed >= 60) {
        if (timerInterval) clearInterval(timerInterval)
        get().completeTest()
      }
    }, 100) // Update every 100ms for smoother countdown
  },

  updateStats: () => {
    const state = get()

    if (!state.startTime) return

    // Calculate elapsed time in minutes
    const now = Date.now()
    const elapsedSeconds = (now - state.startTime) / 1000
    const elapsedMinutes = elapsedSeconds / 60

    // Prevent division by zero
    if (elapsedMinutes <= 0) return

    const totalChars = state.correctChars + state.incorrectChars

    // WPM = (characters / 5) / minutes
    const wpm = Math.round((state.correctChars / 5) / elapsedMinutes)

    // Accuracy = correct / total
    const accuracy = totalChars > 0
      ? Math.round((state.correctChars / totalChars) * 100)
      : 100

    set({
      wpm: wpm || 0,
      accuracy: accuracy || 100,
    })
  },

  completeTest: () => {
    const state = get()

    // Clear timer if running
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }

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
      personalBest: isNewPersonalBest || isFirstTest ? currentWPM : oldPersonalBest
    })
  },

  restartTest: () => {
    // Clear timer if running
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }

    set({
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
  }
}))