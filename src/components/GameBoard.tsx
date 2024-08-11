// components/GameBoard.tsx
import { motion } from 'framer-motion'
import { Settings } from '@/lib/store'

interface GameBoardProps {
  guesses: string[]
  currentGuess: string
  solution: string
  settings: Settings
}

export function GameBoard({ guesses, currentGuess, solution, settings }: GameBoardProps) {
  const emptyRows = 6 - guesses.length - 1
  const boardState = [...guesses, currentGuess, ...Array.from({ length: emptyRows }, () => '')]

  const getTileColor = (letter: string, index: number, row: number) => {
    if (row >= guesses.length) return 'bg-gray-200 dark:bg-gray-700 text-[hsl(var(--text-color))]'
    if (letter === solution[index]) return settings.colorBlindMode ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
    if (solution.includes(letter)) return settings.colorBlindMode ? 'bg-orange-500 text-white' : 'bg-yellow-500 text-white'
    return 'bg-gray-400 dark:bg-gray-600 text-white'
  }

  return (
    <div className="grid grid-rows-6 gap-1 p-2 w-full max-w-sm mx-auto">
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-1">
          {row.padEnd(5).split('').map((letter, colIndex) => (
            <motion.div
              key={colIndex}
              className={`aspect-square flex items-center justify-center text-2xl font-bold rounded ${getTileColor(letter, colIndex, rowIndex)}`}
              initial={{ scale: 1 }}
              animate={{ scale: letter ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3, delay: colIndex * 0.1 }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}