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
const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 },
];
app.post('/movies/create', (req, res) => {
  res.status(200).json({ status: 200, message: 'Movie created' });
});

app.get('/movies/read', (req, res) => {
  res.status(200).json({ status: 200, data: movies });
});

app.put('/movies/update', (req, res) => {
  res.status(200).json({ status: 200, message: 'Movie updated' });
});

app.delete('/movies/delete', (req, res) => {
  res.status(200).json({ status: 200, message: 'Movie deleted' });
});

app.get('/movies/read/by-date', (req, res) => {
  const Date = [...movies].sort((a, b) => a.year - b.year);
  res.status(200).json({ status: 200, data: Date });
});

app.get('/movies/read/by-rating', (req, res) => {
  const Rating = [...movies].sort((a, b) => b.rating - a.rating);
  res.status(200).json({ status: 200, data: Rating });
});

app.get('/movies/read/by-title', (req, res) => {
  const Title = [...movies].sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).json({ status: 200, data: Title });
});

app.get('/movies/read/:id?',(req,res)=>{
  const {id} = req.params;
  if(id > movies.length){
     res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`});
}
else
  res.status(200).json({status:200, data:movies[id-1]});
})
app.get('/movies/add', (req, res) => {
  const title = req.query.title;
  const year = req.query.year;
  let rating = req.query.rating;

  if (!title || !year || year.length !== 4 || isNaN(year)) {
    res.status(403).json({
      status: 403,
      error: true,
      message: 'Please write a title and a year.',
    });
  } else {
    if (!rating || isNaN(rating)) {
      rating = 4;
    }

    const newMovie = { title, year: parseInt(year), rating: parseFloat(rating) };
    movies.push(newMovie);

    res.status(200).json({ status: 200, data: movies });
  }
});
let length=movies.length-1;

