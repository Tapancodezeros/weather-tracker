import React from 'react';
import Link from 'next/link';
import CurrentWeatherAndHistory from '../components/CurrentWeatherAndHistory';
import { useWeather } from './_app';

export default function Home() {
  const { locationName, lastUpdated, errorMsg, loading } = useWeather();

  return (
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
        <Link href="/">Current & History</Link>
        <Link href="/forecast">10-Day Forecast</Link>
      </nav>

      {errorMsg && <div className="error-message">{errorMsg}</div>}
      {loading && <div className="loading">Updating Weather...</div>}

      <CurrentWeatherAndHistory />
    </div>
  );
}
