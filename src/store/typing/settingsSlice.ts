import type { StateCreator } from 'zustand'
import type { TextCategory, Difficulty, TimeMode } from '@/types/typing'
import type { TypingStore } from './index'

export interface SettingsSlice {
  textCategory: TextCategory
  difficulty: Difficulty
  timeMode: TimeMode
  nickname: string | null
  setTextCategory: (category: TextCategory) => void
  setDifficulty: (difficulty: Difficulty) => void
  setTimeMode: (mode: TimeMode) => void
  setNickname: (nickname: string | null) => void
}

export const createSettingsSlice: StateCreator<
  TypingStore,
  [],
  [],
  SettingsSlice
> = (set) => ({
  textCategory: 'passages',
  difficulty: 'Easy',
  timeMode: 'Timed (60s)',
  nickname: null,

  setTextCategory: (textCategory) => set({ textCategory }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setNickname: (nickname) => set({ nickname }),
  setTimeMode: (timeMode) => set({ timeMode }),
})