// components/StatsModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Stats } from "@/lib/store"

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
  stats: Stats
}

export function StatsModal({ isOpen, onClose, stats }: StatsModalProps) {
  const totalGames = stats.gamesPlayed
  const winPercentage = totalGames > 0 ? Math.round((stats.gamesWon / totalGames) * 100) : 0
  const gamesLost = totalGames - stats.gamesWon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Statistics</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{totalGames}</div>
            <div className="text-xs">Played</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{winPercentage}%</div>
            <div className="text-xs">Win %</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.gamesWon}</div>
            <div className="text-xs">Won</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{gamesLost}</div>
            <div className="text-xs">Lost</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}