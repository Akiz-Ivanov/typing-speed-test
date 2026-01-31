import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createSettingsSlice, type SettingsSlice } from './settingsSlice'
import { createTestSlice, type TestSlice } from './testSlice'
import { createStatsSlice, type StatsSlice } from './statsSlice'
import { createHistorySlice, type HistorySlice } from './historySlice'
import parseTimeFromTimeMode from '@/utils/parseTimeFromTimeMode'

export type TypingStore = SettingsSlice & TestSlice & StatsSlice & HistorySlice

export const useTypingStore = create<TypingStore>()(
  persist(
    (...a) => ({
      ...createSettingsSlice(...a),
      ...createTestSlice(...a),
      ...createStatsSlice(...a),
      ...createHistorySlice(...a),
    }),
    {
      name: 'typing-test-storage',
      partialize: (state) => ({
        personalBest: state.personalBest,
        textCategory: state.textCategory,
        difficulty: state.difficulty,
        timeMode: state.timeMode,
        testHistory: state.testHistory,
        nickname: state.nickname,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.timeMode) {
          const timeLimit = parseTimeFromTimeMode(state.timeMode)
          state.elapsedTime = timeLimit === null ? 0 : timeLimit
        }
      },
    }
  )
)