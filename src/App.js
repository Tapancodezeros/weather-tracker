import React, { useState, useEffect } from 'react';
import './App.css'; // Importing your CSS file

// Import components
import CurrentWeatherAndHistory from './CurrentWeatherAndHistory';
import TodayWeather from './TodayWeather';
import TenDayForecast from './TenDayForecast';

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const AQI_API = "https://air-quality-api.open-meteo.com/v1/air-quality";

export default function App() {
    // Default location: London
    const [coords, setCoords] = useState({ lat: 51.5074, lon: -0.1278 });
    const [locationName, setLocationName] = useState("London, United Kingdom");
    const [weatherData, setWeatherData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    
    // View state: 'current', 'today', 'tenday'
    const [view, setView] = useState('current');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Weather (Current, Hourly, Daily with History)
                const weatherUrl = `${WEATHER_API}?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&past_days=7&forecast_days=11`;
                
                const weatherRes = await fetch(weatherUrl);
                const weatherJson = await weatherRes.json();
                setWeatherData(weatherJson);

                // Fetch Air Quality
                const aqiUrl = `${AQI_API}?latitude=${coords.lat}&longitude=${coords.lon}&current=european_aqi`;
                const aqiRes = await fetch(aqiUrl);
                const aqiJson = await aqiRes.json();
                setAirQualityData(aqiJson);

                setErrorMsg("");
            } catch (err) {
                console.error(err);
                setErrorMsg("Failed to fetch weather data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [coords]);

    return (
        <div className="app-container">
            <header className="app-header">
                <h2>{locationName}</h2>
                {errorMsg && <div className="error-badge">{errorMsg}</div>}
            </header>

            <main className="app-main">
                {view === 'current' && (
                    <CurrentWeatherAndHistory 
                        weatherData={weatherData}
                        airQualityData={airQualityData}
                        setCoords={setCoords}
                        setLocationName={setLocationName}
                        setErrorMsg={setErrorMsg}
                        loading={loading}
                        setView={setView}
                    />
                )}
                
                {view === 'today' && (
                    <TodayWeather 
                        weatherData={weatherData} 
                        loading={loading}
                        onBack={() => setView('current')}
                    />
                )}

                {view === 'tenday' && (
                    <TenDayForecast 
                        weatherData={weatherData} 
                        loading={loading}
                        onBack={() => setView('current')}
                    />
                )}
            </main>
        </div>
    );
}