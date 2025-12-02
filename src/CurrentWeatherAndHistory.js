import React, { useState, useRef } from 'react';

// Geocoding API for search
const GEOCODING_API = `https://geocoding-api.open-meteo.com/v1/search`;

const CurrentWeatherAndHistory = ({ weatherData, setCoords, setLocationName, setErrorMsg, loading }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Store city suggestions
    const [showSuggestions, setShowSuggestions] = useState(false); // Toggle dropdown
    
    // wrapper ref to handle clicks outside (optional but good for UX)
    const wrapperRef = useRef(null);

    // 1. Handle Typing in Input
    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Only fetch if length is 3 or more
        if (value.length >= 3) {
            try {
                const response = await fetch(`${GEOCODING_API}?name=${value}&count=5&language=en&format=json`);
                const data = await response.json();
                if (data.results) {
                    setSuggestions(data.results);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // 2. Handle Clicking a Suggestion
    const handleSelectSuggestion = (city) => {
        // Set data immediately
        setLocationName(`${city.name}, ${city.country}`);
        setCoords({ lat: city.latitude, lon: city.longitude });
        
        // Reset UI
        setSearchQuery(""); // Optional: keep name or clear
        setSuggestions([]);
        setShowSuggestions(false);
        setErrorMsg("");
    };

    // 3. Handle Manual Search (Enter key)
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        // Use the first suggestion if available, or fetch new
        if (suggestions.length > 0) {
            handleSelectSuggestion(suggestions[0]);
        } else {
             // Fallback if they hit enter without waiting for suggestions
             // (Re-using the logic from before)
             try {
                const response = await fetch(`${GEOCODING_API}?name=${searchQuery}&count=1&language=en&format=json`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    handleSelectSuggestion(data.results[0]);
                } else {
                    setErrorMsg("City not found.");
                }
             } catch (err) {
                 setErrorMsg("Error searching.");
             }
        }
    };

    // Live Location
    const handleLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocationName("Your Current Location (GPS)");
                    setCoords({ lat: latitude, lon: longitude });
                    setErrorMsg("");
                },
                (error) => setErrorMsg("Location access denied.")
            );
        } else {
            setErrorMsg("Geolocation not supported.");
        }
    };

    // Process History Data
    const historyData = weatherData 
        ? weatherData.daily.time.slice(0, 7).map((date, index) => ({
            date: date,
            max: weatherData.daily.temperature_2m_max[index],
            min: weatherData.daily.temperature_2m_min[index],
            rain: weatherData.daily.precipitation_sum[index],
          }))
        : [];

    return (
        <div ref={wrapperRef}>
            <div className="search-bar">
                <div className="search-input-container">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Type 3 letters (e.g. Lon)..."
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Search</button>
                    </form>

                    {/* SUGGESTIONS DROPDOWN */}
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((city) => (
                                <li key={city.id} onClick={() => handleSelectSuggestion(city)}>
                                    <span className="city-name">{city.name}</span>
                                    <span className="city-country">{city.country}</span>
                                    {city.admin1 && <span className="city-admin"> ({city.admin1})</span>}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button className="location-btn" onClick={handleLiveLocation}>
                    📍 Live Location
                </button>
            </div>
            
            {!loading && weatherData && (
                <div className="weather-content">
                    {/* Current Weather */}
                    <section className="current-weather">
                        <h3>Current Conditions</h3>
                        <div className="card">
                            <div className="metric">
                                <span className="label">Temperature</span>
                                <span className="value">
                                    {weatherData.current.temperature_2m}
                                    {weatherData.current_units.temperature_2m}
                                </span>
                            </div>
                            <div className="metric">
                                <span className="label">Wind</span>
                                <span className="value">
                                    {weatherData.current.wind_speed_10m}
                                    {weatherData.current_units.wind_speed_10m}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* History */}
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