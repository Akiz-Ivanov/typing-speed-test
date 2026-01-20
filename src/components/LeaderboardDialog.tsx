import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trophy, Loader2, RefreshCw, Crown, Medal, TrendingUp, Target, Calendar, User } from "lucide-react"
import { getTopScores, subscribeToLeaderboard, type LeaderboardEntry } from '@/services/leaderboardService'
import { cn } from '@/lib/utils'
import { DialogDescription } from '@radix-ui/react-dialog'

import { format } from "date-fns"; 

const LeaderboardDialog = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const fetchLeaderboard = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTopScores(10)
      setLeaderboard(data)
    } catch (err) {
      setError('Failed to load leaderboard')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, HH:mm')
    } catch {
      return 'Recent'
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const unsubscribe = subscribeToLeaderboard((newEntry) => {
      setLeaderboard((prev) => {
        const updated = [newEntry, ...prev]
          .sort((a, b) => {
            if (b.wpm !== a.wpm) return b.wpm - a.wpm
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          })
          .slice(0, 10)
        return updated
      })
    })

    return unsubscribe
  }, [isOpen])

  const getRankBadge = (index: number) => {
    if (index === 0) return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-sm opacity-60"></div>
        <div className="relative flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl">
          <Crown size={18} className="text-neutral-900" />
        </div>
      </div>
    )
    if (index === 1) return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full blur-sm opacity-50"></div>
        <div className="relative flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg">
          <Medal size={18} className="text-white" />
        </div>
      </div>
    )
    if (index === 2) return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full blur-sm opacity-50"></div>
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg">
          <Medal size={18} className="text-white" />
        </div>
      </div>
    )
    return (
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg",
        index < 10 ? "bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700" : "bg-neutral-900 border border-neutral-800"
      )}>
        {index + 1}
      </div>
    )
  }

  const getRankColor = (index: number) => {
    if (index === 0) return 'from-yellow-500 to-yellow-600'
    if (index === 1) return 'from-gray-400 to-gray-500'
    if (index === 2) return 'from-amber-600 to-amber-700'
    return 'from-neutral-600 to-neutral-700'
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 border border-neutral-700 hover:border-yellow-500/30 transition-all duration-300 text-neutral-0 font-medium hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-yellow-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="relative flex items-center gap-2">
            <Trophy size={18} className="text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden lg:block">Leaderboard</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl
      px-2.5 sm:px-6"
      >
        <DialogHeader>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 blur-xl opacity-30"></div>
            <DialogTitle className="relative text-center flex items-center justify-center gap-3 py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-md opacity-60"></div>
                <Trophy className="relative text-yellow-300" size={28} />
              </div>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent text-2xl font-bold">
                Global Leaderboard
              </span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-1">
          {/* Header with stats and refresh */}
          

          {/* Loading state */}
          {isLoading && leaderboard.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                <Loader2 className="relative animate-spin text-blue-400" size={48} />
              </div>
              <p className="text-neutral-400">Loading leaderboard...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-800/50">
                <div className="text-red-400 text-2xl">!</div>
              </div>
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchLeaderboard}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-900/20 to-red-900/10 border border-red-800/50 hover:border-red-700 text-red-400 hover:text-red-300 transition-all duration-200"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && leaderboard.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800">
                <Trophy size={32} className="text-neutral-600" />
              </div>
              <div className="space-y-2">
                <p className="text-neutral-300 text-lg font-medium">No scores yet!</p>
                <p className="text-neutral-500 text-sm">Be the first to claim the throne.</p>
              </div>
            </div>
          )}

          {/* Leaderboard table */}
          {!isLoading && !error && leaderboard.length > 0 && (
            <div className="space-y-2">
              {/* Table headers */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-neutral-500 border-b border-neutral-800">
                <div className="col-span-1 text-center">Rank</div>
                <div className="col-span-5 flex items-center gap-2">
                  <User size={14} />
                  <span>Player</span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <TrendingUp size={14} />
                  <span>WPM</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Target size={14} />
                  <span>Acc.</span>
                </div>
                <div className="col-span-1 hidden sm:flex items-center gap-2 justify-end">
                  <Calendar size={14} />
                </div>
              </div>

              {/* Table rows */}
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={cn(
                      "group relative grid grid-cols-12 gap-4 px-4 py-3 rounded-xl border transition-all duration-300",
                      index < 3
                        ? cn(
                          "bg-gradient-to-r",
                          getRankColor(index),
                          "border-transparent shadow-lg"
                        )
                        : "bg-gradient-to-r from-neutral-200 to-neutral-400  border-neutral-800"
                    )}
                  >
                    {/* Animated background for top 3 */}
                    {index < 3 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                    )}

                    {/* Rank */}
                    <div className="relative col-span-1 flex items-center justify-center">
                      {getRankBadge(index)}
                    </div>

                    {/* Player info */}
                    <div className="relative col-span-5 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-neutral-800 truncate">
                          {entry.nickname}
                        </p>
                        {index < 3 && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="text-xs px-2 py-0.5 rounded-full bg-black/30">
                              {index === 0 ? 'Champion' : index === 1 ? 'Runner-up' : 'Top 3'}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* WPM */}
                    <div className="relative col-span-3 flex items-center gap-2">
                      <span className={cn(
                        "text-xl font-bold text-neutral-800",
                      )}>
                        {entry.wpm}
                      </span>
                      <span className="text-sm text-neutral-900 hidden md:inline">WPM</span>
                    </div>

                    {/* Accuracy */}
                    <div className="relative col-span-2 flex items-center gap-2">
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-lg text-neutral-800",
                      )}>
                        <span className="font-bold">{entry.accuracy}%</span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="relative sm:col-span-1 sm:flex items-center justify-end hidden">
                      <div className="text-xs text-neutral-900 inline-flex">
                        {formatDate(entry.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-between items-center gap-4  rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Live Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className="text-blue-400" />
                      <span className="text-sm text-neutral-400">Top {leaderboard.length}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DialogDescription className="text-sm text-neutral-400 hidden sm:block">
                    Last updated just now
                  </DialogDescription>
                  <button
                    onClick={fetchLeaderboard}
                    type="button"
                    disabled={isLoading}
                    className="group relative px-3 py-2 rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 border border-neutral-700 hover:border-blue-500/50 transition-all duration-200 cursor-pointer"
                    title="Refresh leaderboard"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    <RefreshCw
                      size={16}
                      className={cn(
                        "text-neutral-400 group-hover:text-blue-400 transition-colors duration-200",
                        isLoading && 'animate-spin'
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LeaderboardDialog