// components/HelpModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to Play</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Guess the Wordle in 6 tries.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Each guess must be a valid 5-letter word.</li>
            <li>The color of the tiles will change to show how close your guess was to the word.</li>
          </ul>
          <div>
            <p className="font-bold">Examples</p>
            <div className="flex space-x-1 mt-2">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold">W</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">E</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">A</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">R</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">Y</div>
            </div>
            <p className="mt-2">W is in the word and in the correct spot.</p>
          </div>
          <div>
            <div className="flex space-x-1 mt-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">P</div>
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-white font-bold">I</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">L</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">L</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">S</div>
            </div>
            <p className="mt-2">I is in the word but in the wrong spot.</p>
          </div>
          <div>
            <div className="flex space-x-1 mt-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">V</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">A</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">G</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white font-bold">U</div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black font-bold">E</div>
            </div>
            <p className="mt-2">U is not in the word in any spot.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}