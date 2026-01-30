import type { TextCategory, Difficulty, TimeMode } from '@/types/typing'

export const categories = [
  { value: 'passages' as const, label: 'Passages' },
  { value: 'quotes' as const, label: 'Quotes' },
  { value: 'poems' as const, label: 'Poems' },
  { value: 'lyrics' as const, label: 'Lyrics' },
  { value: 'speeches' as const, label: 'Speeches' },
] satisfies { value: TextCategory; label: string }[]

export const difficulties = [
  { value: 'Easy' as const, label: 'Easy' },
  { value: 'Medium' as const, label: 'Medium' },
  { value: 'Hard' as const, label: 'Hard' },
] satisfies { value: Difficulty; label: string }[]

export const modes = [
  { value: 'Passage' as const, label: 'Passage' },
  { value: 'Timed (60s)' as const, label: 'Timed (60s)' },
  { value: 'Timed (45s)' as const, label: 'Timed (45s)' },
  { value: 'Timed (30s)' as const, label: 'Timed (30s)' },
  { value: 'Timed (15s)' as const, label: 'Timed (15s)' },
  { value: 'Timed (120s)' as const, label: 'Timed (120s)' },
] satisfies { value: TimeMode; label: string }[]