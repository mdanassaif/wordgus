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

  return (
    <div className="text-xl mb-4">
      Time left: {timeLeft}s
    </div>
  );
};

export default Timer;