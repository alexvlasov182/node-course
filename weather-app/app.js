const {geocode, GeocodeError} = require('./services/geocode');
const {forecast, ForecastError} = require('./services/forecast');
const SimpleCache = require('./cache/simpleCache');

const cache = new SimpleCache(10 * 60 * 1000);


const run = async () => {
  const locationQuery = process.argv[2];
  if (!locationQuery) {
    console.log("Please provide a location as the first argument");
    process.exit(1);
  }

  try {
    let geoData = cache.get(`geo-${locationQuery}`);
    if(!geoData) {
      geoData = await geocode(locationQuery);
      cache.set(`geo-${locationQuery}`, geoData)
    }
    console.log('Location:', geoData.location);

    const forecastKey = `forecast-${geoData.latitude},${geoData.longitude}`;
    let weatherData = cache.get(forecastKey);
    if(!weatherData) {
      weatherData = await forecast(geoData.latitude, geoData.longitude);
      cache.set(forecastKey, weatherData)
    }

    console.log('Forecast:', weatherData);
    
  } catch(error) {
    if (error instanceof GeocodeError || error instanceof ForecastError) {
      console.log('Error:', error.message)
    } else {
      console.error('Unexpected error:', error)
    }
  }
};

run();