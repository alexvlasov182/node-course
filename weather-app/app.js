// app.js
require('dotenv').config();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const query = process.argv[2] || 'Boston';

(async () => {
  try {
    const geo = await geocode(query);
    console.log('Location:', geo.location);
    const weather = await forecast(geo.latitude, geo.longitude);
    const forecastText = typeof weather === 'object' && weather.text ? weather.text : weather;
    console.log('Forecast:', forecastText);
  } catch (err) {
    console.log('Error:', err);
  }
})();
