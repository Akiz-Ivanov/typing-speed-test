import logoSmall from "@/assets/images/logo-small.svg"
import logoLarge from "@/assets/images/logo-large.svg"
import personalBestSvg from "@/assets/images/icon-personal-best.svg"
import { useTypingStore } from "@/store/typingStore"
import HistoryDialog from "../history/HistoryDialog"
import LeaderboardDialog from "../leaderboard/LeaderboardDialog"

const Header = () => {

  const { personalBest } = useTypingStore((state) => state)

  return (
    <header className="w-full mb-32-64 flex justify-between items-center">

      <div className="flex items-center gap-6">
        <h1>
          <picture>
            <source media="(min-width: 48rem)" srcSet={logoLarge} />
            <img
              src={logoSmall}
              alt="Typing Speed Test: Measure your typing speed and accuracy." />
          </picture>
        </h1>

        {/* Buttons next to logo on desktop */}
        <div className="hidden md:flex items-center gap-3">
          <HistoryDialog />
          <LeaderboardDialog />
        </div>
      </div>

      {/* Personal Best on right */}
      <div className="flex items-center gap-4">
        {/* Mobile buttons next to PB */}
        <div className="flex gap-3 md:hidden">
          <HistoryDialog />
          <LeaderboardDialog />
        </div>

        <div className="flex items-center gap-2.5">
          <img src={personalBestSvg} alt="" className="w-5" />
          <p className="gap-1 inline-flex items-baseline">
            <span className="text-neutral-400 text-base hidden md:inline">
              Personal best:
            </span>
            <span className="text-neutral-400 text-base md:hidden">
              Best:
            </span>
            <span className="text-neutral-0 text-lg ml-2">{personalBest} WPM</span>
          </p>
        </div>
      </div>

    </header>
  )
}

export default Header