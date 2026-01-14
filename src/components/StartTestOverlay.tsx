type StartTestOverlayProps = {
  handleClick: () => void
}

const StartTestOverlay = ({ handleClick }: StartTestOverlayProps) => {
  return (
    <div className="
            absolute inset-0 z-50 
            flex flex-col items-center justify-center gap-5
            font-semibold text-[1.25rem]"
      onClick={handleClick}
    >
      <button
        type="button"
        className="bg-blue-600 text-neutral-0 px-6 py-3 rounded-xl 
              hover:bg-blue-400 cursor-pointer
              transition-all duration-200
              focus-visible:ring-offset-2 focus-visible:ring-offset-black
              focus-visible:ring-2 focus-visible:ring-active-state border-none outline-none active:scale-95"
        onClick={handleClick}
      >
        Start Typing Test
      </button>
      <p className="text-neutral-0 select-none">Or click the text and start typing</p>
    </div>
  )
}

export default StartTestOverlay