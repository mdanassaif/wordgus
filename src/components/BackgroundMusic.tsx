// components/BackgroundMusic.tsx
import { useEffect, useRef } from 'react'
import { useGameStore } from '@/lib/store'

export function BackgroundMusic() {
  const { settings } = useGameStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (settings.musicOn) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [settings.musicOn])

  return (
    <audio
      ref={audioRef}
      src="/videobg.mp3"
      loop
    />
  )
}