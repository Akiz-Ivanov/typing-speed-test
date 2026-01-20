import { supabase } from '@/lib/supabase'

export interface LeaderboardEntry {
  id: string
  nickname: string
  wpm: number
  accuracy: number
  created_at: string
}

export interface SubmitScoreParams {
  nickname: string
  wpm: number
  accuracy: number
}

//* ====== Submit a score to the leaderboard ======
export const submitScore = async (params: SubmitScoreParams) => {
  const { nickname, wpm, accuracy } = params

  const { data, error } = await supabase
    .from('leaderboard')
    .upsert({
      nickname: nickname.trim(),
      wpm,
      accuracy,
    }, {
      onConflict: 'nickname'  // This tells Supabase what to do when nickname already exists
    })
    .select()
    .single()

  if (error) {
    console.error('Error submitting score:', error)
    throw new Error('Failed to submit score to leaderboard')
  }

  return data as LeaderboardEntry
}

//* ====== Get top scores from leaderboard ======
export const getTopScores = async (
  limit: number = 10,
  // filters?: {
  //   difficulty?: Difficulty
  //   timeMode?: TimeMode
  //   category?: TextCategory
  // }
) => {
  const query = supabase
    .from('leaderboard')
    .select('*')
    .order('wpm', { ascending: false })
    .order('created_at', { ascending: false }) //* Tiebreaker: recent first
    .limit(limit)

  // Apply filters if provided
  // if (filters?.difficulty) {
  //   query = query.eq('difficulty', filters.difficulty)
  // }
  // if (filters?.timeMode) {
  //   query = query.eq('time_mode', filters.timeMode)
  // }
  // if (filters?.category) {
  //   query = query.eq('category', filters.category)
  // }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching leaderboard:', error)
    throw new Error('Failed to fetch leaderboard')
  }

  return data as LeaderboardEntry[]
}

//* ====== Subscribe to real - time leaderboard updates ======
export const subscribeToLeaderboard = (
  callback: (entry: LeaderboardEntry) => void
) => {
  const channel = supabase
    .channel('leaderboard-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'leaderboard',
      },
      (payload) => {
        callback(payload.new as LeaderboardEntry)
      }
    )
    .subscribe()

  //* Return unsubscribe function
  return () => {
    supabase.removeChannel(channel)
  }
}