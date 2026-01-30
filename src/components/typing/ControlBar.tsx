import { useTypingStore } from "@/store/typing"
import { GiScrollUnfurled } from "react-icons/gi";
import type { Difficulty, TextCategory, TimeMode } from "@/types/typing"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Settings, TrendingUp, Clock } from "lucide-react"
import { DialogDescription } from "@radix-ui/react-dialog";
import { categories, difficulties, modes } from '@/constants/typingTestOptions'
import { SettingDropdown } from "../common/SettingDropdown";
import { MobileSettingSection } from "../common/MobileSettingsSection";

const ControlBar = () => {

  const {
    textCategory,
    difficulty,
    timeMode,
    setTextCategory,
    setDifficulty,
    setTimeMode,
    restartTest
  } = useTypingStore((state) => state)

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

  return (
    <>
      {/* Desktop & Tablet: ToggleGroup */}
      <div className="items-center justify-center md:divide-x divide-neutral-700 hidden md:flex w-full md:w-fit gap-2 md:gap-0">

        <div className="items-center justify-center gap-1.5 pr-4">
          <SettingDropdown
            label="Category"
            value={textCategory}
            options={categories}
            onChange={onCategoryChange}
            minWidth="min-w-30"
            labelClassName="sr-only"
          />
        </div>

        <div className="flex items-center justify-center gap-1.5 px-4">
          <SettingDropdown
            label="Difficulty"
            value={difficulty}
            options={difficulties}
            onChange={onDifficultyChange}
          />
        </div>

        <div className="flex items-center justify-center gap-1.5 pl-4">
          <SettingDropdown
            label="Time Mode"
            value={timeMode}
            options={modes}
            onChange={onTimeModeChange}
            minWidth="min-w-35"
          />
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

                <MobileSettingSection
                  icon={<GiScrollUnfurled className="w-4 h-4 text-yellow-400" />}
                  title="Category"
                  description="Select text type"
                  value={textCategory}
                  options={categories}
                  onChange={onCategoryChange}
                  className="flex-wrap gap-2.5 justify-start"
                />

                <MobileSettingSection
                  icon={<TrendingUp className="w-4 h-4 text-green-400" />}
                  title="Difficulty"
                  description="Text complexity level"
                  value={difficulty}
                  options={difficulties}
                  onChange={onDifficultyChange}
                  className="gap-2"
                />

                <MobileSettingSection
                  icon={<Clock className="w-4 h-4 text-purple-400" />}
                  title="Mode"
                  description="Timing options"
                  value={timeMode}
                  options={modes}
                  onChange={onTimeModeChange}
                  className="flex-wrap gap-2 justify-start w-full"
                />

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