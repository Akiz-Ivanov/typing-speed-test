import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion } from "framer-motion"
import { ShareIcon, Copy } from "lucide-react"
import { SiWhatsapp, SiFacebook } from "react-icons/si"
import { SlSocialTwitter } from "react-icons/sl";
import { GiPartyPopper } from "react-icons/gi";

type Props = {
  wpm: number
  accuracy: number
}

const SharePopover = ({ wpm, accuracy }: Props) => {
  const text = `I just typed ${wpm} WPM with ${accuracy}% accuracy! Can you beat my score?`
  const url = "https://yourtypingapp.com"

  const encodedText = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(url)

  const links = [
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: <SlSocialTwitter className="size-5 text-blue-400" />,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <SiFacebook className="size-5 text-blue-600" />,
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: <SiWhatsapp className="size-5 text-green-500" />,
    },
  ]

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url)
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
          className="flex flex-col gap-4 rounded-md bg-neutral-800 p-4 text-center"
        >
          <span className="text-base font-semibold inline-flex justify-center items-center">
            Share your score
            <GiPartyPopper className="size-6 ml-2" />
          </span>

          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="flex gap-3 justify-between"
          >

            {links.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1 },
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="bg-neutral-800 rounded-full p-2.5 border border-neutral-700"
              >
                {item.icon}
              </motion.a>
            ))}

            <motion.button
              onClick={handleCopyLink}
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="bg-neutral-800 rounded-full p-2.5 border border-neutral-700 cursor-pointer"
            >
              <Copy className="size-5 text-white" />
            </motion.button>

          </motion.div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}

export default SharePopover