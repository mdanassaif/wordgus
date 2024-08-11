import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to Play</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Guess the word in 6 tries.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Each guess must be a real 5-letter word.</li>
            <li>The color of the boxes will show how close your guess was to the word.</li>
          </ul>
          <div className="space-y-2">
            <p className="font-bold">Examples</p>
            <div className="flex space-x-1">
              <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-white font-bold">W</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">E</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">A</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">R</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">Y</div>
            </div>
            <p>W is in the word and in the right spot.</p>
            <div className="flex space-x-1">
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">P</div>
              <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center text-white font-bold">I</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">L</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">L</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">S</div>
            </div>
            <p>I is in the word but in the wrong spot.</p>
            <div className="flex space-x-1">
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">V</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">A</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">G</div>
              <div className="w-10 h-10 bg-gray-500 flex items-center justify-center text-white font-bold">U</div>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">E</div>
            </div>
            <p>U is not in the word in any spot.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}