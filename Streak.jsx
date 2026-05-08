import { useState, useEffect } from 'react';

function Streak({ focusScore }) {
  const [currentStreak, setCurrentStreak] = useState(() => parseInt(localStorage.getItem('currentStreak')) || 0);
  const [lastFocusDate, setLastFocusDate] = useState(() => localStorage.getItem('lastFocusDate') || '');
  const [lastCheckedScore, setLastCheckedScore] = useState(focusScore);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Only update streak if focus score has changed significantly
    if (Math.abs(focusScore - lastCheckedScore) > 5) {
      if (focusScore > 60) {
        if (lastFocusDate === yesterday || lastFocusDate === '') {
          // Continue or start streak
          const newStreak = currentStreak + 1;
          setCurrentStreak(newStreak); // eslint-disable-line react-hooks/set-state-in-effect
          localStorage.setItem('currentStreak', newStreak);
        } else if (lastFocusDate !== today) {
          // Reset streak if not consecutive
          setCurrentStreak(1); // eslint-disable-line react-hooks/set-state-in-effect
          localStorage.setItem('currentStreak', 1);
        }
        setLastFocusDate(today);
        localStorage.setItem('lastFocusDate', today);
      } else if (focusScore < 40 && lastFocusDate === today) {
        // Reset streak if focus is very low today
        setCurrentStreak(0);
        localStorage.setItem('currentStreak', 0);
      }
      setLastCheckedScore(focusScore);
    }
  }, [focusScore, currentStreak, lastFocusDate, lastCheckedScore]);

  return (
    <div className="streak-section">
      <h3>Focus Streak</h3>
      <div className="streak-display">
        <span className="streak-number">{currentStreak}</span>
        <span className="streak-label">days</span>
      </div>
      <p>Keep your focus score above 60 to maintain the streak!</p>
    </div>
  );
}

export default Streak;