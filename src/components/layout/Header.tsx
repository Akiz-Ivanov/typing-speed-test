import logoSmall from "@/assets/images/logo-small.svg"
import logoLarge from "@/assets/images/logo-large.svg"
import personalBestSvg from "@/assets/images/icon-personal-best.svg"
import { useTypingStore } from "@/store/typing"
import HistoryDialog from "../history/HistoryDialog"
import LeaderboardDialog from "../leaderboard/LeaderboardDialog"

const Header = () => {

  const { personalBest } = useTypingStore((state) => state)

  return (
    <header className="w-full mb-32-64 flex justify-between items-center">

      <div className="flex items-center gap-6">
        <h1 className="flex items-center gap-2">
          <img
            src={logoSmall}
            alt=""
          />
          <div className="hidden md:flex md:flex-col gap-0.5">
            <span className="text-2xl font-semibold leading-tight">
              Typing Speed Test
            </span>
            <span className="text-[.75rem] text-primary-foreground leading-tight">
              Type as fast as you can in 60 seconds
            </span>
          </div>
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
            <span className="text-primary-foreground text-base hidden md:inline">
              Personal best:
            </span>
            <span className="text-primary-foreground text-base md:hidden">
              Best:
            </span>
            <span className="text-lg ml-2">{personalBest} WPM</span>
          </p>
        </div>
      </div>

    </header>
  )
}

export default Header