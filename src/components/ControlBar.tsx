import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"

type Difficulty = "easy" | "medium" | "hard"
type TimeMode = "60s" | "Passage"

const ControlBar = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [timeMode, setTimeMode] = useState<TimeMode>("60s")

  return (
    <div className="items-center justify-center divide-x divide-neutral-700 hidden md:flex">

      <div className="flex items-center justify-center gap-1.5 pr-4">
        <label htmlFor="difficulty-toggle" className="text-neutral-400">
          Difficulty:
        </label>
        <ToggleGroup
          id="difficulty-toggle"
          type="single"
          value={difficulty}
          onValueChange={(value) => {
            if (value) setDifficulty(value as Difficulty);
          }}
          size="sm"
          spacing={1.5}
        >
          <ToggleGroupItem value="easy" variant="outline">
            Easy
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" variant="outline" >
            Medium
          </ToggleGroupItem>
          <ToggleGroupItem value="hard" variant="outline" >
            Hard
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center justify-center gap-1.5 pl-4">
        <label htmlFor="time-mode-toggle" className="text-neutral-400">
          Mode:
        </label>
        <ToggleGroup
          id="time-mode-toggle"
          type="single"
          value={timeMode}
          onValueChange={(value) => {
            if (value) setTimeMode(value as TimeMode);
          }}
          size="sm"
          spacing={1.5}
        >
          <ToggleGroupItem value="60s" variant="outline">
            Timed (60s)
          </ToggleGroupItem>
          <ToggleGroupItem value="Passage" variant="outline" >
            Passage
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

    </div>
  )
}

export default ControlBar