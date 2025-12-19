import React from 'react';

const TodayWeather = ({ current, daily }) => {
  const formatTime = (iso) => iso ? iso.split('T')[1] : '--:--';
  const uv = daily?.uv_index_max?.[1] ?? '-';
  const sunrise = daily?.sunrise?.[1];
  const sunset = daily?.sunset?.[1];

  return (
    <div className="weather-card details-card">
      <h3>Today's Highlights</h3>
      <div className="details-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
        <div className="detail-item">
          <span>UV Index</span>
          <strong>{uv}</strong>
          <small className="detail-sub">{uv > 8 ? 'Very High' : uv > 5 ? 'High' : uv > 2 ? 'Moderate' : 'Low'}</small>
        </div>
        <div className="detail-item">
          <span>Sunrise & Sunset</span>
          <div className="sun-row">☀️ {formatTime(sunrise)}</div>
          <div className="sun-row">🌙 {formatTime(sunset)}</div>
        </div>
        <div className="detail-item">
          <span>Wind Status</span>
          <strong>{current.wind_speed_10m} <small>km/h</small></strong>
          <small className="detail-sub">{current.wind_direction_10m}° Direction</small>
        </div>
        <div className="detail-item">
          <span>Visibility</span>
          <strong>{(current.visibility / 1000).toFixed(1)} <small>km</small></strong>
        </div>
        <div className="detail-item">
          <span>Humidity</span>
          <strong>{current.relative_humidity_2m}%</strong>
          <small className="detail-sub">Dew Point: {current.apparent_temperature}°</small>
        </div>
        <div className="detail-item">
          <span>Pressure</span>
          <strong>{current.surface_pressure} <small>hPa</small></strong>
        </div>
        <div className="detail-item">
          <span>Air Quality</span>
          <strong>{current.aqi}</strong>
          <small className="detail-sub">US AQI</small>
        </div>
        <div className="detail-item">
          <span>Rain</span>
          <strong>{current.rain} <small>mm</small></strong>
        </div>
        <div className="detail-item">
          <span>Cloud Cover</span>
          <strong>{current.cloud_cover}%</strong>
        </div>
      </div>
    </div>
  );
};
export default TodayWeather;