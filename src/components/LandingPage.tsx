// components/LandingPage.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaInfoCircle, FaGithub } from 'react-icons/fa'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import Image from 'next/image'
import Link from 'next/link'

interface LandingPageProps {
  onStartGame: () => void
}

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGame }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const title = "WordGus"

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white font-sans overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
     <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
  <div className="text-2xl font-bold">
  <Link href="https://www.sololearn.com/en/profile/21397794" target="_blank" rel="noopener noreferrer">
    <Image
      src="/profile.png"
      alt="Logo"
      width={40}
      height={40}
      className='rounded-full'
    />
        </Link>
  </div>
  <div className="flex space-x-4">
    <Link href="https://github.com/Nextjswebdev" target="_blank" rel="noopener noreferrer">
      <FaGithub className="text-xl hover:text-pink-500 cursor-pointer transition-colors w-[2rem] h-[2rem]" />
    </Link>
  </div>
</nav>

<main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative">
        <div className="text-center z-10">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold mb-4 sm:mb-8"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {title.split('').map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.5)',
                  color: `hsl(${index * 360 / title.length}, 70%, 70%)`
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
           Solve the word puzzle before time runs out.
          </motion.p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartGame}
         className="p-4 sm:p-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-3xl sm:text-4xl font-bold rounded-full shadow-lg relative overflow-hidden z-10 group"
          aria-label="Play"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <FaPlay />
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.div 
          className="mt-16 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center"
              >
                <FaInfoCircle className="mr-2" /> About WordGus
              </motion.button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] md:max-w-[500px] bg-gray-900 text-white border-purple-500 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">About WordGus</DialogTitle>
              </DialogHeader>
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-4">
    <Image 
      src="/Designer.png" 
      alt="WordGus Game Preview" 
      width={500}
      height={281}
      className="w-full h-auto rounded-lg shadow-md"
    />
    <p className="text-sm sm:text-base text-gray-300">WordGus is an exhilarating word-decoding challenge that puts your vocabulary and quick thinking to the test. With 6 attempts and a 150-second countdown, can you unveil the hidden word?</p>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">How to Play:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Green: Letter is perfectly placed</li>
                    <li>Yellow: Letter is present but misplaced</li>
                    <li>Gray: Letter is absent from the word</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">Key Features:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Intelligent hint system for those tough moments</li>
                    <li>Immersive background music to enhance focus</li>
                    <li>Compete on global leaderboards</li>
                    <li>Customizable light/dark modes</li>
                  </ul>
                </div>
                <p className="text-gray-300 italic">Immerse yourself in WordGus - where words come alive and every second counts.</p>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </main>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}