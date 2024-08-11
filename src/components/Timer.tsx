// components/Timer.tsx
import { useState, useEffect } from 'react'
import { useGameStore } from '@/lib/store'

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const { gameState } = useGameStore()

  useEffect(() => {
    if (gameState !== 'playing') return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          // Handle time's up scenario
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-xl font-bold">
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  )
}