import React, { useState, useEffect } from 'react';
import './App.css';
// Context
import { ThemeProvider } from './context/ThemeContext';
// Hooks
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
// Components
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather'; // Formerly CurrentWeatherAndHistory
import HourlyChart from './components/HourlyChart';
import ClothingAvatar from './components/ClothingAvatar';
import TodayWeather from './components/TodayWeather';
import WeatherMap from './components/WeatherMap';
import TenDayForecast from './components/TenDayForecast';

function AppContent() {
  const { weather, loading, error, lastUpdated, cityName, location, updateLocation, refetch } = useWeather();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [unit, setUnit] = useState(localStorage.getItem('atmosphere_unit') || 'C');

  useEffect(() => localStorage.setItem('atmosphere_unit', unit), [unit]);
  const toggleUnit = () => setUnit(prev => prev === 'C' ? 'F' : 'C');

  if (loading) return <div className="app-container loading-screen"><h2>Loading Atmosphere Pro...</h2></div>;
  if (error) return <div className="app-container error-screen"><h2>{error}</h2><button onClick={refetch}>Retry</button></div>;

  return (
    <div className="app-container">
      <Header
        cityName={cityName}
        lastUpdated={lastUpdated}
        isFav={isFavorite(cityName)}
        onToggleFav={() => toggleFavorite(cityName, location.lat, location.lon)}
        onSelectCity={updateLocation}
        unit={unit}
        onToggleUnit={toggleUnit}
      />

      <main className="dashboard-grid">
        <div className="main-section">
          <CurrentWeather data={weather} unit={unit} />
          <HourlyChart hourlyData={weather.hourly} unit={unit} />
          <ClothingAvatar
            temperature={weather.current.temperature_2m}
            rainCode={weather.current.weather_code}
            uvIndex={weather.daily.uv_index_max[1]}
          />
          <TodayWeather current={weather.current} daily={weather.daily} />
        </div>

        <aside className="sidebar">
          {favorites.length > 0 && (
            <div className="weather-card favorites-card">
              <h3>Saved Locations</h3>
              <div className="favorites-list">
                {favorites.map((fav, index) => (
                  <div key={index} className="fav-item" onClick={() => updateLocation(fav.name, fav.lat, fav.lon)}>
                    📍 {fav.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          <WeatherMap lat={location.lat} lon={location.lon} city={cityName} />
          <TenDayForecast daily={weather.daily} unit={unit} />
        </aside>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}