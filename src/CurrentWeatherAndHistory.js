import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Geocoding API for search
const GEOCODING_API = `https://geocoding-api.open-meteo.com/v1/search`;

const CurrentWeatherAndHistory = ({ weatherData, airQualityData, setCoords, setLocationName, setErrorMsg, loading }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]); 
    const [showSuggestions, setShowSuggestions] = useState(false); 
    const wrapperRef = useRef(null);

    // --- (Search & Location Handlers) ---
    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.length >= 3) {
            try {
                const response = await fetch(`${GEOCODING_API}?name=${value}&count=5&language=en&format=json`);
                const data = await response.json();
                setSuggestions(data.results || []);
                setShowSuggestions(!!data.results);
            } catch (error) { console.error(error); }
        } else { setSuggestions([]); setShowSuggestions(false); }
    };

    const handleSelectSuggestion = (city) => {
        setLocationName(`${city.name}, ${city.country}`);
        setCoords({ lat: city.latitude, lon: city.longitude });
        setSearchQuery(""); setSuggestions([]); setShowSuggestions(false); setErrorMsg("");
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (suggestions.length > 0) { handleSelectSuggestion(suggestions[0]); } 
        else {
             try {
                const response = await fetch(`${GEOCODING_API}?name=${searchQuery}&count=1&language=en&format=json`);
                const data = await response.json();
                if (data.results && data.results.length > 0) handleSelectSuggestion(data.results[0]);
                else setErrorMsg("City not found.");
             } catch (err) { setErrorMsg("Error searching."); }
        }
    };

    const handleLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocationName("Your Current Location (GPS)");
                    setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
                    setErrorMsg("");
                },
                (err) => setErrorMsg("Location access denied.")
            );
        } else { setErrorMsg("Geolocation not supported."); }
    };

    // --- Helper to get AQI Label & Class ---
    const getAqiInfo = (aqi) => {
        if (aqi <= 20) return { label: 'Good', class: 'aqi-good' };
        if (aqi <= 40) return { label: 'Fair', class: 'aqi-fair' };
        if (aqi <= 60) return { label: 'Moderate', class: 'aqi-fair' };
        if (aqi <= 80) return { label: 'Poor', class: 'aqi-poor' };
        return { label: 'Unhealthy', class: 'aqi-unhealthy' };
    };

    const historyData = weatherData ? weatherData.daily.time.slice(0, 7).map((date, index) => ({
            date: date,
            max: weatherData.daily.temperature_2m_max[index],
            min: weatherData.daily.temperature_2m_min[index],
            rain: weatherData.daily.precipitation_sum[index],
          })) : [];
    
    const aqiInfo = airQualityData ? getAqiInfo(airQualityData.current.european_aqi) : { label: 'N/A', class: '' };

    // --- LOGIC FOR ICE BACKGROUND ---
    const currentTemp = weatherData ? weatherData.current.temperature_2m : 0;
    const isCold = currentTemp < 5; 

    return (
        <div ref={wrapperRef}>
            {/* --- Search Bar --- */}
            <div className="search-bar">
                <div className="search-input-container">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Type 3 letters..." value={searchQuery} onChange={handleInputChange} />
                        <button type="submit"> Search</button>
                    </form>
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((city) => (
                                <li key={city.id} onClick={() => handleSelectSuggestion(city)}>
                                    <span className="city-name">{city.name}</span>
                                    <span className="city-country">{city.country}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="location-btn" onClick={handleLiveLocation}>📍 Live Location</button>
            </div>
            
            {!loading && weatherData && (
                <div className="weather-content">
                    <h3 style={{marginTop: 0}}>Current Weather</h3>
                    
                    <section className="current-weather">
                        <div className={isCold ? "card ice-theme" : "card"}>
                            {/* Left Side: Icon & Temp */}
                            <div className="weather-main">
                                <div className="weather-main-top">
                                    <div className="weather-icon">
                                        {isCold ? '❄️' : '☀️'}
                                    </div>
                                    <div className="temp-container">
                                        <span className="big-temp">
                                            {weatherData.current.temperature_2m}<span className="unit">°C</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="real-feel">
                                    RealFeel® {weatherData.current.apparent_temperature}°
                                </div>
                                <h4 className="condition-text">{isCold ? 'Cold' : 'Sunny'}</h4> 
                                {/* Updated Link to New Page */}
                                <Link to="/today" className="more-details">
                                    VIEW HOURLY GRAPHS &gt;
                                </Link>
                            </div>

                            {/* Right Side: Details List */}
                            <div className="weather-details-list">
                                <div className="detail-item">
                                    <span className="detail-label">RealFeel Shade™</span>
                                    <span className="detail-value">{weatherData.current.apparent_temperature}°</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Wind</span>
                                    <span className="detail-value">
                                        N {weatherData.current.wind_speed_10m} {weatherData.current_units.wind_speed_10m}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Wind Gusts</span>
                                    <span className="detail-value">
                                        {weatherData.current.wind_gusts_10m} {weatherData.current_units.wind_gusts_10m}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Air Quality</span>
                                    <span className={`detail-value ${aqiInfo.class}`}>
                                        {aqiInfo.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* History Section */}
                    <section className="history-weather">
                        <h3>Last 7 Days History</h3>
                        <div className="history-grid">
                            {historyData.map((day, index) => (
                                <div key={index} className="history-card">
                                    <div className="date">{day.date}</div>
                                    <div className="history-details">
                                        <p className="max-temp"><strong>Max:</strong> {day.max}°C</p>
                                        <p className="min-temp"><strong>Min:</strong> {day.min}°C</p>
                                        <p className="rain-sum"><strong>Rain:</strong> {day.rain}mm</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default CurrentWeatherAndHistory;