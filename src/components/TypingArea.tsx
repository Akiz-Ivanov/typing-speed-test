import { useEffect } from "react"
import { cn } from "@/lib/utils"
import StartTestOverlay from "./StartTestOverlay"
import iconRestart from "@/assets/images/icon-restart.svg"
import { useTypingStore } from "@/store/typingStore"

const TypingArea = () => {
  
  const { 
    status, 
    currentPassage, 
    difficulty, 
    currentIndex, 
    userInput, 
    generateRandomPassage, 
    restartTest,
    handleKeyPress,
    completeTest
  } = useTypingStore((state) => state)
  
  const isActive = status === "active"
  const isIdle = status === "idle"

  useEffect(() => {
    generateRandomPassage()
  }, [difficulty])

  //* Prevent body scroll when test hasn't started
  useEffect(() => {
    if (isIdle) {
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
  }, [status])

  useEffect(() => {
    if (status !== "active") return

    const handleKey = (e: KeyboardEvent) => {
      e.preventDefault()
      handleKeyPress(e.key)

      // Check if test complete
      if (currentIndex >= currentPassage.length - 1) {
        completeTest()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [status, currentIndex, currentPassage.length])

  const handleRestartClick = () => {
    restartTest()
  }

  const handleNewPassageClick = () => {
    generateRandomPassage()
    restartTest() 
  }

  //** add border-neutral-700 to restart button instead of typing area */

  return (
    <div>
      <div className="typing-area pb-8 md:pb-10 xl-1200:pb-16">
        <div className="relative">

          <p className={cn(
            "typing-area-text text-[2rem] md:text-[2.5rem] text-neutral-400 transition-all",
            isIdle && "blur-lg select-none max-h-[70vh] overflow-hidden"
          )}
          >
            {currentPassage.split('').map((char, i) => (
              <span
                key={i}
                className={cn(
                  i < currentIndex && (
                    userInput[i] === char ? 'text-green-500' : 'text-red-500 underline'
                  ),
                  i === currentIndex && 'bg-blue-400/20'
                )}
              >
                {char}
              </span>
            ))}
          </p>

          {isIdle &&
            <StartTestOverlay />
          }
        </div>

      </div>
      {isActive &&
        <div className="border-t border-neutral-700 w-full flex justify-center items-center pt-6 lg:pt-8 gap-4">

          <button 
            type="button" 
            className="bg-neutral-800 rounded-xl font-semibold px-4 py-2.5 inline-flex gap-2.5 
              transition-all duration-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none 
              focus-visible:ring focus-visible:ring-hover-state cursor-pointer
              hover:ring hover:ring-hover-state hover:scale-105 active:scale-95"
            onClick={handleRestartClick}
            >
            Restart Test
            <img src={iconRestart} alt="" />
          </button>

          <button
            type="button"
            className="bg-neutral-800 rounded-xl font-semibold px-4 py-2.5 inline-flex gap-2.5 
              transition-all duration-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none 
              focus-visible:ring focus-visible:ring-hover-state cursor-pointer
              hover:ring hover:ring-hover-state hover:scale-105 active:scale-95"
            onClick={handleNewPassageClick}
          >
            New Passage   
          </button>

        </div>
      }
    </div>
  )
}

export default TypingArea