import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from '@/lib/store';

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: Record<string, string>;
  settings: Settings;
}

export function Keyboard({ onKeyPress, usedLetters, settings }: KeyboardProps) {
  const getKeyStyle = (key: string) => {
    const baseStyle = "font-bold text-xs sm:text-sm md:text-base transition-colors duration-300 h-8 sm:h-10 md:h-12";
    if (key === 'ENTER' || key === '⌫') 
      return `${baseStyle} bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-1 sm:px-2 md:px-3 flex-grow`;
    
    switch (usedLetters[key]) {
      case 'correct': return `${baseStyle} bg-green-500 text-white`;
      case 'present': return `${baseStyle} bg-yellow-500 text-white`;
      case 'absent': return `${baseStyle} bg-gray-400 dark:bg-gray-600 text-white`;
      default: return `${baseStyle} bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700`;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-1 sm:px-2">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1 sm:mb-2 gap-1 sm:gap-2">
          {row.map((key) => (
            <Button
              key={key}
              className={getKeyStyle(key)}
              onClick={() => onKeyPress(key === '⌫' ? 'BACKSPACE' : key)}
              style={{
                flex: key === 'ENTER' || key === '⌫' ? '1.5' : '1',
                minWidth: key === 'ENTER' || key === '⌫' ? '60px' : '20px',
                fontSize: key === 'ENTER' || key === '⌫' ? '0.7rem' : 'inherit',
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