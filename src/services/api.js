import axios from 'axios';

const WEATHER_API = "https://api.open-meteo.com/v1";
const GEO_API = "https://geocoding-api.open-meteo.com/v1";
const AQI_API = "https://air-quality-api.open-meteo.com/v1";

export const fetchWeatherData = async (lat, lon) => {
  const [weatherResponse, aqiResponse] = await Promise.all([
    axios.get(
      `${WEATHER_API}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=1&timezone=auto`
    ),
    axios.get(
      `${AQI_API}/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,european_aqi`
    )
  ]);

  return {
    ...weatherResponse.data,
    current: {
      ...weatherResponse.data.current,
      aqi: aqiResponse.data.current.us_aqi // defaulting to US AQI for display
    }
  };
};

export const searchCity = async (query) => {
  const { data } = await axios.get(
    `${GEO_API}/search?name=${query}&count=5&language=en&format=json`
  );
  return data.results || [];
};