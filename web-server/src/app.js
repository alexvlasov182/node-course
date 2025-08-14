const path = require('path');
const express = require('express');

const app = express();
const port = 8080;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
  res.send({
    location: "New York",
    temperature: 25,
    description: "Sunny"
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})