import { motion } from 'framer-motion'
import { Settings } from '@/lib/store'

interface GameBoardProps {
  guesses: string[]
  currentGuess: string
  solution: string
  settings: Settings
}

export function GameBoard({ guesses, currentGuess, solution, settings }: GameBoardProps) {
  const boardState = [...guesses, currentGuess].concat(Array(6 - guesses.length - 1).fill(''))

  const getTileColor = (letter: string, index: number, row: number) => {
    if (row >= guesses.length) return 'bg-gray-200 dark:bg-gray-700'
    if (letter === solution[index]) return settings.colorBlindMode ? 'bg-blue-500' : 'bg-green-500'
    if (solution.includes(letter)) return settings.colorBlindMode ? 'bg-orange-500' : 'bg-yellow-500'
    return 'bg-gray-400 dark:bg-gray-600'
  }

  return (
    <div className="grid grid-rows-6 gap-1 p-2">
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-1">
          {Array.from(row.padEnd(5)).map((letter, colIndex) => (
           <motion.div
           key={colIndex}
           className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl font-bold rounded ${getTileColor(letter, colIndex, rowIndex)}`}
           initial={{ rotateX: 0 }}
           animate={{ rotateX: letter ? 360 : 0 }}
           transition={{ duration: 0.5, delay: colIndex * 0.1 }}
         >
           {letter}
         </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}