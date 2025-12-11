import axios from 'axios';

const WEATHER_API = "https://api.open-meteo.com/v1";
const GEO_API = "https://geocoding-api.open-meteo.com/v1";

export const fetchWeatherData = async (lat, lon) => {
  const { data } = await axios.get(
    `${WEATHER_API}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=1&timezone=auto`
  );
  return data;
};

export const searchCity = async (query) => {
  const { data } = await axios.get(
    `${GEO_API}/search?name=${query}&count=5&language=en&format=json`
  );
  return data.results || [];
};