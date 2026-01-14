import { useEffect, useState } from "react"
import data from "../../data.json"
import { cn } from "@/lib/utils"
import StartTestOverlay from "./StartTestOverlay"
import iconRestart from "@/assets/images/icon-restart.svg"

const text = data.hard[5].text

const TypingArea = () => {

  const [isStarted, setIsStarted] = useState(false)

  //* Prevent body scroll when test hasn't started
  useEffect(() => {
    if (!isStarted) {
      document.body.style.overflow = 'hidden'
      //* Prevent touch scroll on mobile
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }

    return () => {
      //* Cleanup when component unmounts
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isStarted])

  //** add border-neutral-700 to restart button instead of typing area */

  return (
    <div>
      <div className="typing-area pb-8 md:pb-10 xl-1200:pb-16">
        <div className="relative">

          <p className={cn(
            "typing-area-text text-[2rem] md:text-[2.5rem] text-neutral-400 transition-all",
            !isStarted && "blur-lg select-none max-h-[70vh] overflow-hidden"
          )}
          >
            {text}
          </p>

          {!isStarted &&
            <StartTestOverlay handleClick={() => setIsStarted(true)} />
          }
        </div>

      </div>
      {isStarted &&
        <div className="border-t border-neutral-700 w-full flex justify-center items-center pt-6 lg:pt-8">

          <button type="button" className="bg-neutral-800 rounded-xl font-semibold px-4 py-2.5 inline-flex gap-2.5 transition-all duration-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none 
          focus-visible:ring focus-visible:ring-hover-state cursor-pointer
          hover:ring hover:ring-hover-state hover:scale-105 active:scale-95">
            Restart Test
            <img src={iconRestart} alt="" />
          </button>

        </div>
      }
    </div>
  )
}

export default TypingArea