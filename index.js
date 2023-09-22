const express = require('express');
const app = express();

// Define a route that responds with "OK" for all incoming requests.
app.get('/', (req, res) => {
  res.send('OK');
});

app.listen (3000);


// console.log(`Starting Express server on port `);
// console.log('jana');