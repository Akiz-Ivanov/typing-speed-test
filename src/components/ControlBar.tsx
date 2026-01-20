import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import arrowDown from "@/assets/images/icon-down-arrow.svg"
import { useTypingStore } from "@/store/typingStore"
import { GiScrollUnfurled } from "react-icons/gi";
import type { Difficulty, TextCategory, TimeMode } from "@/types/typing"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Settings, TrendingUp, Clock } from "lucide-react"
import { DialogDescription } from "@radix-ui/react-dialog";

const formatCategory = (category: TextCategory): string => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

const ControlBar = () => {

  const { textCategory, difficulty, timeMode, setTextCategory, setDifficulty, setTimeMode, restartTest } = useTypingStore((state) => state)

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

  const onCategoryChange = (value: TextCategory) => {
    if (!value) return
    setTextCategory(value)
    restartTest()
  }

  const categories: { value: TextCategory; label: string }[] = [
    { value: 'passages', label: 'Passages' },
    { value: 'quotes', label: 'Quotes' },
    { value: 'poems', label: 'Poems' },
    { value: 'lyrics', label: 'Lyrics' },
    { value: 'speeches', label: 'Speeches' },
  ]

  const difficulties: { value: Difficulty; label: string }[] = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ]

  const modes: { value: TimeMode; label: string }[] = [
    { value: 'Passage', label: 'Passage' },
    { value: 'Timed (60s)', label: 'Timed (60s)' },
    { value: 'Timed (45s)', label: 'Timed (45s)' },
    { value: 'Timed (30s)', label: 'Timed (30s)' },
    { value: 'Timed (15s)', label: 'Timed (15s)' },
    { value: 'Timed (120s)', label: 'Timed (120s)' },
  ]

  return (
    <>
      {/* Desktop & Tablet: ToggleGroup */}
      <div className="items-center justify-center md:divide-x divide-neutral-700 hidden md:flex w-full md:w-fit gap-2 md:gap-0">

        <div className="items-center justify-center gap-1.5 pr-4 hidden md:flex">
          <label htmlFor="category-toggle" className="text-neutral-400 sr-only">
            Category:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex justify-center items-center gap-2.5 border
                  border-border bg-neutral-800 rounded-lg px-4 py-4 text-neutral-0 
                  hover:border-blue-400 hover:text-blue-400 focus-visible:border-blue-600 focus-visible:ring-2 
                  focus-visible:ring-blue-600/50 text-center h-8 min-w-8 cursor-pointer 
                  transition-[color,box-shadow] duration-200">
                {formatCategory(textCategory)}

              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <DropdownMenuRadioGroup
                value={textCategory}
                onValueChange={(value) => onCategoryChange(value as TextCategory)}
              >
                {categories.map((category, index) => (
                  <div key={category.value}>
                    <DropdownMenuRadioItem value={category.value}>
                      {category.label}
                    </DropdownMenuRadioItem>
                    {index < categories.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-center gap-1.5 md:px-4 flex-1">
          <label htmlFor="difficulty-toggle" className="text-neutral-400 hidden md:inline">
            Difficulty:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex justify-center items-center gap-2.5 border
                  border-border bg-neutral-800 rounded-lg px-4 py-4 text-neutral-0 
                  hover:border-blue-400 hover:text-blue-400 focus-visible:border-blue-600 focus-visible:ring-2 
                  focus-visible:ring-blue-600/50 text-center h-8 min-w-8 cursor-pointer 
                  transition-[color,box-shadow] duration-200">
                {difficulty}
                <img src={arrowDown} className="w-2.5 text-neutral-400 md:hidden" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <DropdownMenuRadioGroup
                value={difficulty}
                onValueChange={(value) => onDifficultyChange(value as Difficulty)}
              >
                {difficulties.map((difficulty, index) => (
                  <div key={difficulty.value}>
                    <DropdownMenuRadioItem value={difficulty.value}>
                      {difficulty.label}
                    </DropdownMenuRadioItem>
                    {index < difficulties.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-center gap-1.5 md:pl-4 flex-1">
          <label htmlFor="time-mode-toggle" className="text-neutral-400 hidden md:inline">
            Mode:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex justify-center items-center gap-2.5 border
                  border-border bg-neutral-800 rounded-lg px-4 py-4 text-neutral-0 
                  hover:border-blue-400 hover:text-blue-400 focus-visible:border-blue-600 focus-visible:ring-2 
                  focus-visible:ring-blue-600/50 text-center h-8 min-w-8 cursor-pointer 
                  transition-[color,box-shadow] duration-200 whitespace-nowrap">
                {timeMode}
                <img src={arrowDown} className="w-2.5 text-neutral-400 md:hidden" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <DropdownMenuRadioGroup
                value={timeMode}
                onValueChange={(value) => onTimeModeChange(value as TimeMode)}
              >
                {modes.map((mode, index) => (
                  <div key={mode.value}>
                    <DropdownMenuRadioItem value={mode.value}>
                      {mode.label}
                    </DropdownMenuRadioItem>
                    {index < modes.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>

      {/* Mobile Settings Dialog */}
      <div className="flex md:hidden w-full">
        <div className="flex justify-center items-center gap-2 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="py-2.5 px-6 rounded-lg border border-neutral-600 text-neutral-300 inline-flex 
                  items-center justify-center gap-2"
              >
                <Settings className="w-5 h-5" />
                <span>Test Customization</span>
              </button>
            </DialogTrigger>

            <DialogContent className="bg-neutral-800 border-neutral-700 max-w-[90vw] sm:max-w-md rounded-xl p-0 overflow-hidden">
              <DialogHeader className="px-6 pt-6 pb-4 border-b border-neutral-700">
                <DialogTitle className="text-xl font-semibold text-neutral-100">
                  Test Settings
                </DialogTitle>
                <DialogDescription className="text-sm text-neutral-400 mt-1">
                  Customize your typing test experience
                </DialogDescription>
              </DialogHeader>

              <div className="px-6 py-5 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Category Section */}
                <div>
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-neutral-300 mb-1 flex items-center gap-2">
                      <GiScrollUnfurled className="w-4 h-4 text-yellow-400" />
                      Category
                    </h3>
                    <p className="text-xs text-neutral-500">Select text type</p>
                  </div>
                  <ToggleGroup
                    type="single"
                    value={textCategory}
                    onValueChange={onCategoryChange}
                    className="flex-wrap gap-2.5 justify-start"
                    spacing={1.5}

                  >
                    {categories.map((category) => (
                      <ToggleGroupItem
                        key={category.value}
                        value={category.value}
                        variant="outline"

                      >
                        {category.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                {/* Difficulty Section */}
                <div>
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-neutral-300 mb-1 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Difficulty
                    </h3>
                    <p className="text-xs text-neutral-500">Text complexity level</p>
                  </div>
                  <ToggleGroup
                    type="single"
                    value={difficulty}
                    onValueChange={onDifficultyChange}
                    className="gap-2"
                    spacing={1.5}
                  >
                    {difficulties.map((diff) => (
                      <ToggleGroupItem
                        key={diff.value}
                        value={diff.value}
                        variant="outline"
                      >
                        {diff.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                {/* Mode Section */}
                <div>
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-neutral-300 mb-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      Mode
                    </h3>
                    <p className="text-xs text-neutral-500">Timing options</p>
                  </div>
                  <ToggleGroup
                    type="single"
                    value={timeMode}
                    onValueChange={onTimeModeChange}
                    className="flex-wrap gap-2 justify-start w-full"
                    spacing={1.5}
                  >
                    {modes.map((mode) => (
                      <ToggleGroupItem
                        key={mode.value}
                        value={mode.value}
                        variant="outline"
                      >
                        {mode.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                {/* Current Settings Summary */}
                <div className="pt-4 border-t border-neutral-700">
                  <h4 className="text-sm font-semibold text-neutral-300 mb-2">Current Settings</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-neutral-900/50 rounded-lg p-3">
                      <p className="text-xs text-neutral-500 mb-1">Category</p>
                      <p className="font-medium text-neutral-200">
                        {categories.find(c => c.value === textCategory)?.label}
                      </p>
                    </div>
                    <div className="bg-neutral-900/50 rounded-lg p-3">
                      <p className="text-xs text-neutral-500 mb-1">Difficulty</p>
                      <p className="font-medium text-neutral-200">{difficulty}</p>
                    </div>
                    <div className="bg-neutral-900/50 rounded-lg p-3 col-span-2">
                      <p className="text-xs text-neutral-500 mb-1">Mode</p>
                      <p className="font-medium text-neutral-200">{timeMode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default ControlBar