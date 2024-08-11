// components/Timer.tsx
import React, { useEffect, useState } from 'react';

interface TimerProps {
  isGameOver: boolean;
  timerKey: number;
  onTimeOut: () => void;
}

const Timer: React.FC<TimerProps> = ({ isGameOver, timerKey, onTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState(150);

  useEffect(() => {
    if (isGameOver) return;

    if (timeLeft === 0) {
      onTimeOut();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isGameOver, onTimeOut]);

  useEffect(() => {
    setTimeLeft(150); // Reset timer to 150 seconds when game restarts
  }, [timerKey]);

  const getTimerColor = () => {
    if (timeLeft > 100) return 'text-green-500';
    if (timeLeft > 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="text-lg sm:text-xl  font-semibold flex items-center justify-center space-x-2 mt-4">
      <span className="text-gray-600 dark:text-gray-300">Time left:</span>
      <span className={`${getTimerColor()} transition-colors duration-300`}>
        {timeLeft}s
      </span>
    </div>
  );
};

export default Timer;