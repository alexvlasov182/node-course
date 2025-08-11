const request = require('postman-request');
const {weatherstackKey} = require('../config')

class ForecastError extends Error {};

const forecast = async (latitude, longitude) => {
  if (!weatherstackKey) throw new ForecastError('WEATHERSTACK_KEY is missing');

  const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${latitude},${longitude}&units=m`

  return new Promise((resolve, reject) => {
    request({url, json: true, timeout: 5000}, (error, response) => {
      if (error) return reject(new ForecastError('Unable to connect to weather service'))

      const body = response.body;

      if (!body || body.error) {
        return reject(new ForecastError(body?.error?.info || 'Unable ot get weather data'))
      }

      const current = body.current;
      const forecastString = `${current.weather_descriptions[0]}: It is currently ${current.temperature}°C out. Feels like ${current.feelslike}°C. Humidity: ${current.humidity}%. Wind: ${current.wind_speed} km/h.`
      resolve(forecastString);
    });
  });
};

module.exports = {forecast, ForecastError}