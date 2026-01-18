type Props = {
  message: string
  type?: 'polite' | 'assertive' | 'off'
}

const AssistiveTechInfo = ({ message, type = 'polite' }: Props) => {
  return (
    <div
      role="status"
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

// components/TypingInstructions.tsx
const TypingInstructions = () => {
  return (
    <div className="sr-only">
      <h2>Typing Test Instructions</h2>
      <p>
        This is a typing speed test. Type the text shown in the typing area.
        Your words per minute (WPM) and accuracy will be calculated as you type.
      </p>
      <p>
        Press any key to start the test. Use Backspace to correct mistakes.
        The test ends when you finish typing all characters.
      </p>
    </div>
  )
}