import { create } from 'zustand'
import data from "../../data.json"
import type { TypingState } from '@/types/typing'
import { persist } from 'zustand/middleware'
import parseTimeFromTimeMode from '@/utils/parseTimeFromTimeMode'

let timerInterval: number | null = null

export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
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
        const state = get()
        const timeLimit = parseTimeFromTimeMode(state.timeMode)

        //* For Passage mode: start at 0, will count up
        //* For Timed mode: start at the time limit, will count down
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

        //* Always start timer for both modes
        state.startTimer()
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

        const passage = passages[randomIndex].text

        //* Normalize hyphens
        const normalized = passage.replace(/[\u2010-\u2015\u2043\uFE63\uFF0D\u2212]/g, '-');

        set({ currentPassage: normalized })
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

        //* Check completion with new index
        if (newIndex >= state.currentPassage.length) {
          state.completeTest()
        }
      },

      startTimer: () => {
        //* Clear any existing timer
        if (timerInterval) {
          clearInterval(timerInterval)
          timerInterval = null
        }

        const state = get()
        const timeLimit = parseTimeFromTimeMode(state.timeMode)

        timerInterval = setInterval(() => {
          const state = get()

          if (state.status !== "active" || !state.startTime) {
            if (timerInterval) {
              clearInterval(timerInterval)
              timerInterval = null
            }
            return
          }

          const now = Date.now()
          const elapsedSeconds = Math.floor((now - state.startTime) / 1000)

          //* For Passage mode: count up indefinitely
          if (timeLimit === null) {
            set({ elapsedTime: elapsedSeconds })
          }
          //* For Timed mode: count down, end when time's up
          else {
            const remainingSeconds = Math.max(0, timeLimit - elapsedSeconds)
            set({ elapsedTime: remainingSeconds })

            //* End test when time reaches 0
            if (remainingSeconds === 0) {
              if (timerInterval) {
                clearInterval(timerInterval)
                timerInterval = null
              }
              get().completeTest()
              return
            }
          }
          state.updateStats()
        }, 500) //* Update every 500ms
      },

      updateStats: () => {
        const state = get()

        if (!state.startTime) return

        const now = Date.now()
        const elapsedSeconds = (now - state.startTime) / 1000

        //* For Passage mode: use elapsed time directly
        //* For Timed mode: use time elapsed (which is timeLimit - elapsedTime)
        const timeLimit = parseTimeFromTimeMode(state.timeMode)
        const timeForWpm = timeLimit === null
          ? elapsedSeconds  //* Passage: elapsed time
          : timeLimit - state.elapsedTime  //* Timed: time passed so far

        const elapsedMinutes = timeForWpm / 60

        //* Prevent division by zero
        if (elapsedMinutes <= 0) return

        const totalChars = state.correctChars + state.incorrectChars

        //* WPM = (characters / 5) / minutes
        const wpm = Math.round((state.correctChars / 5) / elapsedMinutes)

        //* Accuracy = correct / total
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

        //* Clear timer if running
        if (timerInterval) {
          clearInterval(timerInterval)
          timerInterval = null
        }

        //* Calculate final WPM for timed mode
        if (state.timeMode !== "Passage") {
          const timeLimit = parseTimeFromTimeMode(state.timeMode)
          if (timeLimit) {
            const elapsedMinutes = timeLimit / 60 //* Full time limit in minutes
            const totalChars = state.correctChars + state.incorrectChars
            const wpm = Math.round((state.correctChars / 5) / elapsedMinutes)
            const accuracy = totalChars > 0
              ? Math.round((state.correctChars / totalChars) * 100)
              : 100

            set({ wpm, accuracy })
          }
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
        //* Clear timer if running
        if (timerInterval) {
          clearInterval(timerInterval)
          timerInterval = null
        }

        const state = get()
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
    }),
    {
      name: 'typing-test-storage',
      partialize: (state) => ({
        personalBest: state.personalBest,
        difficulty: state.difficulty,
        timeMode: state.timeMode,
      }),
    }
  )
)