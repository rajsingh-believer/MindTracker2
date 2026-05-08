import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

function Weekly() {
  const weeklyData = useMemo(() => {
    // Load last 7 days data from localStorage
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const dayData = JSON.parse(localStorage.getItem(`daily-${dateKey}`)) || {
        studyTime: 0,
        distractionTime: 0,
        focusScore: 0
      };
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        studyTime: Math.floor(dayData.studyTime / 60), // convert to minutes
        distractionTime: dayData.distractionTime,
        focusScore: dayData.focusScore
      });
    }
    return data;
  }, []);

  // Calculate weekly stats
  const totalStudyTime = weeklyData.reduce((sum, day) => sum + day.studyTime, 0);
  const avgFocusScore = weeklyData.length > 0 ? weeklyData.reduce((sum, day) => sum + day.focusScore, 0) / weeklyData.length : 0;
  const bestDay = weeklyData.reduce((best, day) => day.focusScore > best.focusScore ? day : best, { focusScore: 0 });

  return (
    <div className="weekly">
      <h1>Weekly Analytics</h1>

      <div className="weekly-stats">
        <div className="stat-card">
          <h3>Total Study Time</h3>
          <p>{totalStudyTime} minutes</p>
        </div>
        <div className="stat-card">
          <h3>Average Focus Score</h3>
          <p>{avgFocusScore.toFixed(1)}</p>
        </div>
        <div className="stat-card">
          <h3>Best Day</h3>
          <p>{bestDay.date || 'N/A'}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h2>Daily Study Time</h2>
          <BarChart width={500} height={300} data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="studyTime" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="chart">
          <h2>Focus Score Trend</h2>
          <LineChart width={500} height={300} data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="focusScore" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Weekly;