import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CurrentWeatherAndHistory from "./CurrentWeatherAndHistory";
import TenDayForecast from "./TenDayForecast";
import "./App.css";

function App() {
  // Global State
  const [locationName, setLocationName] = useState("London");
  const [coords, setCoords] = useState({ lat: 51.5074, lon: -0.1278 });
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null); // New State for AQI
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchWeather = async (latitude, longitude) => {
    setLoading(true);
    setErrorMsg("");
    try {
      // 1. Fetch Weather Data (Added 'apparent_temperature' and 'wind_gusts_10m')
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,wind_gusts_10m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&past_days=7&forecast_days=10&timezone=auto`;
      
      // 2. Fetch Air Quality Data (Separate API)
      const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi`;

      // Run both requests at the same time
      const [weatherRes, aqiRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(aqiUrl)
      ]);

      if (!weatherRes.ok || !aqiRes.ok) throw new Error("Failed to fetch data");

      const weatherJson = await weatherRes.json();
      const aqiJson = await aqiRes.json();

      setWeatherData(weatherJson);
      setAirQualityData(aqiJson);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(error);
      setErrorMsg("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(coords.lat, coords.lon);

    // Update tab title
    document.title = `Weather in ${locationName.split(',')[0]}`;

    const intervalId = setInterval(() => {
      fetchWeather(coords.lat, coords.lon);
    }, 60000); 

    return () => clearInterval(intervalId);
  }, [coords, locationName]);
  
  // Handlers
  const handleSetCoords = (newCoords) => setCoords(newCoords);
  const handleSetLocationName = (name) => setLocationName(name);
  const handleSetErrorMsg = (msg) => setErrorMsg(msg);
  
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Weather App</h1>
          <div className="location-info">
            <h2>{locationName}</h2>
            <span className="badge">Auto-reloads 60s</span>
            <p className="last-updated">Last Updated: {lastUpdated}</p>
          </div>
        </header>

        {/* Navigation */}
        <nav className="navbar">
          <Link to="/">Current & History</Link>
          <Link to="/forecast">10-Day Forecast</Link>
        </nav>
        
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        {loading && <div className="loading">Updating Weather...</div>}

        <Routes>
          <Route path="/" element={
            <CurrentWeatherAndHistory 
              weatherData={weatherData}
              airQualityData={airQualityData} // Passing the new AQI data down
              setCoords={handleSetCoords}
              setLocationName={handleSetLocationName}
              setErrorMsg={handleSetErrorMsg}
              loading={loading}
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