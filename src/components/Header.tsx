import logoSmall from "../assets/images/logo-small.svg"
import logoLarge from "../assets/images/logo-large.svg"
import personalBest from "../assets/images/icon-personal-best.svg"

const Header = () => {

  return (
    <header className="w-full mb-8 flex justify-between items-center">
      <picture>
        <source media="(min-width: 48rem)" srcSet={logoLarge} />
        <img src={logoSmall} alt="Typing Speed Test logo." />
      </picture>

      <div className="flex items-center gap-2.5">

        <img src={personalBest} alt="" className="w-5" />

        <p className="gap-1 inline-flex items-baseline">
          <span className="text-neutral-400 text-base">
            <span className="md:hidden">Best:</span>
            <span className="hidden md:inline">Personal best:</span>
          </span>
          <span className="text-neutral-0 text-lg">92 WPM</span>
        </p>

      </div>
    </header>
  )
}

export default Header