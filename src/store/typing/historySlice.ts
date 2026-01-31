import type { StateCreator } from 'zustand'
import type { TestResult } from '@/types/typing'
import type { TypingStore } from './index'

export interface HistorySlice {
  testHistory: TestResult[]
  personalBest: number

  addToHistory: (result: Omit<TestResult, 'id' | 'date'>) => void
  clearHistory: () => void
  setPersonalBest: (wpm: number) => void
}

export const createHistorySlice: StateCreator<
  TypingStore,
  [],
  [],
  HistorySlice
> = (set) => ({
  //* State
  testHistory: [],
  personalBest: 0,

  //* Actions
  setPersonalBest: (wpm) => set({ personalBest: wpm }),

  addToHistory: (result: Omit<TestResult, 'id' | 'date'>) => set((state) => {
    const newEntry: TestResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    }

    //* Last 50 entries
    const updatedHistory = [newEntry, ...state.testHistory].slice(0, 50)

    return { testHistory: updatedHistory }
  }),

  clearHistory: () => set({ testHistory: [] }),
})