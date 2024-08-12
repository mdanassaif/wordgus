// components/Header.tsx
import React from 'react';
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import { ChartNoAxesCombined, HelpCircle, Music } from 'lucide-react'
import { motion } from 'framer-motion';

interface HeaderProps {
  onOpenStats: () => void
  onOpenHelp: () => void
  onToggleMusic: () => void
  musicOn: boolean
}

export function Header({ onOpenStats, onOpenHelp, onToggleMusic, musicOn }: HeaderProps) {
  const title = "WordGus"

  return (
    <motion.header 
      className="w-full max-w-4xl mx-auto flex flex-wrap justify-between items-center py-2 px-3 sm:py-4 sm:px-6 border-b border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
        <motion.div whileHover={{ rotate: 180 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onOpenHelp} 
            className="text-gray-300 hover:text-pink-500 dark:text-gray-200 dark:hover:text-white transition-all duration-300"
          >
            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </motion.div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans whitespace-nowrap">
          {title.split('').map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              style={{
                color: `hsl(${index * 360 / title.length}, 70%, 70%)`,
                textShadow: '0 0 10px rgba(255,255,255,0.3)'
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'loop',
                delay: index * 0.1,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onOpenStats} 
            className="text-gray-300 hover:text-pink-500 dark:text-gray-200 dark:hover:text-white transition-all duration-300"
          >
            <ChartNoAxesCombined className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleMusic} 
            className={`transition-all duration-300 ${
              musicOn 
                ? 'text-green-500 hover:text-green-600' 
                : 'text-gray-300 hover:text-pink-500 dark:text-gray-200 dark:hover:text-white'
            }`}
          >
            <Music className={`h-4 w-4 sm:h-5 sm:w-5 ${musicOn ? 'animate-bounce' : ''}`} />
          </Button>
        </motion.div>
        <ThemeToggle />
      </div>
    </motion.header>
  )
}