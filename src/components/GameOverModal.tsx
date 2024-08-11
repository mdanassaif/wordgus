import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Share2 } from 'lucide-react'

interface GameOverModalProps {
  gameState: 'won' | 'lost' | 'playing'
  solution: string
  guesses: string[]
  onNewGame: () => void
}

export function GameOverModal({ gameState, solution, guesses, onNewGame }: GameOverModalProps) {
    if (gameState === 'playing') return null
  

  return (
    <Dialog open={gameState === 'won' || gameState === 'lost'}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{gameState === 'won' ? 'Congratulations!' : 'Game Over'}</DialogTitle>
          <DialogDescription>
            {gameState === 'won'
              ? `You guessed the word in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!`
              : `The word was ${solution}. Better luck next time!`}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onNewGame}>New Game</Button>
      </DialogContent>
    </Dialog>
  )
}