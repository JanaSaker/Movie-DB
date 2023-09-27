const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

app.use(express.json());

app.post('/movies', async (req, res) => {
  try {
    const { title, year, rating } = req.body;
    const movie = new Movie({ title, year, rating });
    await movie.save();
    res.status(201).json({ status: 201, data: movie });
  } catch (error) {
    res.status(500).json({ status: 500, error: true, message: error.message });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ status: 200, data: movies });
  } catch (error) {
    res.status(500).json({ status: 500, error: true, message: error.message });
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie with ID ${req.params.id} does not exist`,
      });
    } else {
      res.status(200).json({ status: 200, data: movie });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: true, message: error.message });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const { title, year, rating } = req.body;
    const updatedMovie = {};
    if (title) updatedMovie.title = title;
    if (year) updatedMovie.year = year;
    if (rating) updatedMovie.rating = rating;

    const movie = await Movie.findByIdAndUpdate(req.params.id, updatedMovie, {
      new: true, 
    });

    if (!movie) {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie with ID ${req.params.id} does not exist`,
      });
    } else {
      res.status(200).json({ status: 200, data: movie });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: true, message: error.message });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie with ID ${req.params.id} does not exist`,
      });
    } else {
      res.status(200).json({ status: 200, data: movie });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: true, message: error.message });
  }
});

app.listen(3000)