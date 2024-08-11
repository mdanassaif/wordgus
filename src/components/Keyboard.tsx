import { Button } from "@/components/ui/button"

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
]

import { Settings } from '@/lib/store'

interface KeyboardProps {
  onKeyPress: (key: string) => void
  usedLetters: Record<string, 'correct' | 'present' | 'absent'>
  settings: Settings
}

export function Keyboard({  onKeyPress, usedLetters, settings  }: KeyboardProps) {
  const getKeyStyle = (key: string) => {
    const baseStyle = "font-bold text-sm sm:text-base transition-colors duration-300 min-w-[2rem] sm:min-w-[2.5rem]"
    if (key === 'ENTER' || key === '⌫') return `${baseStyle} bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 sm:px-3`
    
    switch (usedLetters[key]) {
      case 'correct': return `${baseStyle} bg-green-500 text-white`
      case 'present': return `${baseStyle} bg-yellow-500 text-white`
      case 'absent': return `${baseStyle} bg-gray-400 dark:bg-gray-600 text-white`
      default: return `${baseStyle} bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700`
    }
  }

  return (
    <div className="mt-4 max-w-lg mx-auto">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 gap-1 sm:gap-2">
          {row.map((key) => (
            <Button
              key={key}
              className={getKeyStyle(key)}
              onClick={() => onKeyPress(key === '⌫' ? 'BACKSPACE' : key)}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}