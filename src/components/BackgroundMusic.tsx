import React, { useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/lib/store'

const SONGS = [
  '/song1.mp3',
  '/song2.mp3',
  '/song3.mp3',
]

const MUSIC_VOLUME = 0.8

export function BackgroundMusic() {
  const { settings } = useGameStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentSong, setCurrentSong] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = MUSIC_VOLUME
      audioRef.current.play().catch(err => {
        console.error("Error playing audio:", err)
        setError("Failed to play audio")
      })
    }
  }

  useEffect(() => {
    const randomSong = SONGS[Math.floor(Math.random() * SONGS.length)]
    setCurrentSong(randomSong)
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (settings.musicOn && isReady) {
      playAudio()
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [settings.musicOn, isReady, currentSong])

  useEffect(() => {
    const handleEnded = () => {
      const newSong = SONGS[Math.floor(Math.random() * SONGS.length)]
      setCurrentSong(newSong)
    }

    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e)
      setError("Error loading audio")
      handleEnded() // Try the next song
    }

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded)
      audioRef.current.addEventListener('error', handleError)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current.removeEventListener('error', handleError)
      }
    }
  }, [])

  if (error) {
    console.log(error)
    return null // Or return some fallback UI
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong}
        loop={false}
      />
      {!isReady && settings.musicOn && (
        <button onClick={playAudio}>Start Music</button>
      )}
    </>
  )
}