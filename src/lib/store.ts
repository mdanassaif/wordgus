// lib/store.ts
import { create } from 'zustand'
import { createClient } from '@supabase/supabase-js'
import { getRandomWord } from './words'
import axios from 'axios';


const supabase = createClient('https://vyubgyowpwgtgeugaxpo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dWJneW93cHdndGdldWdheHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4NjczOTAsImV4cCI6MjAzNjQ0MzM5MH0.e7cpX-k69e2sQSOVA4yaYjA74L9mApEA9Q-A_f3xM-Q')

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
  submitGuess: (showToast: (message: string) => void) => void
  newGame: () => void
  updateSettings: (newSettings: Partial<Settings>) => void
  updateStats: (gameState: 'won' | 'lost') => void
  fetchStats: () => Promise<void>
  
}

export const useGameStore = create<GameState>((set, get) => ({
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

  submitGuess: (showToast: (message: string) => void) => {
    const { currentGuess, guesses, solution, settings } = get()
    if (currentGuess.length !== 5) return
  
    // Check if the word is valid
    if (!isValidWord(currentGuess)) {
      showToast("Not a valid word")
      return
    }
  
    if (settings.hardMode && !isValidHardModeGuess(currentGuess, guesses, solution)) {
      showToast("Must use revealed hints in Hard Mode")
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
  } else if (newGuesses.length >= 6) {
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

  updateStats: async (gameState: 'won' | 'lost') => {
    const { stats } = get()
    const { data, error } = await supabase
      .from('user_stats')
      .upsert({
        user_id: 'current_user_id',
        games_played: stats.gamesPlayed + 1,
        games_won: gameState === 'won' ? stats.gamesWon + 1 : stats.gamesWon,
      }, {
        onConflict: 'user_id'
      })
      .select()
  
    if (error) {
      console.error('Error updating stats:', error)
    } else if (data) {
      const newStats: Stats = {
        gamesPlayed: data[0].games_played,
        gamesWon: data[0].games_won,
      }
      set({ stats: newStats })
    }
  },
  
  fetchStats: async () => {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', 'current_user_id')
      .single()
  
    if (error) {
      console.error('Error fetching stats:', error)
    } else if (data) {
      const fetchedStats: Stats = {
        gamesPlayed: data.games_played,
        gamesWon: data.games_won,
      }
      set({ stats: fetchedStats })
    }
  },
}))

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

async function isValidWord(word: string): Promise<boolean> {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If the API returns a 404, it means the word was not found
      if (error.response.status === 404) {
        return false;
      }
    }
    // For any other errors, log them and return false
    console.error('Error checking word validity:', error);
    return false;
  }
}