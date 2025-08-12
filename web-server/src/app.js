const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Express & Node.js')
})

app.get('/help', (req, res) => {
  res.send('Help Page')
})

app.get('/about', (req, res) => {
  res.send('This is about page')
})

app.get('/weather', (req, res) => {
  res.send('This weather page')
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})