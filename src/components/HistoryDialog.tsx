import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { History } from "lucide-react"
import HistoryPanel from "./HistoryPanel"
import { useTypingStore } from "@/store/typingStore"
import WpmChart from "./WpmChart"

const HistoryDialog = () => {

  const { testHistory } = useTypingStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 
    hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600
    transition-all duration-200 text-neutral-0 font-medium
    hover:scale-105 active:scale-95 cursor-pointer">
          <History size={18} />
          <span className="hidden lg:block">View History</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Test History</DialogTitle>
        </DialogHeader>
        <HistoryPanel />
        <DialogFooter>
          <WpmChart history={testHistory} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default HistoryDialog