import { weather_api_key } from '@env';
// import { getWeather, dailyForecast, showWeather, getLocation } from 'react-native-weather-api';

export async function getWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=hourly&appid=${weather_api_key}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch weather!');
      }
      const data = await response.json();
      const temperature = data.hourly.temp;
    return temperature;
  }