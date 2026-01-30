import type { TestResult } from '@/types/typing'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { ResponsiveContainer } from 'recharts'

const WpmChart = ({ history }: { history: TestResult[] }) => {
  if (history.length < 2) {
    return (
      <div className="mt-4 p-4 bg-neutral-900/40 rounded-lg w-full text-center">
        <h4 className="text-sm font-semibold text-neutral-300 mb-3">Performance Trend</h4>
        <p className="text-sm text-neutral-400">Not enough data to show trend. Complete at least two tests.</p>
      </div>
    )
  }

  const data = [...history].reverse().map((test, i) => ({
    name: `Test ${i + 1}`,
    wpm: test.wpm,
    accuracy: test.accuracy,
    date: test.date
  }))

  return (
    <div className="mt-4 p-4 bg-neutral-900/40 rounded-lg h-64 w-full">
      <h4 className="text-sm font-semibold mb-3">Performance Trend</h4>
      <ResponsiveContainer width="100%" height="100%" className={`pb-2`}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--neutral-700))" />
          <XAxis dataKey="name" stroke="hsl(var(--neutral-400))" fontSize={12} />
          <YAxis stroke="hsl(var(--neutral-400))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--neutral-800))',
              borderColor: 'hsl(var(--neutral-700))',
              color: 'hsl(var(--neutral-0))'
            }}
            formatter={(value) => [value, 'WPM']}
          />
          <Line
            type="monotone"
            dataKey="wpm"
            stroke="hsl(var(--blue-400))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--blue-400))', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WpmChart