import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion } from "framer-motion"
import { ShareIcon, Copy, PartyPopper } from "lucide-react"
import { SiWhatsapp, SiFacebook } from "react-icons/si"
import { SlSocialTwitter } from "react-icons/sl";
import { GiPartyPopper } from "react-icons/gi";

type Props = {
  wpm: number
  accuracy: number
}

const SharePopover = ({ wpm, accuracy }: Props) => {
  const shareUrl = encodeURIComponent("https://yourtypingapp.com")
  const shareText = `I just typed ${wpm} WPM with ${accuracy}% accuracy! Can you beat my score?`

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`
    window.open(url, "_blank")
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`
    window.open(url, "_blank")
  }

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`
    window.open(url, "_blank")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://yourtypingapp.com`)
      alert("Link copied!")
    } catch (err) {
      console.error("Failed to copy link", err)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-neutral-0 rounded-full p-2.5 text-neutral-900 inline-flex items-center justify-center cursor-pointer">
          <ShareIcon className="size-6" />
        </button>
      </PopoverTrigger>

      <PopoverContent asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col gap-4 rounded-md bg-neutral-900 p-4 text-center"
        >
          <span className="text-base font-semibold inline-flex justify-center items-center">
            Share your score
            <GiPartyPopper className="size-6 ml-2" />
          </span>
          <div className="flex justify-between gap-2">
            <button
              onClick={handleShareTwitter}
              className="p-2.5 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-150"
            >
              <SlSocialTwitter className="size-6" />
            </button>
            <button
              onClick={handleShareFacebook}
              className="p-2.5 rounded-full bg-blue-700 text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-150"
            >
              <SiFacebook className="size-6" />
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="p-2.5 rounded-full bg-green-500 text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-150"
            >
              <SiWhatsapp className="size-6" />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-full bg-neutral-700 text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-150"
            >
              <Copy className="size-6" />
            </button>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}

export default SharePopover