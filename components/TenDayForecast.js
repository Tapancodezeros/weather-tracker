import React from 'react';
import Link from 'next/link';
import { useWeather } from '../pages/_app';

const TenDayForecast = () => {
  const { weatherData, loading } = useWeather();
  const units = weatherData ? weatherData.daily_units : null;

    if (loading || !weatherData) {
        return <div className="loading-page">Loading forecast data...</div>;
    }

    // Display Logic for 10-Day Forecast
    // The API response is ordered: 7 history days, 1 current day, then 10 forecast days.
    // We slice from index 8 up to (but not including) index 18 to get the 10 future days.
    const forecastData = weatherData.daily.time.slice(8, 18).map((date, index) => ({
        // Note: The index here is relative to the sliced array (0-9), but we need the index 
        // in the original full array (8-17). We use original index by adding 8.
        date: date,
        max: weatherData.daily.temperature_2m_max[index + 8],
        min: weatherData.daily.temperature_2m_min[index + 8],
        rain: weatherData.daily.precipitation_sum[index + 8],
    }));

    return (
        <div className="forecast-container">
            <Link href="/" className="back-button">← Back to Current Weather</Link>
            <h2>Next 10-Day Estimated Forecast</h2>
            <div className="forecast-grid">
                {forecastData.map((day, index) => (
                    <div key={index} className="forecast-card">
                        <div className="day-name">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                        <div className="forecast-details">
                            <p className="max-temp">
                                Max: {day.max}{units ? units.temperature_2m_max : '°C'}
                            </p>
                            <p className="min-temp">
                                Min: {day.min}{units ? units.temperature_2m_min : '°C'}
                            </p>
                            <p className="rain-sum">
                                Rain: {day.rain}{units ? units.precipitation_sum : 'mm'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TenDayForecast;