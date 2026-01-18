import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion, AnimatePresence } from "framer-motion"
import copy from 'copy-to-clipboard'
import {
  Copy,
  Check,
  Mail,
} from "lucide-react"
import {
  SiWhatsapp,
  SiFacebook,
  SiTelegram,
  SiReddit
} from "react-icons/si"
import { SlSocialTwitter } from "react-icons/sl"
import { TbBrandLinkedin } from "react-icons/tb"
import { GiLaurelsTrophy } from "react-icons/gi"
import { FiShare2 } from "react-icons/fi";

type Props = {
  wpm: number
  accuracy: number
}

const SharePopover = ({ wpm, accuracy }: Props) => {
  const [copied, setCopied] = useState(false)
  const text = `I just typed ${wpm} WPM with ${accuracy}% accuracy! Can you beat my score?`
  const url = window.location.href
  const hashtags = "typingtest,typingchallenge,wpm"

  const encodedText = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(url)
  const encodedHashtags = encodeURIComponent(hashtags)

  const links = [
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`,
      icon: <SlSocialTwitter className="size-5 text-blue-400" />,
      color: "hover:bg-blue-900/20",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <SiFacebook className="size-5 text-blue-600" />,
      color: "hover:bg-blue-800/20",
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: <SiWhatsapp className="size-5 text-green-500" />,
      color: "hover:bg-green-900/20",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: <SiTelegram className="size-5 text-blue-500" />,
      color: "hover:bg-blue-700/20",
    },
    {
      name: "Reddit",
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
      icon: <SiReddit className="size-5 text-orange-500" />,
      color: "hover:bg-orange-900/20",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <TbBrandLinkedin className="size-5 text-blue-300" />,
      color: "hover:bg-blue-600/20",
    },
    {
      name: "Email",
      href: `mailto:?subject=My Typing Score&body=${encodedText}%0A%0A${encodedUrl}`,
      icon: <Mail className="size-5 text-red-400" />,
      color: "hover:bg-red-900/20",
    },
  ]

  const handleCopyLink = () => {
    const shareText = `${text}\n\n${url}`
    const success = copy(shareText)

    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      alert(`Copy this text:\n\n${shareText}`)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative bg-neutral-0 rounded-full p-3 text-neutral-900 
          hover:bg-blue-400 transition-all duration-300 hover:scale-105 active:scale-95
          group cursor-pointer"
        >
          <FiShare2 className="size-6 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/40 blur-md transition-all duration-300 -z-10" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        className="w-auto p-0 border border-blue-400 bg-neutral-900 shadow-2xl max-w-[98vw]"
        style={{
          border: '2px solid transparent',
          background: `
      linear-gradient(#0a0a0a, #0a0a0a) padding-box,
      linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899) border-box
    `,
          borderRadius: '0.75rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-1 inline-flex items-center">
              <span>
                Share Your Achievement!
              </span>
              <GiLaurelsTrophy className="size-6 text-yellow-400 inline-block ml-1.5" />
            </h3>
            <p className="text-sm text-neutral-400">
              Challenge your friends to beat {wpm} WPM
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-4 gap-2 mb-4"
          >
            {links.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: {
                    opacity: 0,
                    scale: 0.8,
                    y: 10
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.08,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.08,
                  transition: { duration: 0.15 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center px-3 py-3.5 rounded-lg bg-neutral-800 ${item.color} transition-colors will-change-transform`}
                aria-label={`Share on ${item.name}`}
              >
                {item.icon}
                <span className="text-xs mt-1 text-neutral-300">
                  {item.name}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <div className="pt-3 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-400">
                Share link:
              </div>
              <motion.button
                onClick={handleCopyLink}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Check className="size-4 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="size-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="ml-1">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}

export default SharePopover