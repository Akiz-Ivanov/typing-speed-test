import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import arrowDown from "@/assets/images/icon-down-arrow.svg"
import { useTypingStore } from "@/store/typingStore"

import type { Difficulty, TimeMode } from "@/types/typing"

const ControlBar = () => {

  const { difficulty, timeMode, setDifficulty, setTimeMode, restartTest } = useTypingStore((state) => state)

  const onDifficultyChange = (value: Difficulty) => {
    if (!value) return
    setDifficulty(value)
    restartTest()
  }

  const onTimeModeChange = (value: TimeMode) => {
    if (!value) return
    setTimeMode(value)
    restartTest()
  }

  return (
    <>
      {/* Desktop & Tablet: ToggleGroup */}
      <div className="items-center justify-center divide-x divide-neutral-700 hidden md:flex">

        <div className="flex items-center justify-center gap-1.5 pr-4">
          <label htmlFor="difficulty-toggle" className="text-neutral-400">
            Difficulty:
          </label>
          <ToggleGroup
            id="difficulty-toggle"
            type="single"
            value={difficulty}
            onValueChange={(value) => onDifficultyChange(value as Difficulty)}
            size="sm"
            spacing={1.5}
          >
            <ToggleGroupItem value="Easy" variant="outline">
              Easy
            </ToggleGroupItem>
            <ToggleGroupItem value="Medium" variant="outline" >
              Medium
            </ToggleGroupItem>
            <ToggleGroupItem value="Hard" variant="outline" >
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
            onValueChange={(value) => onTimeModeChange(value as TimeMode)}
            size="sm"
            spacing={1.5}
          >
            <ToggleGroupItem value="Timed (60s)" variant="outline">
              Timed (60s)
            </ToggleGroupItem>
            <ToggleGroupItem value="Passage" variant="outline" >
              Passage
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

      </div>


      {/* Mobile: Dropdowns */}
      <div className="flex flex-row gap-2.5 md:hidden w-full">
        <div className="flex items-center gap-2 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 border border-neutral-600 bg-neutral-800 rounded-lg px-3 py-2 text-neutral-0 hover:border-neutral-500 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/50 text-center">
                {difficulty}
                <img src={arrowDown} className="w-2.5 text-neutral-400" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <DropdownMenuRadioGroup 
                value={difficulty} 
                onValueChange={(value) => onDifficultyChange(value as Difficulty)}
              >
                <DropdownMenuRadioItem value="Easy" className="rounded-none">Easy</DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem value="Medium" className="rounded-none">Medium</DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem value="Hard" className="rounded-none">Hard</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex justify-center items-center gap-2.5 border border-neutral-600 bg-neutral-800 rounded-lg px-3 py-2 text-neutral-0 hover:border-neutral-500 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/50 text-center">
                {timeMode}
                <img src={arrowDown} className="w-2.5 text-neutral-400" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <DropdownMenuRadioGroup 
                value={timeMode} 
                onValueChange={(value) => onTimeModeChange(value as TimeMode)}
              >
                <DropdownMenuRadioItem value="Timed (60s)">Timed (60s)</DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem value="Passage">Passage</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default ControlBar