import { useState, useEffect } from 'react';

function Goal({ studyTime }) {
  const [goal, setGoal] = useState(() => parseInt(localStorage.getItem('dailyGoal')) || 60); // default 60 minutes
  const [tempGoal, setTempGoal] = useState(goal);

  useEffect(() => {
    localStorage.setItem('dailyGoal', goal);
  }, [goal]);

  const progress = Math.min((studyTime / 60 / goal) * 100, 100); // studyTime in seconds, convert to minutes

  const saveGoal = () => {
    setGoal(tempGoal);
  };

  return (
    <div className="goal-section">
      <h3>Daily Goal</h3>
      <div className="goal-input">
        <label>Set your daily focus goal (minutes): </label>
        <input
          type="number"
          value={tempGoal}
          onChange={(e) => setTempGoal(parseInt(e.target.value) || 0)}
          min="1"
          max="480" // 8 hours
        />
        <button onClick={saveGoal}>Save Goal</button>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">
          {Math.floor(studyTime / 60)} / {goal} minutes ({progress.toFixed(1)}%)
        </span>
      </div>
    </div>
  );
}

export default Goal;