// components/Header.tsx
import React from 'react';
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import { BarChart, HelpCircle, Music } from 'lucide-react'

interface HeaderProps {
  onOpenStats: () => void
  onOpenHelp: () => void
  onToggleMusic: () => void
  musicOn: boolean
}

export function Header({ onOpenStats, onOpenHelp, onToggleMusic, musicOn }: HeaderProps) {
  return (
    <header className="w-full max-w-4xl mx-auto flex justify-between items-center py-4 px-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onOpenHelp} 
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-300 hover:rotate-12"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <h1 className="text-4xl font-extrabold font-sans relative">
          <span className="inline-block animate-bounce-slow">W</span>
          <span className="inline-block animate-bounce-slow animation-delay-100">o</span>
          <span className="inline-block animate-bounce-slow animation-delay-200">r</span>
          <span className="inline-block animate-bounce-slow animation-delay-300">d</span>
          <span className="inline-block animate-bounce-slow animation-delay-400 text-purple-500">G</span>
          <span className="inline-block animate-bounce-slow animation-delay-500 text-pink-500">u</span>
          <span className="inline-block animate-bounce-slow animation-delay-600 text-purple-500">s</span>
        </h1>
      </div>
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onOpenStats} 
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-all duration-300 hover:scale-110"
        >
          <BarChart className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleMusic} 
          className={`transition-all duration-300 hover:scale-110 ${
            musicOn 
              ? 'text-green-500 hover:text-green-600 animate-bounce' 
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
          }`}
        >
          <Music className="h-5 w-5" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}