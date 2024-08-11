// components/HintButton.tsx
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store'

export function HintButton() {
  const { solution, settings, guesses } = useGameStore()

  const getHint = () => {
    const unrevealedLetters = solution.split('').filter((letter, index) => 
      !guesses.some(guess => guess[index] === letter)
    )
    if (unrevealedLetters.length > 0) {
      const hintLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)]
      // Implement logic to reveal the hint letter in the game board
      console.log(`Hint: The word contains the letter ${hintLetter}`)
      // You might want to update the game state to show this hint
    }
  }

  return (
    <Button onClick={getHint} disabled={settings.hardMode}>
      Get Hint
    </Button>
  )
}