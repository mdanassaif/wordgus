
// lib/words.ts
const EASY_WORDS = ['REACT', 'NEXTJ', 'GAMES', 'CODES', 'WORDS', 'PLAYS',]
const MEDIUM_WORDS = ['TYPES', 'WORLD', 'HELLO', 'CYBER', 'PIXEL', 'QUEST',
    'BRAIN', 'CLOCK', 'FLAME', 'GHOST', 'JUICE', 'KNIFE', 'LIGHT', 'MAGIC', 'NIGHT', 'POWER', 'QUICK', 'RADIO', 'SNAKE', 'TIGER', 'ULTRA', 'VIRUS', 'WITCH', 'YOUTH', 'ZEBRA']
const HARD_WORDS = ['LEMON', 'MUSIC', 'OCEAN', 'PIANO', 'ROBOT', 'SOLAR',
    'TIGER', 'ULTRA', 'VIRUS', 'WITCH', 'YOUTH', 'ZEBRA']

    export function getRandomWord(difficulty: 'easy' | 'medium' | 'hard'): string {
    const wordList = difficulty === 'easy' ? EASY_WORDS :
        difficulty === 'medium' ? MEDIUM_WORDS :
            HARD_WORDS
    return wordList[Math.floor(Math.random() * wordList.length)]
}