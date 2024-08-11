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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Statistics</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{totalGames}</div>
            <div className="text-xs">Played</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{winPercentage}</div>
            <div className="text-xs">Win %</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs">Current Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.maxStreak}</div>
            <div className="text-xs">Max Streak</div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Guess Distribution</h3>
          {Object.entries(stats.guessDistribution).map(([guess, count]) => (
            <div key={guess} className="flex items-center mb-1">
              <div className="w-4 mr-2">{guess}</div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 flex-grow">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${(count / totalGames) * 100}%` }}
                ></div>
              </div>
              <div className="ml-2">{count}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}