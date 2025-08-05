const request = require('postman-request');

const WEATHERSTACK_KEY = process.env.WEATHERSTACK_KEY;

/**
 * forecast(latitudeOrLocation, longitudeOrCallback, maybeCallback)
 * - call like forecast(lat, lon, cb)
 * - forecast('Munich', cb) — fallback 
 * - or like Promise: await forecast(lat, lon)
 */
const forecast = (a, b, c) => {
  // normalize args
  let latitude, longitude, callback;
  if (typeof a === 'string' && (typeof b === 'function' || typeof b === 'undefined')) {
    // forecast('Munich', cb?)  -> a = locationName
    latitude = null;
    longitude = null;
    callback = b;
  } else {
    latitude = a;
    longitude = b;
    callback = c;
  }

  const buildUrl = (query) =>
    `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${encodeURIComponent(query)}&units=m`;

  const doRequest = (url) =>
    new Promise((resolve, reject) => {
      request({ url, json: true, timeout: 5000 }, (error, response) => {
        if (error) return reject('Unable to connect to weather service!');
        const body = response && response.body;
        if (!body) return reject('No response from weather service.');
        if (body.error) return reject(body.error.info || 'Unable to find location. Try another search.');

        const current = body.current || {};
        const desc = (current.weather_descriptions && current.weather_descriptions[0]) || 'No description';
        const temp = current.temperature;
        const feels = current.feelslike;
        const humidity = current.humidity;
        const wind = current.wind_speed;
        const locationName = body.location && body.location.name ? `${body.location.name}` : '';

        const forecastString = `${desc}: It is currently ${temp}°C out${feels ? `. Feels like ${feels}°C` : ''}. Humidity: ${humidity}% . Wind: ${wind} km/h. ${locationName}`.trim();

        resolve({ text: forecastString, raw: body });
      });
    });

  const exec = async () => {

    if (latitude != null && longitude != null) {
      const coordQuery = `${latitude},${longitude}`;
      try {
        const res = await doRequest(buildUrl(coordQuery));
        return res;
      } catch (err) {
        
        throw err;
      }
    } else {
      // call forecast('Munich')
      const locationQuery = a;
      const res = await doRequest(buildUrl(locationQuery));
      return res;
    }
  };

  if (typeof callback === 'function') {
    exec()
      .then((r) => callback(undefined, r))
      .catch((e) => callback(e, undefined));
  } else {
    return exec();
  }
};

module.exports = forecast;
