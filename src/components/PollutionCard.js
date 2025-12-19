import React from 'react';

const PollutionCard = ({ data }) => {
    if (!data) return null;

    const getQualityColor = (value, type) => {
        // Basic thresholds (simplified)
        if (type === 'aqi') {
            if (value <= 50) return '#10b981'; // Good
            if (value <= 100) return '#fbbf24'; // Moderate
            if (value <= 150) return '#f97316'; // Unhealthy for Sensitive
            return '#ef4444'; // Unhealthy
        }
        return '#94a3b8';
    };

    const aqiColor = getQualityColor(data.us_aqi, 'aqi');

    return (
        <div className="weather-card pollution-card">
            <div className="pollution-header">
                <h3>Air Quality</h3>
                <span className="aqi-badge" style={{ background: aqiColor, color: '#fff' }}>
                    AQI {data.us_aqi}
                </span>
            </div>

            <div className="pollutants-grid">
                <div className="pollutant-item">
                    <span className="p-label">PM2.5</span>
                    <span className="p-value">{data.pm2_5}</span>
                    <span className="p-unit">µg/m³</span>
                </div>
                <div className="pollutant-item">
                    <span className="p-label">PM10</span>
                    <span className="p-value">{data.pm10}</span>
                    <span className="p-unit">µg/m³</span>
                </div>
                <div className="pollutant-item">
                    <span className="p-label">NO₂</span>
                    <span className="p-value">{data.nitrogen_dioxide}</span>
                    <span className="p-unit">µg/m³</span>
                </div>
                <div className="pollutant-item">
                    <span className="p-label">O₃</span>
                    <span className="p-value">{data.ozone}</span>
                    <span className="p-unit">µg/m³</span>
                </div>
                <div className="pollutant-item">
                    <span className="p-label">SO₂</span>
                    <span className="p-value">{data.so2}</span>
                    <span className="p-unit">µg/m³</span>
                </div>
                <div className="pollutant-item">
                    <span className="p-label">CO</span>
                    <span className="p-value">{data.carbon_monoxide}</span>
                    <span className="p-unit">µg/m³</span>
                </div>
            </div>
        </div>
    );
};

export default PollutionCard;
