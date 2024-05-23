import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{backgroundImage: 'url("/bgg.jpg")', backgroundSize: 'cover'}}>
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-6">Countdown Timer</h1>
        <div className="text-5xl font-mono mb-6">{formatTime(timeLeft)}</div>
        <div className="flex space-x-3">
          {!isActive ? (
            <button onClick={startTimer} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Start</button>
          ) : (
            <>
              {isPaused ? (
                <button onClick={resumeTimer} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Resume</button>
              ) : (
                <button onClick={pauseTimer} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">Pause</button>
              )}
              <button onClick={resetTimer} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Reset</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
