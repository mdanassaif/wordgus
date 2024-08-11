// components/Header.tsx
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
        <Button variant="ghost" size="sm" onClick={onOpenHelp} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 font-sans">
          WordGus
        </h1>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={onOpenStats} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
          <BarChart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onToggleMusic} className={`${musicOn ? 'text-green-500 hover:text-green-600' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'}`}>
          <Music className="h-5 w-5" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}