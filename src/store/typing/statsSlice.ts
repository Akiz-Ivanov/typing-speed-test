// src/store/typing/statsSlice.ts
import type { StateCreator } from 'zustand'
import type { TypingStore } from './index'
import parseTimeFromTimeMode from '@/utils/parseTimeFromTimeMode'

export interface StatsSlice {
  startTime: number | null
  elapsedTime: number
  timerInterval: number | null

  wpm: number
  accuracy: number
  correctChars: number
  incorrectChars: number

  startTimer: () => void
  updateStats: () => void
}

export const createStatsSlice: StateCreator<
  TypingStore,
  [],
  [],
  StatsSlice
> = (set, get) => ({
  //* Stats state
  wpm: 0,
  accuracy: 100,
  correctChars: 0,
  incorrectChars: 0,

  //* Timer state
  startTime: null,
  elapsedTime: 0,
  timerInterval: null,

  //* ====== Actions ======
  startTimer: () => {
    const state = get()

    //* Clear any existing timer
    if (state.timerInterval) {
      clearInterval(state.timerInterval)
      set({ timerInterval: null })
    }

    const timeLimit = parseTimeFromTimeMode(state.timeMode)

    const interval = setInterval(() => {
      const state = get()

      if (state.status !== "active" || !state.startTime) {
        if (state.timerInterval) {
          clearInterval(state.timerInterval)
          set({ timerInterval: null })
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
          if (state.timerInterval) {
            clearInterval(state.timerInterval)
            set({ timerInterval: null })
          }
          get().completeTest()
          return
        }
      }

      state.updateStats()
    }, 500) //* Update every 500ms

    set({ timerInterval: interval })
  },

  updateStats: () => {
    const state = get()

    if (!state.startTime) return

    const now = Date.now()
    const elapsedSeconds = (now - state.startTime) / 1000

    //* For Passage mode: use elapsed time directly
    //* For Timed mode: use time elapsed (timeLimit - elapsedTime)
    const timeLimit = parseTimeFromTimeMode(state.timeMode)
    const timeForWpm = timeLimit === null
      ? elapsedSeconds  // Passage: elapsed time
      : timeLimit - state.elapsedTime  // Timed: time passed so far

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
})