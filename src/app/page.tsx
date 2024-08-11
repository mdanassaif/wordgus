"use client"
import { useState, useEffect } from 'react'
import { GameBoard } from '@/components/GameBoard'
import { Keyboard } from '@/components/Keyboard'
import { Header } from '@/components/Header'
import { GameOverModal } from '@/components/GameOverModal'
import { SettingsModal } from '@/components/SettingsModal'
import { StatsModal } from '@/components/StatsModal'
import { HelpModal } from '@/components/HelpModal'
import { useGameStore } from '@/lib/store'
import { Toast } from '@/components/Toast'

export default function Home() {
  const {
    guesses,
    currentGuess,
    gameState,
    solution,
    usedLetters,
    addLetter,
    removeLetter,
    submitGuess,
    newGame,
    settings,
    updateSettings,
    stats,
    updateStats
  } = useGameStore()

  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return
      if (event.key === 'Enter') {
        submitGuess()
      } else if (event.key === 'Backspace') {
        removeLetter()
      } else if (/^[A-Za-z]$/.test(event.key)) {
        addLetter(event.key.toUpperCase())
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, submitGuess, removeLetter, addLetter])

  const handleKeyPress = (key: string) => {
    if (gameState !== 'playing') return
    if (key === 'ENTER') {
      submitGuess()
    } else if (key === 'BACKSPACE') {
      removeLetter()
    } else {
      addLetter(key)
    }
  }

  const handleNewGame = () => {
    newGame()
    updateStats(gameState)
  }

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24 font-sans">
      <Header
        onOpenSettings={() => setShowSettings(true)}
        onOpenStats={() => setShowStats(true)}
        onOpenHelp={() => setShowHelp(true)}
      />
      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        solution={solution}
        settings={settings}
      />
      <Keyboard
        onKeyPress={handleKeyPress}
        usedLetters={usedLetters}
        settings={settings}
      />
      {gameState !== 'playing' && (
        <GameOverModal
          gameState={gameState}
          solution={solution}
          guesses={guesses}
          onNewGame={handleNewGame}
        />
      )}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
      />
      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
      {toast && <Toast message={toast} />}
    </main>
  )
}