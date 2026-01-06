"use client";

import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number; // minutes
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <div className="bg-gray-200 p-2 rounded w-24 text-center font-bold text-lg">{formatTime(timeLeft)}</div>;
};

export default Timer;
