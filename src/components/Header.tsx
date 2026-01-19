import logoSmall from "@/assets/images/logo-small.svg"
import logoLarge from "@/assets/images/logo-large.svg"
import personalBestSvg from "@/assets/images/icon-personal-best.svg"
import { useTypingStore } from "@/store/typingStore"
import HistoryDialog from "./HistoryDialog"

const Header = () => {

  const { personalBest } = useTypingStore((state) => state)

  return (
    <header className="w-full mb-8 flex justify-between items-center">

      <h1>
        <picture>
          <source media="(min-width: 48rem)" srcSet={logoLarge} />
          <img
            src={logoSmall}
            alt="Typing Speed Test: Measure your typing speed and accuracy." />
        </picture>
      </h1>

      <div className="flex items-center gap-2.5">

        <img src={personalBestSvg} alt="" className="w-5" />

        <p className="gap-1 inline-flex items-baseline">
          <span className="text-neutral-400 text-base">
            <span className="md:hidden">Best:</span>
            <span className="hidden md:inline">Personal best:</span>
          </span>
          <span className="text-neutral-0 text-lg">{personalBest} WPM</span>
        </p>

        <HistoryDialog />

      </div>
    </header>
  )
}

export default Header