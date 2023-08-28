import React, {useState,useEffect,useRef} from 'react'
import './App.css'
const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [intervalID, setIntervalID] = useState(null);

  const beepRef = useRef(null);

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const handleStartStop = () => {
    if (timerRunning == true) {
      clearInterval(intervalID);
      setTimerRunning(false);
    } else {
      const newIntervalID = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
      setIntervalID(newIntervalID);
      setTimerRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(intervalID);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setTimerRunning(false);
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      beepRef.current.play();
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel('Session');
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [breakLength, sessionLength, timeLeft, timerLabel]);

  const formatTime = timeLeft => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-f7f7f7 min-h-screen flex flex-col items-center justify-center">
    <div className="bg-white w-90 max-w-700 m-10 p-10 shadow-2xl shadow-slate-900 border-2 border-blue-600 hover:rotate-0 rotate-6" id="container">
      <h1 className="text-center text-3xl mb-8 text-gray-800">25+5 Clock</h1>
      <div className="flex justify-between mb-8" id="settings">
        <div className="text-center" id="break-label">
          <span className="text-2xl font-bold text-gray-500">Break Length</span>
          <div className="text-3xl font-bold text-gray-700" id="break-length">{breakLength}</div>
          <button
            className="text-5xl text-black cursor-pointer transition duration-200 hover:text-gray-700 "
            id="break-decrement"
            onClick={handleBreakDecrement}
          >
            -
          </button>
          <button
            className="text-5xl text-black cursor-pointer transition duration-200 hover:text-gray-700"
            id="break-increment"
            onClick={handleBreakIncrement}
          >
            +
          </button>
        </div>
        <div className="text-center" id="session-label">
          <span className="text-2xl font-bold text-gray-500">Session Length</span>
          <div className="text-3xl font-bold text-gray-700" id="session-length">{sessionLength}</div>
          <button
            className="text-5xl text-black cursor-pointer transition duration-200 hover:text-gray-700"
            id="session-decrement"
            onClick={handleSessionDecrement}
          >
            -
          </button>
          <button
            className="text-5xl text-black cursor-pointer transition duration-200 hover:text-gray-700"
            id="session-increment"
            onClick={handleSessionIncrement}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-center mb-8" id="timer">
        <div className="text-2xl font-bold text-gray-700" id="timer-label">{timerLabel}</div>
        <div className="text-4xl font-bold text-gray-700 mb-4" id="time-left">{formatTime(timeLeft)}</div>
        <button
        // when we click on start, it becomes red
          className={`inline-block border text-2xl text-white rounded-xl cursor-pointer transition duration-200 px-6 py-3 mx-2 hover:text-gray-200
          ${timerRunning ? `bg-red-600` : `bg-blue-600`}`}
          id="start_stop"
          onClick={handleStartStop}
        >
          {timerRunning ? 'Stop' : 'Start'}
        </button>
        <button
          className="inline-block border text-2xl bg-blue-600 text-white rounded-xl cursor-pointer transition duration-200 px-6 py-3 mx-2 hover:text-gray-200"
          id="reset"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <audio className="hidden" id="beep" src="beep.mp3" ref={beepRef}></audio>
    </div>
  </div>
  

    
  )
}

export default App