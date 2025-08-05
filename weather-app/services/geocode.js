
const request = require('postman-request');
const {mapboxToken} = require("../config")

class GeocodeError extends Error {}


const geocode = async (address) => {
  if (!address) throw new GeocodeError('Address must be provided');
  if (!mapboxToken) throw new GeocodeError('MAPBOX_TOKEN is missing');

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxToken}&limit=1`;

  return new Promise((resolve, reject) => {
    request({url, json: true, timeout: 5000}, (error, response) => {
      if (error) return reject(new GeocodeError('Unable to connect to location services'))
      
      const body = response.body;
      if(!body || !Array.isArray(body.features) || body.features.length === 0) {
        return reject(new GeocodeError('Unable to find location. Try another search.'));
      }

      const place = body.features[0];
      resolve({
        latitude: place.center[1],
        longitude: place.center[0],
        location: place.place_name,
      });
    });
  });
};

module.exports = {geocode, GeocodeError}