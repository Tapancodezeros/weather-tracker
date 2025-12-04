import React from 'react';
import { ArrowLeft } from 'lucide-react';

const TodayWeather = ({ weatherData, loading, onBack }) => {
    if (loading || !weatherData || !weatherData.hourly) {
        return <div className="loading-page">Loading hourly data...</div>;
    }

    // 1. Prepare Data
    const currentHourISO = weatherData.current.time.slice(0, 13) + ":00"; 
    const startIndex = weatherData.hourly.time.findIndex(t => t.startsWith(currentHourISO));
    const start = startIndex !== -1 ? startIndex : 0;
    const end = start + 24; 

    const hours = weatherData.hourly.time.slice(start, end).map(t => t.slice(11, 16)); 
    const temps = weatherData.hourly.temperature_2m.slice(start, end);
    const winds = weatherData.hourly.wind_speed_10m.slice(start, end);

    // 2. Helper to Calculate SVG Coordinates
    const width = 800;
    const height = 200;
    const padding = 40;

    const minTemp = Math.min(...temps) - 2;
    const maxTemp = Math.max(...temps) + 2;
    const rangeTemp = maxTemp - minTemp || 1; 

    const getX = (index) => padding + (index / (temps.length - 1)) * (width - 2 * padding);
    const getY = (temp) => height - padding - ((temp - minTemp) / rangeTemp) * (height - 2 * padding);

    const linePath = temps.map((t, i) => 
        `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(t)}`
    ).join(' ');

    // Wind Graph Helpers
    const maxWind = Math.max(...winds) + 5;
    const getBarHeight = (speed) => (speed / maxWind) * (height - 2 * padding);

    return (
        <div className="sub-page-container animate-fade-in">
            <button className="back-btn" onClick={onBack}>
                <ArrowLeft size={20} /> Back to Overview
            </button>
            <h2>Today's Hourly Weather</h2>
            
            <div className="graph-card">
                <h3 className="graph-title-temp">Temperature (°C)</h3>
                <div className="svg-container">
                    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#eee" strokeWidth="2" />
                        <path d={linePath} fill="none" stroke="#e67e22" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        {temps.map((temp, i) => (
                            <g key={i}>
                                <circle cx={getX(i)} cy={getY(temp)} r="4" fill="#fff" stroke="#e67e22" strokeWidth="2" />
                                {i % 3 === 0 && (
                                    <>
                                    <text x={getX(i)} y={getY(temp) - 15} textAnchor="middle" fill="#333" fontSize="12" fontWeight="bold">{Math.round(temp)}°</text>
                                    <text x={getX(i)} y={height - 10} textAnchor="middle" fill="#7f8c8d" fontSize="12">{hours[i]}</text>
                                    </>
                                )}
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            <div className="graph-card">
                <h3 className="graph-title-wind">Wind Speed (km/h)</h3>
                <div className="svg-container">
                    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#eee" strokeWidth="2" />
                        <defs>
                            <linearGradient id="windGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#3498db" />
                                <stop offset="100%" stopColor="#a6c1ee" />
                            </linearGradient>
                        </defs>
                        {winds.map((speed, i) => (
                            <g key={i}>
                                <rect 
                                    x={getX(i) - 5} 
                                    y={height - padding - getBarHeight(speed)} 
                                    width="10" 
                                    height={getBarHeight(speed)} 
                                    fill="url(#windGradient)" 
                                    rx="2"
                                />
                                {i % 3 === 0 && (
                                    <>
                                    <text x={getX(i)} y={height - padding - getBarHeight(speed) - 10} textAnchor="middle" fill="#333" fontSize="12" fontWeight="bold">{Math.round(speed)}</text>
                                    <text x={getX(i)} y={height - 10} textAnchor="middle" fill="#7f8c8d" fontSize="12">{hours[i]}</text>
                                    </>
                                )}
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default TodayWeather;