import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CurrentWeatherAndHistory from "./CurrentWeatherAndHistory";
import TenDayForecast from "./TenDayForecast";
import "./App.css";

function App() {
  // Global State for Location and Data
  const [locationName, setLocationName] = useState("London");
  const [coords, setCoords] = useState({ lat: 51.5074, lon: -0.1278 });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Function to Fetch Weather Data (Now requests 7 past days + 10 future days)
  const fetchWeather = async (latitude, longitude) => {
    setLoading(true);
    setErrorMsg("");
    try {
      // **API Update:** Added &forecast_days=10
      const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&past_days=7&forecast_days=10&timezone=auto`;
      
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      
      const data = await response.json();
      setWeatherData(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(error);
      setErrorMsg("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Effect: Fetch data when coords change AND sets up the 60s timer
  useEffect(() => {
    fetchWeather(coords.lat, coords.lon);

    const intervalId = setInterval(() => {
      fetchWeather(coords.lat, coords.lon);
    }, 60000); // 60 seconds

    return () => clearInterval(intervalId);
  }, [coords]);
  
  // Handlers for passing down to children components
  const handleSetCoords = (newCoords) => setCoords(newCoords);
  const handleSetLocationName = (name) => setLocationName(name);
  const handleSetErrorMsg = (msg) => setErrorMsg(msg);
  
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>React Weather Station</h1>
          <div className="location-info">
            <h2>{locationName}</h2>
            <span className="badge">Auto-reloads every 60s</span>
            <p className="last-updated">Last Updated: {lastUpdated}</p>
          </div>
        </header>

        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/">Current & History</Link>
          <Link to="/forecast">10-Day Forecast</Link>
        </nav>
        
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        {loading && <div className="loading">Updating Weather...</div>}

        {/* Routing Setup */}
        <Routes>
          <Route path="/" element={
            <CurrentWeatherAndHistory 
              weatherData={weatherData}
              setCoords={handleSetCoords}
              setLocationName={handleSetLocationName}
              setErrorMsg={handleSetErrorMsg}
              loading={loading}
              currentCoords={coords}
            />
          } />
          <Route path="/forecast" element={
            <TenDayForecast 
              weatherData={weatherData}
              loading={loading}
              units={weatherData ? weatherData.daily_units : null}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;