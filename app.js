/*
 Authors:
 Your name and student #: Megan
 Your Partner's Name and student #: Jo Jo
*/
const express = require('express');
const { readFile } = require('fs');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

app.get('/myForm', (req, res) => res.render('pages/myForm'));

app.post('/myForm', (req, res) => {
  const formData = req.body;
  const movieArray = formData['submitted-movies'].split(', ');
  console.log(movieArray);
  res.render('pages/', { movieList: movieArray });
});

app.get('/myListQueryString', (req, res) => {
  const query = req.query;
  const movieArray = Object.values(query);
  console.log(req.query);
  console.log(movieArray);
  res.render('pages/', { movieList: movieArray });
});

app.get('/search/:movieName', (req, res) => {
  const searchMovie = req.params.movieName.toLowerCase();
  readFile('./movieDescriptions.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    const movieDB = data.split('\n');
    const matchIndex = movieDB
      .map((desc) => desc.toLowerCase())
      .findIndex((movie) => movie.includes(searchMovie));
    let movieName;
    let movieDesc;
    if (matchIndex >= 0) {
      movieName = movieDB[matchIndex].split(':')[0];
      movieDesc = movieDB[matchIndex].split(':')[1];
    } else {
      console.log('Movie not found');
    }
    res.render('pages/searchResult', { movieName, movieDesc });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/ 🚀');
});
