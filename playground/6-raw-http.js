const http = require("http");
const {weatherstackKey} = require('../weather-app/config')

const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=45,-75&units=m`

const request = http.request(url, (response) => {

  let data = '';
  response.on('data', (chunk) => {
    data = data + chunk.toString()
    console.log(chunk)
  })

  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body);
  })
})

request.on('error', (error) => {
  console.log('An error', error);
});


request.end();