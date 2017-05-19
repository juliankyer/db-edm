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
      response.status(500).json(error)
    });
});

app.get('/api/v1/songs', (request, response) => {
  database('songs').select()
    .then(songs =>
      response.status(200).json(songs)
    )
    .catch((error) => {
      response.status(500).json(error)
    });
});

app.get('/api/v1/genres/:id', (request, response) => {
  if(!request.params.id) { return response.sendStatus(404) }
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

app.post('/api/v1/genres', (request, response) => {
  const genre = request.body;
  database('genres').insert(genre, 'id')
    .then(ids => {
      response.status(201).json({ id: ids[0] })
    })
    .catch(error => {
      console.error('error: ', error);
    });
});

app.post('/api/v1/genres/:id/songs', (request, response) => {
  const { id } = request.params;
  const song = request.body;
  // Object.assign(song, { genre_id: request.params.id })
  song["genre_id"] = id;
  
  database('songs').insert(song, 'id')
    .then(song => {
      response.status(201).json({ id: song[0] })
    })
    .catch(error => {
      console.log('boom');
      console.error('error: ', error);
    });
});

app.delete('/api/v1/genres/:id', (request, response) => {
  const { id } = request.params;

  database('songs').where('genre_id', id).del()
    .then(() => {
      return database('genres').where('id', id).del()
    })
      .then(rows => response.sendStatus(204))
      .catch(error => {
        response.sendStatus(500)
      });
});

app.delete('/api/v1/songs/:id', (request, response) => {
  const { id } = request.params;
  
  database('songs').where('id', id).del()
    .then(rows => response.sendStatus(204))
    .catch(error => {
      response.sendStatus(500)
    });
});

app.patch('/api/v1/genres/:id', (request, response) => {
  const genre = request.body;
  const { id } = request.params;
  
  database('genres').where('id', id).update(genre)
    .then(() => response.sendStatus(200))
    .catch(error => response.sendStatus(500))
});

app.patch('/api/v1/songs/:id', (request, response) => {
  const song = request.body;
  const { id } = request.params;
  
  database('songs').where('id', id).update(song)
    .then(() => response.sendStatus(200))
    .catch(error => response.sendStatus(500))
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;