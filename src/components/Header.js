import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { searchCity } from '../services/api';

const Header = ({ cityName, lastUpdated, isFav, onToggleFav, onSelectCity, unit, onToggleUnit }) => {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query.length > 2) {
      const results = await searchCity(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const selectCity = (city) => {
    onSelectCity(`${city.name}, ${city.country}`, city.latitude, city.longitude);
    setSearch('');
    setSuggestions([]);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="title-row">
          <h1>Atmosphere Pro</h1>
          <button className={`fav-star ${isFav ? 'active' : ''}`} onClick={onToggleFav}>
            {isFav ? "★" : "☆"}
          </button>
        </div>
        <div className="location-badge">
          <span className="city-label">{cityName}</span>
          <span className="update-label">Updated: {lastUpdated}</span>
        </div>
      </div>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
        <button className="unit-toggle" onClick={onToggleUnit}>°{unit}</button>
        
        <div className="search-container">
          <input type="text" placeholder="Search city..." value={search} onChange={handleSearch} />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((city) => (
                <li key={city.id} onClick={() => selectCity(city)}>
                  <strong>{city.name}</strong> <span>{city.country}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;