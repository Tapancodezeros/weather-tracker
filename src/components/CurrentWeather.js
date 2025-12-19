import React from 'react';

const CurrentWeatherAndHistory = ({ data, unit }) => {
  if (!data) return null;
  const rawTemp = data.current.temperature_2m;
  const rawFeelsLike = data.current.apparent_temperature;

  const displayTemp = unit === 'F' ? ((rawTemp * 9 / 5) + 32).toFixed(1) : rawTemp.toFixed(1);
  const feelsLike = unit === 'F' ? ((rawFeelsLike * 9 / 5) + 32).toFixed(1) : rawFeelsLike.toFixed(1);

  const todayMax = data.daily.temperature_2m_max[1];
  const yesterdayMax = data.daily.temperature_2m_max[0];
  const diff = (todayMax - yesterdayMax).toFixed(1);
  const diffText = diff > 0 ? "Warmer" : "Cooler";

  return (
    <div className="weather-card hero-card">
      <div className="temp-display">
        <h1>{displayTemp}°{unit}</h1>
        <p>Feels like {feelsLike}°{unit}</p>
      </div>
      <div className="history-badge">
        <span>vs Yesterday</span>
        <strong>{Math.abs(diff)}°C {diffText} than yesterday</strong>
      </div>
    </div>
  );
};
export default CurrentWeatherAndHistory;