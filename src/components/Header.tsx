// components/Header.tsx
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import { Settings, BarChart, HelpCircle } from 'lucide-react'

interface HeaderProps {
  onOpenSettings: () => void
  onOpenStats: () => void
  onOpenHelp: () => void
}

export function Header({ onOpenSettings, onOpenStats, onOpenHelp }: HeaderProps) {
  return (
    <header className="w-full flex justify-between items-center p-4">
      <Button variant="ghost" size="icon" onClick={onOpenHelp}>
        <HelpCircle className="h-6 w-6" />
      </Button>
      <h1 className="text-3xl font-bold">Wordle</h1>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" onClick={onOpenStats}>
          <BarChart className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onOpenSettings}>
          <Settings className="h-6 w-6" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}