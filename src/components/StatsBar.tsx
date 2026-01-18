import { useTypingStore } from "@/store/typingStore"

const StatsBar = () => {

  const { wpm, accuracy, elapsedTime } = useTypingStore((state) => state)

  const accuracyColor = 
  accuracy === 100 ? "text-green-400" :
  accuracy >= 80 ? "text-yellow-400"
  : "text-red-500"

  return (
    <dl className="stats-bar">
      <div className="stat">
        <dt className="stat-label">WPM:</dt>
        <dd className="stat-value">{wpm}</dd>
      </div>

      <div className="stat">
        <dt className="stat-label">Accuracy:</dt>
        <dd className={`stat-value ${accuracyColor}`}>{accuracy}%</dd>
      </div>

      <div className="stat">
        <dt className="stat-label">Time:</dt>
        <dd className="stat-value text-yellow-400">{elapsedTime}</dd>
      </div>
    </dl>
  )
}

export default StatsBar