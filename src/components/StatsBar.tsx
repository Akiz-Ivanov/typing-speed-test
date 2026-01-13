const StatsBar = () => {
  return (
    <dl className="stats-bar">
      <div className="stat">
        <dt className="stat-label">WPM:</dt>
        <dd className="stat-value">40</dd>
      </div>

      <div className="stat">
        <dt className="stat-label">Accuracy:</dt>
        <dd className="stat-value text-red-500">94%</dd>
      </div>

      <div className="stat">
        <dt className="stat-label">Time:</dt>
        <dd className="stat-value text-yellow-400">0:46</dd>
      </div>
    </dl>
  )
}

export default StatsBar