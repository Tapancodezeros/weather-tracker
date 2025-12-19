import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { searchCity } from '../services/api';

const Header = ({ cityName, lastUpdated, isFav, onToggleFav, onSelectCity, unit, onToggleUnit }) => {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.length > 2) {
      setLoading(true);
      setShowSuggestions(true);
      try {
        const results = await searchCity(query);
        setSuggestions(results);
      } catch (error) {
        console.error("Search failed", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const selectCity = (city) => {
    onSelectCity(`${city.name}, ${city.country}`, city.latitude, city.longitude);
    clearSearch();
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
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="unit-toggle" onClick={onToggleUnit} title="Toggle Unit">
          °{unit}
        </button>

        <div className="search-wrapper">
          <div className={`search-container ${showSuggestions && suggestions.length > 0 ? 'active' : ''}`}>
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={handleSearch}
              onFocus={() => { if (search.length > 2) setShowSuggestions(true); }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <div className="search-actions">
              {loading && <div className="spinner"></div>}
              {!loading && search && (
                <button className="clear-btn" onClick={clearSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              )}
            </div>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((city) => (
                <li key={city.id} onClick={() => selectCity(city)}>
                  <div className="suggestion-icon">📍</div>
                  <div className="suggestion-info">
                    <strong>{city.name}</strong>
                    <span>{city.admin1 || city.country}</span>
                  </div>
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