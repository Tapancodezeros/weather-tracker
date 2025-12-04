import React from 'react';
import { ArrowLeft, Calendar, Droplets } from 'lucide-react';

const TenDayForecast = ({ weatherData, loading, onBack }) => {

    if (loading || !weatherData) {
        return <div className="loading-page">Loading forecast data...</div>;
    }

    // The API is configured to return 7 past days + current day + 10 forecast days.
    // Slicing from index 8 gives us the *future* days.
    const forecastData = weatherData.daily.time.slice(8, 18).map((date, index) => ({
        date: date,
        max: weatherData.daily.temperature_2m_max[index + 8],
        min: weatherData.daily.temperature_2m_min[index + 8],
        rain: weatherData.daily.precipitation_sum[index + 8],
    }));

    return (
        <div className="sub-page-container animate-fade-in">
             <button className="back-btn" onClick={onBack}>
                <ArrowLeft size={20} /> Back to Overview
            </button>
            <h2>Next 10-Day Forecast</h2>
            <div className="forecast-grid-container">
                {forecastData.map((day, index) => (
                    <div key={index} className="forecast-card">
                        <div className="day-header">
                            <Calendar size={16} />
                            <span>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="forecast-body">
                            <div className="forecast-temp">
                                <span className="f-max">{Math.round(day.max)}°</span>
                                <span className="f-min">{Math.round(day.min)}°</span>
                            </div>
                            <div className="forecast-rain">
                                <Droplets size={14} /> {day.rain}mm
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TenDayForecast;