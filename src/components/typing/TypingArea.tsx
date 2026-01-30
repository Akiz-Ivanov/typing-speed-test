import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import StartTestOverlay from "./StartTestOverlay"
import iconRestart from "@/assets/images/icon-restart.svg"
import { useTypingStore } from "@/store/typing"
import useScrollToCurrentChar from "@/hooks/useScrollToCurrentChar"
import AssistiveTechInfo from "../common/AssistiveTechInfo"

const TypingArea = () => {

  const {
    status,
    currentPassage,
    difficulty,
    textCategory,
    currentIndex,
    userInput,
    timeMode,
    wpm,
    accuracy,
    elapsedTime,
    generateRandomPassage,
    restartTest,
    handleKeyPress,
    startTest
  } = useTypingStore((state) => state)

  const isActive = status === "active"
  const isIdle = status === "idle"

  const inputRef = useRef<HTMLInputElement>(null)
  const [isInputFocused, setIsInputFocused] = useState(false)

  useScrollToCurrentChar()

  useEffect(() => {
    generateRandomPassage()
  }, [difficulty, textCategory])

  useEffect(() => {
    if (status === "idle" && !currentPassage) {
      generateRandomPassage()
    }
  }, [status, currentPassage])

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
    if (status === "active") {
      inputRef.current?.focus()
    }
  }, [status])

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      //* Escape to restart test
      if (e.key === "Escape" && status === "active") {
        e.preventDefault()
        restartTest()
        return
      }
      //* Ignore modifier keys, function keys, etc.
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (status === "idle") {
          e.preventDefault()
          startTest()
          //* Focus the input
          setTimeout(() => inputRef.current?.focus(), 0)
        }
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown)
    }
  }, [status])

  const handleRestartClick = () => {
    restartTest()
  }

  const handleNewPassageClick = () => {
    generateRandomPassage()
    restartTest()
  }

  return (
    <div>
      <div className="typing-area pb-8 md:pb-10 xl-1200:pb-16">
        <div className="relative group">

          {isActive && !isInputFocused && (
            <span className="absolute -top-3 text-gray-600/70 -translate-1/2 left-1/2 text-nowrap">
              Select text to continue typing
            </span>
          )}

          {/* {isActive && passageMetadata && (
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <PassageMetadataDisplay />
            </div>
          )} */}

          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            aria-autocomplete="none"
            data-lpignore="true"
            data-form-type="other"
            spellCheck={false}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={cn("absolute inset-0 opacity-0 cursor-pointer")}
            value={userInput}
            disabled={!isActive}
            onChange={(e) => {
              const newValue = e.target.value
              if (newValue.length < userInput.length) {
                const backspaceCount = userInput.length - newValue.length
                for (let i = 0; i < backspaceCount; i++) {
                  handleKeyPress("Backspace")
                }
              } else if (newValue.length > userInput.length) {
                const added = newValue.slice(userInput.length)
                for (const char of added) {
                  handleKeyPress(char)
                }
              } else {
                //* Reset to correct value
                e.target.value = userInput
                //* Keep cursor at the end
                e.target.setSelectionRange(userInput.length, userInput.length)
              }
            }}
            onSelect={(e) => {
              //* Prevent cursor movement
              const input = e.target as HTMLInputElement
              if (input.selectionStart !== userInput.length) {
                input.setSelectionRange(userInput.length, userInput.length)
              }
            }}
            onKeyDown={(e) => {
              //* Prevent arrow keys, home, end, etc.
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault()
              }
            }}
            onPaste={(e) => {
              e.preventDefault()
            }}
            onContextMenu={(e) => {
              e.preventDefault()
            }}
          />

          <p className={cn(
            "typing-area-text text-[2rem] md:text-[2.5rem] text-primary-foreground transition-all",
            isIdle && "blur-lg select-none max-h-[70vh] overflow-hidden",
            isActive && "max-h-[70vh] sm:max-h-none overflow-y-auto md:overflow-y-clip",
            isActive && !isInputFocused && "text-blue-300/60 group-hover:text-blue-300/90"
          )}
            style={{
              fontVariantLigatures: 'none',
              fontFeatureSettings: '"liga" 0, "clig" 0',
              WebkitFontFeatureSettings: '"liga" 0, "clig" 0',
            }}
          >
            {currentPassage.split('').map((char, i) => (
              <span
                key={i}
                data-char-index={i}
                data-test={`pos=${i},currentIndex=${currentIndex},userInput[i]=${userInput[i]},condition=${i < currentIndex}`}
                className={cn(
                  i < currentIndex && (
                    userInput[i] === char ? 'text-green-500' : 'text-red-500 underline'
                  ),
                  isActive && i === currentIndex && 'bg-blue-400/20 rounded-md'
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
            <img src={iconRestart} alt="" aria-hidden />
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

      <AssistiveTechInfo
        message={
          status === "idle" ? `Typing test ready. Press any letter to start. ${difficulty} difficulty, ${timeMode} mode.`
            : status === "active"
              ? `${currentIndex} of ${currentPassage.length} characters. ${wpm} WPM, ${accuracy}% accuracy.${timeMode !== "Passage" ? ` ${elapsedTime} seconds remaining.` : ""}`
              : ""
        }
        type="polite"
        debounceMs={status === "active" ? 1500 : 500} //* Less frequent during typing
      />

      {/* Instructions for screen readers */}
      <div className="sr-only" aria-live="polite">
        <h2>Typing Test</h2>
        <p>Difficulty: {difficulty}. Mode: {timeMode}.</p>
        <p>Correct characters appear in green, errors in red with underline.</p>
        <p>Current character has light blue background.</p>
        {isActive && (
          <p>
            Current character: "{currentPassage[currentIndex]}".
            Position {currentIndex + 1} of {currentPassage.length}.
          </p>
        )}
      </div>
    </div>
  )
}

export default TypingArea