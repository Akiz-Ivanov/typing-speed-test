import passages from '@/data/passages.json'
import quotes from '@/data/quotes.json'
import poems from '@/data/poems.json'
import lyrics from '@/data/lyrics.json'
import speeches from '@/data/speeches.json'
import type { TextCategory, Difficulty } from '@/types/typing'

interface TextItem {
  id: string
  text: string
  title?: string
  author?: string
  speaker?: string
  artist?: string
  year?: number | string
}

type TextData = Record<string, TextItem[]>

//* Cache loaded data to avoid re-fetching
const dataCache: Map<TextCategory, TextData> = new Map()

//* Preload the default category
dataCache.set('passages', passages)

export async function getTextsByCategory(category: TextCategory): Promise<TextData> {
  //* Return cached data if available
  if (dataCache.has(category)) {
    return dataCache.get(category)!
  }

  try {
    let data: TextData
    switch (category) {
      case 'passages':
        data = passages
        break
      case 'quotes':
        data = quotes
        break
      case 'poems':
        data = poems
        break
      case 'lyrics':
        data = lyrics
        break
      case 'speeches':
        data = speeches
        break
      default:
        data = passages
    }

    //* Cache the data
    dataCache.set(category, data)
    return data
  } catch (error) {
    console.error(`Failed to load data for category ${category}:`, error)
    //* Fallback to passages
    return passages
  }
}

export function getRandomText(category: TextCategory, difficulty: Difficulty): TextItem {
  const data = dataCache.get(category)
  if (!data) {
    throw new Error(`Data for category ${category} not loaded. Call getTextsByCategory first.`)
  }

  const difficultyKey = difficulty.toLowerCase() as keyof typeof data
  const texts = data[difficultyKey]

  if (!texts || texts.length === 0) {
    //* Fallback to passages
    const passagesData = dataCache.get('passages')
    if (passagesData && passagesData[difficultyKey]) {
      const fallbackTexts = passagesData[difficultyKey]
      const randomIndex = Math.floor(Math.random() * fallbackTexts.length)
      return fallbackTexts[randomIndex]
    }
    throw new Error(`No texts found for ${category} - ${difficulty}`)
  }

  const randomIndex = Math.floor(Math.random() * texts.length)
  return texts[randomIndex]
}

//* Optional: Preload all categories
export async function preloadAllCategories(): Promise<void> {
  const categories: TextCategory[] = ['passages', 'quotes', 'poems', 'lyrics', 'speeches']
  await Promise.all(categories.map(cat => getTextsByCategory(cat)))
}