const express = require('express');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'EDM Server';

app.get('/api/v1/genres', (request, response) => {
  database('genres').select()
    .then(genres =>
      response.status(200).json(genres)
    )
    .catch((error) => {
      console.error(error)
    });
});

app.get('/api/v1/songs', (request, response) => {
  database('songs').select()
    .then(songs =>
      response.status(200).json(songs)
    )
    .catch((error) => {
      console.error(error)
    });
});

app.get('/api/v1/genres/:id', (request, response) => {
  database('genres').where('id', request.params.id).select()
  .then(genre =>
    response.status(200).json(genre)
  )
  .catch(error => console.error(error));
})

app.get('/api/v1/genres/:id/songs', (request, response) => {
  database('songs').where('genre_id', request.params.id).select()
    .then(songs =>
      response.status(200).json(songs)
    )
    .catch((error) => {
      console.error(error)
    });
});

app.get('/api/v1/songs/:id', (request, response) => {
  database('songs').where('id', request.params.id).select()
    .then(song =>
      response.status(200).json(song)
    )
    .catch(error => console.error(error));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;