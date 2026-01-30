import { useTypingStore } from "@/store/typing"

const StartTestOverlay = () => {

  const startTest = useTypingStore((state) => state.startTest)

  return (
    <div className="
            absolute inset-0 z-50 
            flex flex-col items-center justify-center gap-5
            font-semibold text-[1.25rem] text-center"
      onClick={startTest}
    >
      <button
        type="button"
        className="bg-btn-primary-bg px-6 py-3 rounded-xl 
              hover:bg-hover-state cursor-pointer
              transition-all duration-200
              focus-visible:ring-offset-2 focus-visible:ring-offset-black
              focus-visible:ring-2 focus-visible:ring-active-state border-none outline-none active:scale-95"
      >
        Start Typing Test
      </button>
      <p className="select-none mx-auto">Or click the text and start typing</p>
    </div>
  )
}

export default StartTestOverlay