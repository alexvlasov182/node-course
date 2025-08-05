require('dotenv').config();

module.exports = {
  mapboxToken: process.env.MAPBOX_TOKEN,
  weatherstackKey: process.env.WEATHERSTACK_KEY,
  cacheTTL: 10 * 60 * 1000,
}