import axios from 'axios';

const WEATHER_API = "https://api.open-meteo.com/v1";
const GEO_API = "https://geocoding-api.open-meteo.com/v1";
const AQI_API = "https://air-quality-api.open-meteo.com/v1";

export const fetchWeatherData = async (lat, lon) => {
  const [weatherResponse, aqiResponse] = await Promise.all([
    axios.get(
      `${WEATHER_API}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,surface_pressure,visibility&hourly=temperature_2m,weather_code,visibility,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&past_days=1&timezone=auto`
    ),
    axios.get(
      `${AQI_API}/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,european_aqi,pm10,pm2_5,nitrogen_dioxide,ozone,carbon_monoxide,sulphur_dioxide`
    )
  ]);

  return {
    ...weatherResponse.data,
    current: {
      ...weatherResponse.data.current,
      aqi: aqiResponse.data.current.us_aqi,
      air_quality: aqiResponse.data.current // full details
    }
  };
};

export const searchCity = async (query) => {
  const { data } = await axios.get(
    `${GEO_API}/search?name=${query}&count=5&language=en&format=json`
  );
  return data.results || [];
};