// components/Keyboard.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from '@/lib/store';
import { Delete, CornerDownLeft, Lightbulb } from 'lucide-react';

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: Record<string, string>;
  settings: Settings;
  onHint: () => void;
  hintsLeft: number;
}

export function Keyboard({ onKeyPress, usedLetters, settings, onHint, hintsLeft }: KeyboardProps) {
  const getKeyStyle = (key: string) => {
    const baseStyle = "font-bold text-sm sm:text-base transition-all duration-300 rounded-2xl shadow-lg active:shadow-inner active:translate-y-0.5 backdrop-blur-sm";
    
    switch (usedLetters[key]) {
      case 'correct': return `${baseStyle} bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white`;
      case 'present': return `${baseStyle} bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white`;
      case 'absent': return `${baseStyle} bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 text-white`;
      default: return `${baseStyle} bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-black dark:text-white hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700`;
    }
  };

  const specialButtonStyle = "font-bold text-sm sm:text-base transition-all duration-300 rounded-2xl shadow-lg active:shadow-inner active:translate-y-0.5 backdrop-blur-sm";

  return (
    <div className="w-full max-w-lg mx-auto px-2 sm:px-4 mt-6">
      <div className="flex justify-between mb-4 gap-2">
        <Button
          className={`${specialButtonStyle} bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white flex-grow`}
          onClick={() => onKeyPress('ENTER')}
        >
          <CornerDownLeft className="h-5 w-5 mr-1" /> Enter
        </Button>
        <Button
          className={`${specialButtonStyle} bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white flex-grow`}
          onClick={() => onHint()}
          disabled={hintsLeft <= 0}
        >
          <Lightbulb className="h-5 w-5 mr-1" /> Hint ({hintsLeft})
        </Button>
        <Button
          className={`${specialButtonStyle} bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white flex-grow`}
          onClick={() => onKeyPress('BACKSPACE')}
        >
          <Delete className="h-5 w-5 mr-1" /> Remove
        </Button>
      </div>
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 sm:mb-3 gap-1.5 sm:gap-2">
          {row.map((key) => (
            <Button
              key={key}
              className={getKeyStyle(key)}
              onClick={() => onKeyPress(key)}
              style={{
                flex: 1,
                minWidth: '32px',
                height: '56px',
                padding: '0',
              }}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}