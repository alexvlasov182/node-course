const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
  res.send({
    name: "John Doe",
    age: 30
  })
})

app.get('/about', (req, res) => {
  res.send('<h1>My Weather App</h1>')
})

app.get('/weather', (req, res) => {
  res.send([{
    location: "New York",
    temperature: 25,
    description: "Sunny"
  }, {
    location: "Los Angeles",
    temperature: 30,
    description: "Clear"
  }])
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})