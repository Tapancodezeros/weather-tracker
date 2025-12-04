import React, { useState, useEffect, useRef } from 'react';
import { Cloud, Sun, Wind, Droplets, MapPin, Search, Clock } from 'lucide-react';

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";

const CurrentWeatherAndHistory = ({ weatherData, airQualityData, setCoords, setLocationName, setErrorMsg, loading, setView }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]); 
    const [showSuggestions, setShowSuggestions] = useState(false); 
    const [timeLeft, setTimeLeft] = useState(60); // State for countdown
    const wrapperRef = useRef(null);

    // Click outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    // Auto-reload countdown timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    // Trigger reload by updating coords reference
                    setCoords(prevCoords => ({ ...prevCoords }));
                    return 60; // Reset timer
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [setCoords]);

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
        setSearchQuery(""); 
        setSuggestions([]); 
        setShowSuggestions(false); 
        setErrorMsg("");
        setTimeLeft(60); // Reset timer on manual change
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
                    setTimeLeft(60); // Reset timer on manual change
                },
                (err) => setErrorMsg("Location access denied.")
            );
        } else { setErrorMsg("Geolocation not supported."); }
    };

    const getAqiInfo = (aqi) => {
        if (!aqi) return { label: 'N/A', class: '' };
        if (aqi <= 20) return { label: 'Good', class: 'aqi-good' };
        if (aqi <= 40) return { label: 'Fair', class: 'aqi-fair' };
        if (aqi <= 60) return { label: 'Moderate', class: 'aqi-moderate' };
        if (aqi <= 80) return { label: 'Poor', class: 'aqi-poor' };
        return { label: 'Unhealthy', class: 'aqi-unhealthy' };
    };

    // Extract last 7 days from API
    const historyData = weatherData ? weatherData.daily.time.slice(0, 7).map((date, index) => ({
            date: date,
            max: weatherData.daily.temperature_2m_max[index],
            min: weatherData.daily.temperature_2m_min[index],
            rain: weatherData.daily.precipitation_sum[index],
    })) : [];
    
    const aqiInfo = airQualityData ? getAqiInfo(airQualityData.current.european_aqi) : { label: 'N/A', class: '' };
    const currentTemp = weatherData ? weatherData.current.temperature_2m : 0;
    const isCold = currentTemp < 10; 

    return (
        <div ref={wrapperRef} className="animate-fade-in">
            {/* Search Bar */}
            <div className="search-bar-container">
                <div className="search-wrapper">
                    <form onSubmit={handleSearch} className="search-form">
                        <Search size={20} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search city..." 
                            value={searchQuery} 
                            onChange={handleInputChange}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn">Search</button>
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
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button className="location-btn" onClick={handleLiveLocation}>
                        <MapPin size={18} /> Live Location
                    </button>
                    {/* Timer Display */}
                    <div style={{ 
                        fontSize: '0.8rem', 
                        color: '#64748b', 
                        background: '#f1f5f9', 
                        padding: '8px 12px', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap'
                    }}>
                        <Clock size={14} />
                        {loading ? "Updating..." : `Auto-refresh: ${timeLeft}s`}
                    </div>
                </div>
            </div>
            
            {!loading && weatherData && (
                <div className="weather-content">
                    {/* Current Weather Card */}
                    <div className={`main-card ${isCold ? "ice-theme" : "sun-theme"}`}>
                        <div className="card-header">
                            <div>
                                <h1 className="temp-display">
                                    {weatherData.current.temperature_2m.toFixed(1)}°
                                </h1>
                                <p className="condition-text">{isCold ? 'Cold' : 'Sunny/Mild'}</p>
                            </div>
                            <div className="weather-icon-large">
                                {isCold ? <Cloud size={64} /> : <Sun size={64} />}
                            </div>
                        </div>
                        
                        <div className="real-feel-section">
                            <span>RealFeel® {weatherData.current.apparent_temperature.toFixed(1)}°</span>
                        </div>

                        <div className="details-grid">
                            <div className="detail-item">
                                <Wind size={20} />
                                <span>{weatherData.current.wind_speed_10m} km/h</span>
                            </div>
                            <div className="detail-item">
                                <Droplets size={20} />
                                <span>{weatherData.current.relative_humidity_2m}% Humidity</span>
                            </div>
                            <div className="detail-item">
                                <span className={`aqi-badge ${aqiInfo.class}`}>
                                    AQI: {aqiInfo.label}
                                </span>
                            </div>
                        </div>

                        <div className="card-actions">
                            <button onClick={() => setView('today')} className="action-link">
                                VIEW HOURLY GRAPHS &gt;
                            </button>
                            <button onClick={() => setView('tenday')} className="action-link">
                                9-DAY FORECAST &gt;
                            </button>
                        </div>
                    </div>

                    {/* History Section */}
                    <div className="history-section">
                        <h3>Last 7 Days History</h3>
                        <div className="history-grid">
                            {historyData.map((day, index) => (
                                <div key={index} className="history-card">
                                    <div className="history-date">
                                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                                    </div>
                                    <div className="history-values">
                                        <span className="h-max">{day.max.toFixed(1)}°</span>
                                        <span className="h-min">{day.min.toFixed(1)}°</span>
                                    </div>
                                    <div className="history-rain">
                                        <Droplets size={12} /> {day.rain}mm
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentWeatherAndHistory;