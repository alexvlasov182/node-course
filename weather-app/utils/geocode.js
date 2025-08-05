
const request = require('postman-request');

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const geocode = (address, callback) => {
  if (!address) {
    const err = 'Address must be provided';
    if (typeof callback === 'function') return callback(err, undefined);
    return Promise.reject(err);
  }

  if (!MAPBOX_TOKEN) {
    const err = 'Missing MAPBOX_TOKEN in environment';
    if (typeof callback === 'function') return callback(err, undefined);
    return Promise.reject(err);
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

  const doRequest = () =>
    new Promise((resolve, reject) => {
      request({ url, json: true, timeout: 5000 }, (error, response) => {
        if (error) return reject('Unable to connect to location services!');
        const body = response && response.body;

        if (process.env.DEBUG_GEOCODE === 'true') {

          console.log('DEBUG Mapbox response:', JSON.stringify(body, null, 2));
        }

        if (!body) return reject('No response from location service.');
        if (!Array.isArray(body.features) || body.features.length === 0) {
          return reject('Unable to find location. Try another search.');
        }

        const place = body.features[0];
        const result = {
          latitude: place.center[1],
          longitude: place.center[0],
          location: place.place_name
        };
        resolve(result);
      });
    });

  if (typeof callback === 'function') {
    doRequest()
      .then((res) => callback(undefined, res))
      .catch((err) => callback(err, undefined));
  } else {
    return doRequest();
  }
};

module.exports = geocode;