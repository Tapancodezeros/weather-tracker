import React, { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import '../styles/App.css';

// Create Context for global state
const WeatherContext = createContext();

// Custom hook to use the context
export const useWeather = () => useContext(WeatherContext);

// Provider component
function WeatherProvider({ children }) {
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

  const value = {
    locationName,
    coords,
    weatherData,
    loading,
    lastUpdated,
    errorMsg,
    setCoords: handleSetCoords,
    setLocationName: handleSetLocationName,
    setErrorMsg: handleSetErrorMsg,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <WeatherProvider>
      <Component {...pageProps} />
    </WeatherProvider>
  );
}

export default MyApp;
