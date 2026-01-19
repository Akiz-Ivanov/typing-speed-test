import { useTypingStore } from "@/store/typingStore";
import { format } from "date-fns"; 
import { Trash2 } from "lucide-react";

const HistoryPanel = () => {
  const { testHistory, clearHistory } = useTypingStore()

  if (testHistory.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-400">
        <p>No test history yet.</p>
        <p className="text-sm mt-2">Complete a test to see your results here!</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, HH:mm')
    } catch {
      return 'Recent'
    }
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy === 100) {
      return 'text-green-400'
    } else if (accuracy >= 80) {
      return 'text-yellow-400'
    } else {
      return 'text-red-500'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500'
      case 'Medium': return 'text-yellow-400'
      case 'Hard': return 'text-red-500'
      default: return 'text-neutral-400'
    }
  }

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto history-scrollbar pr-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Recent Tests ({testHistory.length})</h3>
        <button
          type="button"
          onClick={clearHistory}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700 
            rounded-lg transition-colors text-neutral-300 hover:text-red-400 cursor-pointer"
          title="Clear all history"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      {testHistory.map((test) => (
        <div
          key={test.id}
          className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700"
        >
          <div className="flex justify-between">
            <div>
              <span className="font-bold text-sm md:text-lg">{test.wpm} WPM</span>
              <span className={`ml-3 text-sm sm:text-base font-medium ${getAccuracyColor(test.accuracy)}`}>
                {test.accuracy}%
              </span>
            </div>
            <div className="text-right text-sm">
              <div className="text-neutral-300">
                {formatDate(test.date)}
              </div>
              <div className="text-neutral-400 text-sm md:text-base">
                <span className={`${getDifficultyColor(test.difficulty)}`}>{test.difficulty}</span> • <span className="text-blue-400">{test.timeMode}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-sm mt-2">
            <span className="text-green-500">
              ✓ {test.correctChars} <span className="hidden sm:inline">correct chars</span>
            </span>
            <span className="text-red-500">
              ✗ {test.incorrectChars} <span className="hidden sm:inline">errors</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HistoryPanel;