import React from 'react'
// import '../App.css'
const Clock = () => {

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
      if (timerRunning) {
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
    <div className="bg-f7f7f7 min-h-screen flex flex-col justify-center items-center">
    <div className="bg-white w-90 max-w-700 m-10 p-10 shadow-lg">
      <h1 className="text-center text-3xl mb-8 text-gray-800">25+5 Clock</h1>
      <div className="flex justify-between mb-8">
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-500">Break Length</span>
          <div className="text-3xl font-bold text-gray-700">{breakLength}</div>
          <button
            className="text-2xl text-gray-500 cursor-pointer transition duration-200 hover:text-gray-700"
            onClick={handleBreakDecrement}
          >
            -
          </button>
          <button
            className="text-2xl text-gray-500 cursor-pointer transition duration-200 hover:text-gray-700"
            onClick={handleBreakIncrement}
          >
            +
          </button>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-500">Session Length</span>
          <div className="text-3xl font-bold text-gray-700">{sessionLength}</div>
          <button
            className="text-2xl text-gray-500 cursor-pointer transition duration-200 hover:text-gray-700"
            onClick={handleSessionDecrement}
          >
            -
          </button>
          <button
            className="text-2xl text-gray-500 cursor-pointer transition duration-200 hover:text-gray-700"
            onClick={handleSessionIncrement}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-center mb-8">
        <div className="text-2xl font-bold text-gray-700">{timerLabel}</div>
        <div className="text-4xl font-bold text-gray-700 mb-4">{formatTime(timeLeft)}</div>
        <button
          className="inline-block bg-white border text-2xl text-gray-500 cursor-pointer transition duration-200 px-6 py-3 mx-2 hover:text-gray-700"
          onClick={handleStartStop}
        >
          {timerRunning ? 'Stop' : 'Start'}
        </button>
        <button
          className="inline-block bg-white border text-2xl text-gray-500 cursor-pointer transition duration-200 px-6 py-3 mx-2 hover:text-gray-700"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <audio id="beep" src="beep.mp3" ref={beepRef}></audio>
    </div>
  </div>

  )
}

export default Clock