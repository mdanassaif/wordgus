import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type GameState = 'won' | 'lost' | 'playing';

interface GameOverModalProps {
  gameState: GameState;
  solution: string;
  guesses: string[];
  onNewGame: () => void;
}

export function GameOverModal({ gameState, solution, guesses, onNewGame }: GameOverModalProps) {
  const isGameOver = gameState === 'won' || gameState === 'lost';

  if (!isGameOver) return null;

  return (
    <Dialog open={isGameOver}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white dark:text-white">
            {gameState === 'won' ? 'Congratulations!' : 'Game Over'}
          </DialogTitle>
          <DialogDescription className="text-lg text-white dark:text-white">
            {gameState === 'won'
              ? `You guessed the word in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!`
              : `The word was ${solution}. Better luck next time!`}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-center ">
          <DialogClose asChild className='bg-red-500'>
            <Button  onClick={onNewGame}>New Game</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}