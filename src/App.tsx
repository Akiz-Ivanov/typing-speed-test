import ControlBar from "@/components/ControlBar"
import Header from "@/components/Header"
import StatsBar from "@/components/StatsBar"
import TypingArea from "./components/TypingArea"
import Results from "./components/Results"
import { useTypingStore } from "./store/typingStore"

function App() {

  const { status, currentPassage, correctChars, incorrectChars } = useTypingStore((state) => state)

  const typed = correctChars + incorrectChars
  const total = currentPassage.length
  const progress = typed / total

  const isTestOver = status === "complete"

  return (
    <div className="p-4 sm:p-6 md:px-8 mx-auto max-w-304">
      <Header />
      <main>
        <div className="flex flex-col gap-8">

          {!isTestOver && (
            <div
              className="flex flex-col items-baseline gap-5 pb-5 md:gap-4 md:pb-4
            xl-1200:flex-row xl-1200:justify-between border-b border-neutral-700 relative">
              <StatsBar />
              <ControlBar />
              <div
                className="absolute left-0 bottom-0 h-px bg-blue-600 transition-all duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          )}
          {!isTestOver && <TypingArea />}
          {isTestOver && <Results />}
        </div>
      </main>
    </div>
  )
}

export default App