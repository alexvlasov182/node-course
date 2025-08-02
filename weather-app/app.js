const request = require("postman-request");

const url = "https://api.weatherstack.com/current?access_key=2ac5c82a4d477371f3fd8e11c9d534f5&query=48.1351,11.5820"


request({url: url}, (error, response) => {
  const data = JSON.parse(response.body)
  console.log(data);
})