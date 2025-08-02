const request = require("postman-request");

const url = "https://api.weatherstack.com/current?access_key=2ac5c82a4d477371f3fd8e11c9d534f5&query=48.1351,11.5820&units=m";


request({url: url, json: true}, (error, response) => {
  console.log(response.body.current.weather_descriptions[0] + ': It is currently ' + response.body.current.temperature + ' degrees out in Munich. There is a ' + response.body.current.feelslike + ' degrees feels like temperature.');
}) 