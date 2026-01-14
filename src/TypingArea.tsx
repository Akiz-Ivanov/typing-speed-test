import data from "../data.json"

const text = data.easy[0].text

const TypingArea = () => {
  return (
    <div className="typing-area pb-8 md:pb-10 xl-1200:pb-16 border-b border-neutral-700">
      <p className="typing-area-text text-[2rem] md:text-[2.5rem] text-neutral-400">
        {text}
      </p>
    </div>
  )
}

export default TypingArea