// components/HintButton.tsx
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store'
import { useState } from 'react'

export function HintButton() {
  const { solution, guesses, addLetter } = useGameStore()
  const [hintsUsed, setHintsUsed] = useState(0)

  const getHint = () => {
    if (hintsUsed >= 3) return // Limit to 3 hints per game

    const unrevealedLetters = solution.split('').filter((letter, index) => 
      !guesses.some(guess => guess[index] === letter)
    )
    if (unrevealedLetters.length > 0) {
      const hintLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)]
      addLetter(hintLetter)
      setHintsUsed(hintsUsed + 1)
    }
  }

  return (
    <Button 
      onClick={getHint} 
      disabled={hintsUsed >= 3}
      className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
    >
      Get a Hint ({3 - hintsUsed} left)
    </Button>
  )
}