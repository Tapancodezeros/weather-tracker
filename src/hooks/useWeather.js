import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData } from '../services/api';

export const useWeather = () => {
  const [location, setLocation] = useState({ lat: 23.0225, lon: 72.5714 });
  const [cityName, setCityName] = useState('Ahmedabad, India');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const updateLocation = (name, lat, lon) => {
    setCityName(name);
    setLocation({ lat, lon });
  };

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(location.lat, location.lon);
      setWeather(data);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      setError("Failed to load weather data.");
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { weather, loading, error, lastUpdated, cityName, location, updateLocation, refetch: getData };
};