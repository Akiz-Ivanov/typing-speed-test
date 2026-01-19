import { useEffect, useRef, useState } from "react"

type Props = {
  message: string
  type?: 'polite' | 'assertive' | 'off'
  debounceMs?: number
}

const AssistiveTechInfo = ({ message, type = 'polite', debounceMs = 500 }: Props) => {
  const [announcedMessage, setAnnouncedMessage] = useState("")
  const lastMessageRef = useRef("")
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (message !== lastMessageRef.current) {
      //* Clear previous timer
      if (timerRef.current) clearTimeout(timerRef.current)

      //* Set new message after debounce
      timerRef.current = setTimeout(() => {
        setAnnouncedMessage(message)
        lastMessageRef.current = message
      }, debounceMs)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [message, debounceMs])

  return (
    <div
      role="status"
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
      key={announcedMessage} //* Force re-announcement on change
    >
      {announcedMessage}
    </div>
  )
}

export default AssistiveTechInfo