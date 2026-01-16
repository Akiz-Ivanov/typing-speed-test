import { useTypingStore } from "@/store/typingStore"

const StatsBar = () => {

  const { wpm, accuracy, elapsedTime } = useTypingStore((state) => state)

  return (
    <dl className="stats-bar">
      <div className="stat">
        <dt className="stat-label">WPM:</dt>
        <dd className="stat-value">{wpm}</dd>
      </div>

      <div className="stat">
        <dt className="stat-label">Accuracy:</dt>
        <dd className="stat-value text-red-500">{accuracy}%</dd>
      </div>

      <div className="stat">
        <dt className="stat-label">Time:</dt>
        <dd className="stat-value text-yellow-400">{elapsedTime}</dd>
      </div>
    </dl>
  )
}

export default StatsBar