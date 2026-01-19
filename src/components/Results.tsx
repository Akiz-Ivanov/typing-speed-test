import { useEffect } from "react"
import confetti from "canvas-confetti"
import iconCompleted from "@/assets/images/icon-completed.svg"
import patternStar1 from "@/assets/images/pattern-star-2.svg"
import patternStar2 from "@/assets/images/pattern-star-1.svg"
import newPB from "@/assets/images/icon-new-pb.svg"
import { cn } from "@/lib/utils"
import { useTypingStore } from "@/store/typingStore"
import SharePopover from "./SharePopover"
import AssistiveTechInfo from "./AssistiveTechInfo"

const Results = () => {

  const {
    wpm,
    accuracy,
    correctChars,
    incorrectChars,
    restartTest,
    generateRandomPassage,
    resultStatus
  } = useTypingStore((state) => state)

  useEffect(() => {
    if (resultStatus === "personal-best") {
      const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"]

      // Main burst
      confetti({
        particleCount: 180,
        spread: 120,
        origin: { y: 0.6 },
        colors,
        gravity: 0.8,
        scalar: 1.2,
      })

      // Side bursts
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 85,
          origin: { x: 0.1, y: 0.8 },
          colors,
          startVelocity: 45,
        })
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 85,
          origin: { x: 0.9, y: 0.8 },
          colors,
          startVelocity: 45,
        })
      }, 200)
    }
  }, [resultStatus])

  const headerText = {
    "first-test": "Baseline Established!",
    "personal-best": "High Score Smashed!",
    "default": "Test Complete!"
  }

  const descriptionText = {
    "first-test": "You’ve set the bar. Now the real challenge begins—time to beat it.",
    "personal-best": "You’re getting faster. That was incredible typing.",
    "default": "Solid run. Keep pushing to beat your high score."
  }

  const buttonText = {
    "first-test": "Beat This Score",
    "personal-best": "Beat This Score",
    "default": "Go Again"
  }

  const handleRestartTest = () => {
    generateRandomPassage()
    restartTest()
  }

  const accuracyColor =
    accuracy === 100 ? "text-green-400" :
      accuracy >= 80 ? "text-yellow-400"
        : "text-red-500"

  return (
    <div className={cn(
      "w-full flex flex-col justify-center items-center text-center",
      "gap-6 md:gap-8",
    )}
    >
      <AssistiveTechInfo
        message={
          resultStatus === "first-test"
            ? `First test complete! ${wpm} words per minute, ${accuracy}% accuracy. Baseline established.`
            : resultStatus === "personal-best"
            ? `New personal best! ${wpm} words per minute, ${accuracy}% accuracy. Congratulations!`
            : `Test complete. ${wpm} words per minute, ${accuracy}% accuracy.`
        }
        type="assertive"
        debounceMs={0} //* Announce immediately when results show
      />

      {(resultStatus === "first-test" || resultStatus === "default") && (
        <>
          <img
            src={patternStar1}
            alt=""
            className="absolute left-4 top-30 md:left-12 md:top-34 size-5.5 md:size-8"
          />
          <img
            src={patternStar2}
            alt=""
            className="absolute right-4 bottom-0 md:bottom-4 md:right-12 size-10 md:size-18.5"
          />
        </>
      )}

      {resultStatus === "personal-best" ?
        <img
          src={newPB}
          alt=""
          className="size-16 mt-4 md:mt-0"
        /> :
        <img
          src={iconCompleted}
          alt=""
          className="size-12 rounded-full green-glow mt-4 md:mt-6"
        />
      }

      <div className="flex flex-col gap-2.5">
        <h2 className={cn(
          "mt-4 md:mt-6 md:mt- text-2xl md:text-[2.5rem] font-bold leading-[136%]",
          resultStatus === "personal-best" && "mt-2"
        )}>
          {headerText[resultStatus]}
        </h2>
        <p className="text-neutral-400">
          {descriptionText[resultStatus]}
        </p>
      </div>

      <dl className="flex flex-col md:flex-row gap-4 md:gap-5 md:mt-5 md:mb-8 w-full lg:justify-center max-w-120 md:max-w-none">
        <div className="results-stat-container">
          <dt className="stat-label">WPM:</dt>
          <dd className="stat-value">{wpm}</dd>
        </div>

        <div className="results-stat-container">
          <dt className="stat-label">Accuracy:</dt>
          <dd className={`stat-value ${accuracyColor}`}>{accuracy}%</dd>
        </div>

        <div className="results-stat-container">
          <dt className="stat-label">Characters</dt>
          <dd className="stat-value">
            <span className="text-green-500">
              {correctChars}
            </span>
            <span className="text-neutral-500">
              /
            </span>
            <span className="text-red-500">
              {incorrectChars}
            </span>
          </dd>
        </div>
      </dl>

      <div className="flex justify-center items-center gap-2.5">

        <SharePopover wpm={wpm} accuracy={accuracy} />

        <button
          type="button"
          className="bg-neutral-0 rounded-xl py-4 px-4 text-neutral-900 hover:bg-blue-400
        inline-flex flex-row items-center justify-center gap-2.5 cursor-pointer transition-colors duration-200"
          onClick={handleRestartTest}
        >
          <span className="font-semibold">
            {buttonText[resultStatus]}
          </span>

          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422" />
          </svg>

        </button>

      </div>

    </div>
  )
}

export default Results