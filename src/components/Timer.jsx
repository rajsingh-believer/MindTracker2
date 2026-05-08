import { useState, useEffect } from 'react';

function Timer({ onTick, onReset, onTimerStateChange }) {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState(25); // in minutes

  useEffect(() => {
    onTimerStateChange(isRunning);
  }, [isRunning, onTimerStateChange]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          onTick(1); // add 1 second to study time
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false); // eslint-disable-line react-hooks/set-state-in-effect
      alert('Pomodoro session complete!');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTick]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(customTime * 60);
    onReset(); // Call the reset function from parent
  };

  const setCustomDuration = (minutes) => {
    setCustomTime(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };

  return (
    <div className={`timer ${isRunning ? 'running' : 'paused'}`}>
      <h2>Pomodoro Timer</h2>
      
      <div className="timer-settings">
        <label>Set Study Time: </label>
        <select 
          value={customTime} 
          onChange={(e) => setCustomDuration(parseInt(e.target.value))}
          className="time-selector"
        >
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={15}>15 minutes</option>
          <option value={20}>20 minutes</option>
          <option value={25}>25 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
          <option value={120}>2 hours</option>
          <option value={150}>2.5 hours</option>
          <option value={180}>3 hours</option>
          <option value={210}>3.5 hours</option>
          <option value={240}>4 hours</option>
          <option value={270}>4.5 hours</option>
          <option value={300}>5 hours</option>
        </select>
      </div>

      <p className={`timer-display ${isRunning ? 'active' : 'inactive'}`}>{formatTime(timeLeft)}</p>
      <div className="status-indicator">
        {isRunning ? <span className="status running">▶️ RUNNING</span> : <span className="status paused">⏸ PAUSED</span>}
      </div>
      
      <div className="timer-buttons">
        <button onClick={start} disabled={isRunning} className="btn start-btn">Start</button>
        <button onClick={pause} disabled={!isRunning} className="btn pause-btn">Pause</button>
        <button onClick={reset} className="btn reset-btn">Reset All</button>
      </div>
    </div>
  );
}

export default Timer;