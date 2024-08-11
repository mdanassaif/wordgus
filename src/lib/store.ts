import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getRandomWord } from './words'

export interface Settings {
  hardMode: boolean
  darkMode: boolean
  colorBlindMode: boolean
  musicOn: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Stats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: Record<number, number>
}

interface GameState {
  solution: string
  guesses: string[]
  currentGuess: string
  gameState: 'playing' | 'won' | 'lost'
  usedLetters: Record<string, 'correct' | 'present' | 'absent'>
  settings: Settings
  stats: Stats
  addLetter: (letter: string) => void
  removeLetter: () => void
  submitGuess: () => void
  newGame: () => void
  updateSettings: (newSettings: Partial<Settings>) => void
  updateStats: (gameState: 'won' | 'lost' | 'playing') => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      solution: getRandomWord('medium'),
      guesses: [],
      currentGuess: '',
      gameState: 'playing',
      usedLetters: {},
      
      settings: {
        hardMode: false,
        darkMode: false,
        colorBlindMode: false,
        musicOn: false,
        difficulty: 'medium',
      },
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
      },

      addLetter: (letter) => {
        const { currentGuess } = get()
        if (currentGuess.length < 5) {
          set({ currentGuess: currentGuess + letter })
        }
      },

      removeLetter: () => {
        const { currentGuess } = get()
        set({ currentGuess: currentGuess.slice(0, -1) })
      },

      submitGuess: () => {
        const { currentGuess, guesses, solution, settings } = get()
        if (currentGuess.length !== 5) return
        if (settings.hardMode && !isValidHardModeGuess(currentGuess, guesses, solution)) {
          // Show error message for invalid hard mode guess
          return
        }

        const newGuesses = [...guesses, currentGuess]
        const newUsedLetters = { ...get().usedLetters }

        currentGuess.split('').forEach((letter, index) => {
          if (letter === solution[index]) {
            newUsedLetters[letter] = 'correct'
          } else if (solution.includes(letter)) {
            if (newUsedLetters[letter] !== 'correct') {
              newUsedLetters[letter] = 'present'
            }
          } else {
            if (!newUsedLetters[letter]) {
              newUsedLetters[letter] = 'absent'
            }
          }
        })

        let newGameState: 'playing' | 'won' | 'lost' = 'playing'
        if (currentGuess === solution) {
          newGameState = 'won'
        } else if (newGuesses.length === 6) {
          newGameState = 'lost'
        }

        set({
          guesses: newGuesses,
          currentGuess: '',
          gameState: newGameState,
          usedLetters: newUsedLetters,
        })

        if (newGameState !== 'playing') {
          get().updateStats(newGameState)
        }
      },

      newGame: () => {
        set((state) => ({
          solution: getRandomWord(state.settings.difficulty),
          guesses: [],
          currentGuess: '',
          gameState: 'playing',
          usedLetters: {},
        }))
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }))
      },

      updateStats: (gameState) => {
        set((state) => {
          const newStats = { ...state.stats }
          newStats.gamesPlayed++
          if (gameState === 'won') {
            newStats.gamesWon++
            newStats.currentStreak++
            newStats.maxStreak = Math.max(newStats.currentStreak, newStats.maxStreak)
            newStats.guessDistribution[state.guesses.length]++
          } else if (gameState === 'lost') {
            newStats.currentStreak = 0
          }
          return { stats: newStats }
        })
      },
    }),
    {
      name: 'wordle-game-storage',
    }
  )
)

function isValidHardModeGuess(guess: string, previousGuesses: string[], solution: string): boolean {
  if (previousGuesses.length === 0) return true

  const lastGuess = previousGuesses[previousGuesses.length - 1]
  for (let i = 0; i < 5; i++) {
    if (lastGuess[i] === solution[i] && guess[i] !== solution[i]) {
      return false
    }
  }

  const requiredLetters = new Set(
    lastGuess.split('').filter((letter, index) => solution.includes(letter) && letter !== solution[index])
  )

  for (const letter of requiredLetters) {
    if (!guess.includes(letter)) {
      return false
    }
  }

  return true
}