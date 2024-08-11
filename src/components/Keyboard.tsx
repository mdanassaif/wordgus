// components/Keyboard.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from '@/lib/store';
import { Delete, CornerDownLeft } from 'lucide-react';

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
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
    const baseStyle = "font-semibold text-sm sm:text-base transition-all duration-200 rounded-xl shadow-md active:shadow-sm active:translate-y-0.5";
    
    switch (usedLetters[key]) {
      case 'correct': return `${baseStyle} bg-green-500 hover:bg-green-600 text-white`;
      case 'present': return `${baseStyle} bg-yellow-500 hover:bg-yellow-600 text-white`;
      case 'absent': return `${baseStyle} bg-gray-400 dark:bg-gray-600 text-white`;
      default: return `${baseStyle} bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600`;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-2 sm:px-4 mt-4">
      <div className="flex justify-center mb-2 gap-2">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow-md active:shadow-sm active:translate-y-0.5 transition-all duration-200"
          onClick={() => onHint()}
          disabled={hintsLeft <= 0}
        >
          Hint ({hintsLeft})
        </Button>
      </div>
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1.5 sm:mb-2 gap-1 sm:gap-1.5">
          {row.map((key) => (
            <Button
              key={key}
              className={getKeyStyle(key)}
              onClick={() => onKeyPress(key)}
              style={{
                flex: key === 'ENTER' || key === 'BACKSPACE' ? 1.5 : 1,
                minWidth: '24px',
                height: '48px',
                padding: '0',
              }}
            >
              {key === 'ENTER' ? (
                <CornerDownLeft className="h-5 w-5" />
              ) : key === 'BACKSPACE' ? (
                <Delete className="h-5 w-5" />
              ) : (
                key
              )}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
