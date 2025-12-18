import React from 'react';

const TodayWeather = ({ current }) => {
  return (
    <div className="weather-card details-card">
      <h3>Current Details</h3>
      <div className="details-grid">
        <div className="detail-item"><span>Wind</span><strong>{current.wind_speed_10m} km/h</strong></div>
        <div className="detail-item"><span>Humidity</span><strong>{current.relative_humidity_2m}%</strong></div>
        <div className="detail-item"><span>Cloud Cover</span><strong>{current.cloud_cover}%</strong></div>
        <div className="detail-item"><span>Rain</span><strong>{current.rain} mm</strong></div>
        <div className="detail-item"><span>AQI</span><strong>{current.aqi}</strong></div>
      </div>
    </div>
  );
};
export default TodayWeather;