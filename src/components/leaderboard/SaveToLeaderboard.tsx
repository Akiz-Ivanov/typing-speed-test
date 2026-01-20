import { useState } from 'react'
import { useTypingStore } from '@/store/typingStore'
import { submitScore } from '@/services/leaderboardService'
import { validateNickname, validateScore } from '@/lib/validation'
import { Loader2, Trophy, Check } from 'lucide-react'

interface SaveToLeaderboardProps {
  wpm: number
  accuracy: number
}

const SaveToLeaderboard = ({ wpm, accuracy }: SaveToLeaderboardProps) => {
  const { nickname, setNickname } = useTypingStore()

  const [localNickname, setLocalNickname] = useState(nickname || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    //* Validate nickname
    const nicknameValidation = validateNickname(localNickname)
    if (!nicknameValidation.valid) {
      setError(nicknameValidation.message!)
      return
    }

    //* Validate score
    const scoreValidation = validateScore(wpm, accuracy)
    if (!scoreValidation.valid) {
      setError(scoreValidation.message!)
      return
    }

    setIsSubmitting(true)

    try {
      await submitScore({
        nickname: localNickname,
        wpm,
        accuracy
      })

      //* Save nickname for next time
      setNickname(localNickname.trim())

      setIsSuccess(true)
    } catch (err) {
      setError('Failed to save score. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
        <Check className="text-green-500" size={20} />
        <span className="text-green-400 text-sm font-medium">
          Score saved to leaderboard!
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 p-4 bg-neutral-800/50 border border-neutral-700 rounded-lg">
        <div className="flex items-center gap-2 text-yellow-400">
          <Trophy size={20} />
          <h3 className="font-semibold">Save to Leaderboard</h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={localNickname}
            onChange={(e) => setLocalNickname(e.target.value)}
            placeholder="Enter nickname"
            className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-600 rounded-lg
              text-neutral-0 placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            disabled={isSubmitting}
            maxLength={20}
          />

          <button
            type="submit"
            disabled={isSubmitting || !localNickname.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-400 disabled:bg-neutral-700 
              disabled:text-neutral-500 text-white font-medium rounded-lg
              transition-colors flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <p className="text-neutral-400 text-xs">
          Your personal best will be saved to the global leaderboard
        </p>
      </div>
    </form>
  )
}

export default SaveToLeaderboard