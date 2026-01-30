import ControlBar from "@/components/typing/ControlBar"
import Header from "@/components/layout/Header"
import StatsBar from "@/components/typing/StatsBar"
import TypingArea from "./components/typing/TypingArea"
import Results from "@/components/results/Results"
import { useTypingStore } from "./store/typing"

function App() {

  const { status, currentPassage, correctChars, incorrectChars } = useTypingStore((state) => state)

  const typed = correctChars + incorrectChars
  const total = currentPassage.length
  const progress = typed / total

  const isTestOver = status === "complete"

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-304">
        <Header />
        <main>
          <div className="flex flex-col gap-8">

            {!isTestOver && (
              <div
                className="flex flex-col items-baseline gap-5 pb-5 md:gap-4 md:pb-4
            xl-1200:flex-row xl-1200:justify-between border-b border-neutral-700 relative">
                <StatsBar />
                <ControlBar />
                {progress > 0 &&
                  <div
                    className="absolute left-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]"
                    style={{ width: `${progress * 100}%` }}
                  />
                }
              </div>
            )}
            {!isTestOver && <TypingArea />}
            {isTestOver && <Results />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App