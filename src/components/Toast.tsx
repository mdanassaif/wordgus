// components/Toast.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string
}

export function Toast({ message }: ToastProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50"
      >
        {message}
      </motion.div>
    </AnimatePresence>
  )
}