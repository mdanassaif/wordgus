// app/page.tsx
"use client"
import { useState, useEffect, useCallback } from 'react'
import { GameBoard } from '@/components/GameBoard'
import { Keyboard } from '@/components/Keyboard'
import { Header } from '@/components/Header'
import { GameOverModal } from '@/components/GameOverModal'
import { StatsModal } from '@/components/StatsModal'
import { HelpModal } from '@/components/HelpModal'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { useGameStore } from '@/lib/store'
import { Toast } from '@/components/Toast'
import Timer from '@/components/Timer'
import { LandingPage } from '@/components/LandingPage'

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
    fetchStats
  } = useGameStore()

  const [gameStarted, setGameStarted] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [timerKey, setTimerKey] = useState(0)
  const [hintsLeft, setHintsLeft] = useState(2)
  const [timerStarted, setTimerStarted] = useState(false)

  const handleHint = useCallback(() => {
    if (hintsLeft > 0) {
      const unrevealedLetters = solution.split('').filter((letter, index) => 
        !guesses.some(guess => guess[index] === letter)
      )
      if (unrevealedLetters.length > 0) {
        const hintLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)]
        addLetter(hintLetter)
        setHintsLeft(prevHints => prevHints - 1)
      }
    }
  }, [hintsLeft, solution, guesses, addLetter])

  const handleNewGame = useCallback(() => {
    newGame()
    setTimerKey(prev => prev + 1)
    setHintsLeft(2)
    setTimerStarted(false)
  }, [newGame])

  const handleTimeOut = useCallback(() => {
    if (gameState === 'playing') {
      showToast("Time's up!")
      useGameStore.setState({ gameState: 'lost' })
    }
  }, [gameState])

  const showToast = useCallback((message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleSubmitGuess = useCallback(() => {
    submitGuess((message) => {
      showToast(message)
      if (guesses.length === 5 && currentGuess.length === 5) {
        // This is the last possible guess
        setTimeout(() => {
          if (currentGuess !== solution) {
            useGameStore.setState({ gameState: 'lost' })
          }
        }, 500) // Delay to allow for the last guess to be processed
      }
    })
    if (!timerStarted) {
      setTimerStarted(true)
    }
  }, [submitGuess, guesses, currentGuess, solution, timerStarted])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return
      if (event.key === 'Enter') {
        handleSubmitGuess()
      } else if (event.key === 'Backspace') {
        removeLetter()
      } else if (/^[A-Za-z]$/.test(event.key)) {
        addLetter(event.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, handleSubmitGuess, removeLetter, addLetter])

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing') return
    if (key === 'ENTER') {
      handleSubmitGuess()
    } else if (key === 'BACKSPACE') {
      removeLetter()
    } else {
      addLetter(key)
    }
  }, [gameState, handleSubmitGuess, removeLetter, addLetter])

  const startGame = useCallback(() => {
    setGameStarted(true)
    setTimerStarted(true)
  }, [])

  if (!gameStarted) {
    return <LandingPage onStartGame={startGame} />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24 font-sans">
      <Header
        onOpenStats={() => setShowStats(true)}
        onOpenHelp={() => setShowHelp(true)}
        onToggleMusic={() => updateSettings({ musicOn: !settings.musicOn })}
        musicOn={settings.musicOn}
      />
      {timerStarted && <Timer isGameOver={gameState !== 'playing'} timerKey={timerKey} onTimeOut={handleTimeOut} />}
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
        onHint={handleHint}
        hintsLeft={hintsLeft}
      />
  
      {gameState !== 'playing' && (
        <GameOverModal
          gameState={gameState}
          solution={solution}
          guesses={guesses}
          onNewGame={handleNewGame}
        />
      )}
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
      <BackgroundMusic />
    </main>
  )
}