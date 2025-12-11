import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const HourlyChart = ({ hourlyData, unit }) => {
  if (!hourlyData) return null;

  const chartData = hourlyData.time.slice(0, 24).map((time, index) => {
    const date = new Date(time);
    const displayTime = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    let temp = hourlyData.temperature_2m[index];
    if (unit === 'F') temp = (temp * 9/5) + 32;
    return { time: displayTime, temp: Math.round(temp) };
  });

  return (
    <div className="weather-card chart-card">
      <h3>24-Hour Temperature Trend</h3>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} interval={3} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} unit="°" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} itemStyle={{ color: '#38bdf8' }} />
            <Area type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default HourlyChart;