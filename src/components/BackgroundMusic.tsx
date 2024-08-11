/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useGameStore } from '@/lib/store'

const SONGS = [
  '/song1.mp3',
  '/song2.mp3',
  '/song3.mp3',
]

const MUSIC_VOLUME = 0.7  

export function BackgroundMusic() {
  const { settings } = useGameStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentSong, setCurrentSong] = useState('')

  useEffect(() => {
    if (settings.musicOn) {
      if (!currentSong) {
        const randomSong = SONGS[Math.floor(Math.random() * SONGS.length)]
        setCurrentSong(randomSong)
      }
      if (audioRef.current) {
        audioRef.current.volume = MUSIC_VOLUME
        audioRef.current.play()
      }
    } else {
      audioRef.current?.pause()
    }
  }, [settings.musicOn, currentSong])

  useEffect(() => {
    const handleEnded = () => {
      const newSong = SONGS[Math.floor(Math.random() * SONGS.length)]
      setCurrentSong(newSong)
    }

    audioRef.current?.addEventListener('ended', handleEnded)
    
    return () => audioRef.current?.removeEventListener('ended', handleEnded)
  }, [])

  return (
    <audio
      ref={audioRef}
      src={currentSong}
      loop={false}
    />
  )
}