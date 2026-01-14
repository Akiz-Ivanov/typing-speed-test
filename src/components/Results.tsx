import { useState } from "react"
import iconCompleted from "@/assets/images/icon-completed.svg"
import newPB from "@/assets/images/icon-new-pb.svg"
import { cn } from "@/lib/utils"
import iconRestart from "@/assets/images/icon-restart.svg"

type Status = "first-test" | "personal-best" | "default"

const Results = () => {

  const [status, setStatus] = useState<Status>("default")

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

  return (
    <div className={cn(
      "w-full flex flex-col justify-center items-center text-center",
      "gap-6 md:gap-8",
    )}
    >
      {status === "personal-best" ?
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
          status === "personal-best" && "mt-2"
        )}>
          {headerText[status]}
        </h2>
        <p className="text-neutral-400">
          {descriptionText[status]}
        </p>
      </div>

      <dl className="flex flex-col md:flex-row gap-4 md:gap-5 md:mt-5 md:mb-8 w-full lg:justify-center max-w-120 md:max-w-none">
        <div className="results-stat-container">
          <dt className="stat-label">WPM:</dt>
          <dd className="stat-value">85</dd>
        </div>

        <div className="results-stat-container">
          <dt className="stat-label">Accuracy:</dt>
          <dd className="stat-value text-red-500">94%</dd>
        </div>

        <div className="results-stat-container">
          <dt className="stat-label">Characters</dt>
          <dd className="stat-value">
            <span className="text-green-500">
              120
            </span>
            <span className="text-neutral-500">
              /
            </span>
            <span className="text-red-500">
              5
            </span>
          </dd>
        </div>
      </dl>

      <button
        type="button"
        className="bg-neutral-0 rounded-xl py-4 px-2.5 text-neutral-900 inline-flex flex-row items-center justify-center gap-2.5 cursor-pointer"
      >
        <span className="font-semibold">
          {buttonText[status]}
        </span>

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422" />
        </svg>

      </button>

    </div>
  )
}

export default Results