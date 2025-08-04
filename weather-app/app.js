const request = require("postman-request");
const geocode = require('./utils/geocode')
// const url = "https://api.weatherstack.com/current?access_key=2ac5c82a4d477371f3fd8e11c9d534f5&query=48.1351,11.5820&units=m";

// request({url: url, json: true}, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather service!');
//   } else if (response.body.error) {
//     console.log('Unable to find location. Try another search.');
//   } else {
//     console.log(response.body.current.weather_descriptions[0] + ': It is currently ' + response.body.current.temperature + ' degrees out in Munich. There is a ' + response.body.current.feelslike + ' degrees feels like temperature.');
//   }
// }) 

// Gecoding
// const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Munich.json?access_token=pk.eyJ1IjoiZHJ1bWxpZmUxODIiLCJhIjoiY21kdnF6MmJtMHdobjJscXdrbXBhcHcwcCJ9.BlyWpKK3Crmh3Ydl7XXeIw&limit=1";

// request({url: geocodeUrl, json: true}, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to location service!');
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find location. Try another search.');
//   } else {
//     const latitude = response.body.features[0].geometry.coordinates[1];
//     const longitude = response.body.features[0].geometry.coordinates[0];
//     console.log('Latitude:', latitude);
//     console.log('Longitude:', longitude);
//   }
// });



geocode('Boston', (error, data) => {
  console.log('Error', error)
  console.log("Data", data)
})
