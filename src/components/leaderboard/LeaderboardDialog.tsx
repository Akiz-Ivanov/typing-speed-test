import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Trophy, Loader2, RefreshCw, Crown, Medal, TrendingUp, Target, Calendar, User } from "lucide-react"
import { getTopScores, subscribeToLeaderboard, type LeaderboardEntry } from '@/services/leaderboardService'
import { cn } from '@/lib/utils'
import { format } from "date-fns"

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

  const formatDateShort = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

      if (diffHours < 24) {
        return format(date, 'HH:mm')
      } else if (diffHours < 48) {
        return 'Yesterday'
      } else {
        return format(date, 'MM/dd')
      }
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
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-sm opacity-60"></div>
        <div className="relative flex items-center justify-center size-8 sm:size-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl">
          <Crown size={16} className="text-neutral-900" />
        </div>
      </div>
    )
    if (index === 1) return (
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full blur-sm opacity-50"></div>
        <div className="relative flex items-center justify-center size-8 sm:size-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg">
          <Medal size={16} className="text-white" />
        </div>
      </div>
    )
    if (index === 2) return (
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full blur-sm opacity-50"></div>
        <div className="relative flex items-center justify-center size-8 sm:size-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg">
          <Medal size={16} className="text-white" />
        </div>
      </div>
    )
    return (
      <div className={cn(
        "flex items-center justify-center size-8 sm:size-10 rounded-full font-bold text-sm sm:text-lg flex-shrink-0",
        index < 10 ? "bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700" : "bg-neutral-900 border border-neutral-800"
      )}>
        {index + 1}
      </div>
    )
  }

  const getRankColor = (index: number) => {
    if (index === 0) return 'from-yellow-500/30 to-yellow-600/30'
    if (index === 1) return 'from-gray-400/30 to-gray-500/30'
    if (index === 2) return 'from-amber-600/30 to-amber-700/30'
    return 'from-neutral-600/10 to-neutral-700/10'
  }

  const getTextColor = (index: number) => {
    if (index === 0) return 'text-yellow-200'
    if (index === 1) return 'text-gray-200'
    if (index === 2) return 'text-amber-200'
    return 'text-neutral-200'
  }

  const getBadgeBg = (index: number) => {
    if (index === 0) return 'bg-yellow-900/40'
    if (index === 1) return 'bg-gray-900/40'
    if (index === 2) return 'bg-amber-900/40'
    return 'bg-black/40'
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
      <DialogContent className="sm:max-w-2xl w-[95vw] max-h-[90vh] overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl p-0 sm:p-6">
        <DialogHeader className="px-4 sm:px-0 pt-4 sm:pt-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 blur-xl opacity-30"></div>
            <DialogTitle className="relative text-center flex items-center justify-center gap-3 py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-md opacity-60"></div>
                <Trophy className="relative text-yellow-300" size={24} />
              </div>
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent text-xl sm:text-2xl font-bold">
                Global Leaderboard
              </span>
            </DialogTitle>
          </div>
          {/* Add DialogDescription here to fix the warning */}
          <DialogDescription className="sr-only">
            View the top typing speed scores from players around the world
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1 px-2 sm:px-0">
          {/* Loading state */}
          {isLoading && leaderboard.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                <Loader2 className="relative animate-spin text-blue-400" size={40} />
              </div>
              <p className="text-neutral-400 text-sm sm:text-base">Loading leaderboard...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-8 space-y-4 px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-800/50">
                <div className="text-red-400 text-xl sm:text-2xl">!</div>
              </div>
              <p className="text-red-400 text-sm sm:text-base">{error}</p>
              <button
                onClick={fetchLeaderboard}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-900/20 to-red-900/10 border border-red-800/50 hover:border-red-700 text-red-400 hover:text-red-300 transition-all duration-200 text-sm sm:text-base"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && leaderboard.length === 0 && (
            <div className="text-center py-12 space-y-4 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800">
                <Trophy size={28} className="text-neutral-600" />
              </div>
              <div className="space-y-2">
                <p className="text-neutral-300 text-base sm:text-lg font-medium">No scores yet!</p>
                <p className="text-neutral-500 text-xs sm:text-sm">Be the first to claim the throne.</p>
              </div>
            </div>
          )}

          {/* Leaderboard table */}
          {!isLoading && !error && leaderboard.length > 0 && (
            <div className="space-y-2">
              {/* Table headers - Hidden on mobile, shown on desktop */}
              <div className="hidden sm:grid grid-cols-12 gap-2 px-3 py-2 text-sm text-neutral-500 border-b border-neutral-800">
                <div className="col-span-1 text-center">Rank</div>
                <div className="col-span-5 flex items-center gap-2">
                  <User size={14} />
                  <span>Player</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <TrendingUp size={14} />
                  <span>WPM</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Target size={14} />
                  <span>Accuracy</span>
                </div>
                <div className="col-span-2 flex items-center gap-2 justify-end">
                  <Calendar size={14} />
                  <span>Date</span>
                </div>
              </div>

              {/* Table rows */}
              <div className="space-y-1 sm:space-y-2 max-h-[55vh] sm:max-h-[50vh] overflow-y-auto px-1 sm:px-0">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={cn(
                      "group relative p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300",
                      index < 3
                        ? cn(
                          "bg-gradient-to-r",
                          getRankColor(index),
                          "border-transparent shadow-lg"
                        )
                        : "bg-neutral-800/50 border-neutral-700/50 hover:border-neutral-600"
                    )}
                  >
                    {/* Mobile layout */}
                    <div className="sm:hidden flex items-start gap-3">
                      {/* Rank badge */}
                      <div className="relative mt-1">
                        {getRankBadge(index)}
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        {/* Top row: Name and WPM */}
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "font-semibold truncate text-sm",
                              index < 3 ? getTextColor(index) : "text-neutral-200"
                            )}>
                              {entry.nickname}
                            </p>
                            {index < 3 && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <div className={cn(
                                  "text-xs px-1.5 py-0.5 rounded-full",
                                  getBadgeBg(index),
                                  index === 0 ? 'text-yellow-300' : index === 1 ? 'text-gray-300' : 'text-amber-300'
                                )}>
                                  {index === 0 ? '🏆 Champ' : index === 1 ? '🥈 2nd' : '🥉 3rd'}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <div className="text-right">
                              <div className={cn(
                                "text-lg font-bold",
                                index < 3 ? getTextColor(index) : "text-white"
                              )}>
                                {entry.wpm}
                              </div>
                              <div className="text-xs text-neutral-400">WPM</div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom row: Accuracy and Date */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "flex items-center gap-1 px-2 py-1 rounded-lg",
                              index < 3 ? "bg-black/40" : "bg-neutral-700/50"
                            )}>
                              <Target size={12} className={cn(
                                index < 3 ? getTextColor(index) : "text-neutral-400"
                              )} />
                              <span className={cn(
                                "font-semibold text-sm",
                                index < 3 ? getTextColor(index) : "text-white"
                              )}>
                                {entry.accuracy}%
                              </span>
                            </div>
                          </div>
                          <div className={cn(
                            "text-xs",
                            index < 3 ? getTextColor(index) : "text-neutral-400"
                          )}>
                            {formatDateShort(entry.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden sm:grid sm:grid-cols-12 gap-2 items-center">
                      {/* Rank */}
                      <div className="relative col-span-1 flex items-center justify-center">
                        {getRankBadge(index)}
                      </div>

                      {/* Player info */}
                      <div className="relative col-span-5 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "font-semibold truncate",
                            index < 3 ? getTextColor(index) : "text-neutral-200"
                          )}>
                            {entry.nickname}
                          </p>
                          {index < 3 && (
                            <div className="flex items-center gap-1 mt-1">
                              <div className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                getBadgeBg(index),
                                index === 0 ? 'text-yellow-300' : index === 1 ? 'text-gray-300' : 'text-amber-300'
                              )}>
                                {index === 0 ? 'Champion' : index === 1 ? 'Runner-up' : 'Top 3'}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* WPM */}
                      <div className="relative col-span-2 flex items-center gap-2 mx-auto">
                        <span className={cn(
                          "text-xl font-bold px-3 py-1.5 rounded-lg",
                          index < 3 ? getTextColor(index) : "text-neutral-200",
                          index < 3 ? "bg-black/40" : "bg-neutral-700/50"
                        )}>
                          {entry.wpm}
                        </span>
                      </div>

                      {/* Accuracy */}
                      <div className="relative col-span-2 flex items-center gap-2 mx-auto">
                        <div className={cn(
                          "text-xl font-bold px-3 py-1.5 rounded-lg",
                          index < 3 ? getTextColor(index) : "text-neutral-200",
                          index < 3 ? "bg-black/40" : "bg-neutral-700/50"
                        )}>
                          {entry.accuracy}%
                        </div>
                      </div>

                      {/* Date */}
                      <div className="relative col-span-2 flex items-center justify-end">
                        <div className={cn(
                          "text-sm text-right",
                          index < 3 ? getTextColor(index) : "text-neutral-400"
                        )}>
                          {formatDate(entry.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend and Refresh */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-2 sm:px-0 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Live Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} className="text-blue-400" />
                      <span className="text-xs sm:text-sm text-neutral-400">Top {leaderboard.length}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                  {/* Remove DialogDescription from here since it should be in DialogHeader */}
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Last updated just now
                  </p>
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