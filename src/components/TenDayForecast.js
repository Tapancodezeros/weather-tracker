import React from 'react';

const TenDayForecast = ({ daily, unit }) => {
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
  const convert = (temp) => unit === 'F' ? Math.round((temp * 9 / 5) + 32) : Math.round(temp);

  return (
    <div className="weather-card forecast-card">
      <h3>7-Day Forecast ({unit})</h3>
      <div className="forecast-list">
        {daily.time.map((date, index) => {
          if (index < 2) return null; // Skip past/today
          return (
            <div key={date} className="forecast-row">
              <span className="date">{formatDate(date)}</span>
              <div className="forecast-rain">
                {daily.precipitation_probability_max[index] > 0 && (
                  <>
                    <span className="rain-icon">💧</span>
                    <span className="rain-prob">{daily.precipitation_probability_max[index]}%</span>
                  </>
                )}
              </div>
              <div className="temp-range">
                <span className="high">{convert(daily.temperature_2m_max[index])}°</span>
                <span className="low">{convert(daily.temperature_2m_min[index])}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TenDayForecast;