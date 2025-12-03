import React from 'react';

const TodayWeather = ({ weatherData, loading }) => {
    if (loading || !weatherData || !weatherData.hourly) {
        return <div className="loading-page">Loading hourly data...</div>;
    }

    // 1. Prepare Data: Get next 24 hours from current time
    // Open-Meteo returns 'hourly' arrays. We need to find the current index.
    const currentHourISO = weatherData.current.time.slice(0, 13) + ":00"; 
    // Find index of current hour
    const startIndex = weatherData.hourly.time.findIndex(t => t.startsWith(currentHourISO));
    // Safe fallback if not found, use 0
    const start = startIndex !== -1 ? startIndex : 0;
    const end = start + 24; // Show next 24 hours

    const hours = weatherData.hourly.time.slice(start, end).map(t => t.slice(11, 16)); // "14:00"
    const temps = weatherData.hourly.temperature_2m.slice(start, end);
    const winds = weatherData.hourly.wind_speed_10m.slice(start, end);

    // 2. Helper to Calculate SVG Coordinates
    const width = 800;
    const height = 200;
    const padding = 40;

    // --- TEMPERATURE GRAPH HELPERS ---
    const minTemp = Math.min(...temps) - 2;
    const maxTemp = Math.max(...temps) + 2;
    const rangeTemp = maxTemp - minTemp;

    const getX = (index) => padding + (index / (temps.length - 1)) * (width - 2 * padding);
    const getY = (temp) => height - padding - ((temp - minTemp) / rangeTemp) * (height - 2 * padding);

    // Create Path for Line Graph
    const linePath = temps.map((t, i) => 
        `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(t)}`
    ).join(' ');

    // --- WIND GRAPH HELPERS ---
    const maxWind = Math.max(...winds) + 5;
    const getBarHeight = (speed) => (speed / maxWind) * (height - 2 * padding);

    return (
        <div className="forecast-container">
            <h2>Today's Hourly Weather</h2>
            
            {/* TEMPERATURE GRAPH CARD */}
            <div className="graph-card" style={{marginBottom: '40px', background: 'rgba(255,255,255,0.9)', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#e67e22', marginBottom: '20px'}}>Hourly Temperature (°C)</h3>
                <div style={{overflowX: 'auto'}}>
                    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{minWidth: '600px'}}>
                        {/* Grid Lines */}
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#eee" strokeWidth="2" />
                        
                        {/* The Line */}
                        <path d={linePath} fill="none" stroke="#e67e22" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {/* Data Points & Labels */}
                        {temps.map((temp, i) => (
                            <g key={i}>
                                <circle cx={getX(i)} cy={getY(temp)} r="4" fill="#fff" stroke="#e67e22" strokeWidth="2" />
                                <text x={getX(i)} y={getY(temp) - 15} textAnchor="middle" fill="#333" fontSize="12" fontWeight="bold">{Math.round(temp)}°</text>
                                <text x={getX(i)} y={height - 10} textAnchor="middle" fill="#7f8c8d" fontSize="10">{hours[i]}</text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            {/* WIND SPEED GRAPH CARD */}
            <div className="graph-card" style={{background: 'rgba(255,255,255,0.9)', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#3498db', marginBottom: '20px'}}>Wind Speed (km/h)</h3>
                <div style={{overflowX: 'auto'}}>
                    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{minWidth: '600px'}}>
                        {/* Grid Base */}
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#eee" strokeWidth="2" />
                        
                        {/* Bars */}
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
                                <text x={getX(i)} y={height - padding - getBarHeight(speed) - 10} textAnchor="middle" fill="#333" fontSize="12" fontWeight="bold">{Math.round(speed)}</text>
                                <text x={getX(i)} y={height - 10} textAnchor="middle" fill="#7f8c8d" fontSize="10">{hours[i]}</text>
                            </g>
                        ))}
                        
                        {/* Gradient Definition for Bars */}
                        <defs>
                            <linearGradient id="windGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#3498db" />
                                <stop offset="100%" stopColor="#a6c1ee" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default TodayWeather;