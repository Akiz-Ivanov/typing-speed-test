import { useEffect, useRef } from "react"
import { useTypingStore } from "../store/typing"

const useScrollToCurrentChar = () => {
  const { currentIndex, status } = useTypingStore()
  const lastScrolledIndex = useRef(0)

  useEffect(() => {
    if (status === "active" && currentIndex > lastScrolledIndex.current) {
      //* Scroll to current char every 10 chars
      if (currentIndex % 10 === 0 || currentIndex - lastScrolledIndex.current >= 10) {
        const currentCharSpan = document.querySelector(`[data-char-index="${currentIndex}"]`)

        if (currentCharSpan) {
          requestAnimationFrame(() => {
            currentCharSpan.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            })
          })

          lastScrolledIndex.current = currentIndex
        }
      }
    }
  }, [currentIndex, status])
}

export default useScrollToCurrentChar