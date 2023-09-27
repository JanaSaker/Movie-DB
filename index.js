const express = require('express');
const app = express();
app.listen (3000);

// Define a route that responds with "OK" for all incoming requests.
app.get('/', (req, res) => {
  res.send('OK');
});

// Define a route for /test
app.get('/test', (req, res) => {
  res.status(200).json({ status: 200, message: 'ok' });
});

// Define a route for /time
app.get('/time', (req, res) => {
  const hours = new Date().getHours(); 
  const minutes = new Date().getMinutes(); 
  const Time = `${hours}:${minutes}`;
  res.status(200).json( {status:200, message: Time });
});

app.get('/hello/:id?', (req, res) => {
  const id = req.params.id;
  if (!id){
    res.status(200).json({ status: 200, message: `Hello You` });

  }else{
  res.status(200).json({ status: 200, message: `Hello ${id}` });}
});

app.get('/search', (req, res) => {
  const searchQ = req.query.s;

  if (searchQ) {
    res.status(200).json({ status: 200, message: 'ok', data: searchQ });
  } else {
    res.status(500).json({ status: 500, error: true, message: 'You have to provide a search' });
  }
});
