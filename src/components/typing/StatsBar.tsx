import { useTypingStore } from "@/store/typing"
import formatTime from "@/utils/formatTime"

const StatsBar = () => {

  const { wpm, accuracy, elapsedTime, timeMode, status } = useTypingStore((state) => state)

  const isCountDown = timeMode !== "Passage"
  const elapsedTimeFormatted = formatTime(elapsedTime, isCountDown)

  const accuracyColor =
    accuracy === 100 ? "text-green-400" :
      accuracy >= 80 ? "text-yellow-400"
        : "text-red-500"

  const getTimeColor = () => {
    if (!isCountDown || status === "idle") {
      return "text-yellow-400" //* Default for Passage mode (count up)
    }

    //* For timed modes (countdown)
    if (elapsedTime > 5) {
      return "text-yellow-400"
    } else {
      return "text-red-500"
    }
  }

  const shouldPulse = isCountDown && elapsedTime <= 5 && elapsedTime > 0

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
        <dd className={`stat-value ${getTimeColor()} ${shouldPulse ? 'animate-pulse' : ''}`}>
          {elapsedTimeFormatted}
        </dd>
      </div>
    </dl>
  )
}

export default StatsBar