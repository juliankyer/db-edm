const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const config = dotenv.config().parsed;

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.use(bodyParser.json());
app.use(cors());

const clientSecret = process.env.CLIENT_SECRET || config.CLIENT_SECRET;
const userName = process.env.USERNAME || config.USERNAME;
const password = process.env.PASSWORD || config.PASSWORD;
const jwtoken = process.env.TOKEN || config.TOKEN;

app.set('port', process.env.PORT || 3000);
app.set('secretKey', clientSecret);
app.locals.title = 'EDM Server';

if (!clientSecret || !userName || !password) {
  throw new Error('Make sure you have a CLIENT_SECRET, USERNAME, and PASSWORD in your .env file');
}

const checkAuth = (request, response, next) => {
  const token = request.body.token || request.headers.authorization;

  if (token) {
    jwt.verify(token, app.get('secretKey'), (error, decoded) => {
      if (error) {
        return response.status(403).send({
          success: false,
          message: 'Invalid authorization token.',
        });
      }
      request.decoded = decoded;
      return next();
    });
  } else {
    return response.status(403).send({
      succes: false,
      message: 'You must be authorized to hit this endpoint.',
    });
  }
};

app.post('/api/v1/authenticate', (request, response) => {
  const user = request.body;

  if (user.username !== userName || user.password !== password) {
    response.status(403).send({
      success: false,
      message: 'Whoops, these credentials aren\'t valid',
    });
  } else {
    const token = jwt.sign(user, app.get('secretKey'));

    response.json({
      success: true,
      username: user.username,
      token,
    });
  }
});

app.get('/api/v1/genres', (request, response) => {
  database('genres').select()
    .then(genres => response.status(200).json(genres))
    .catch(error => response.status(500).json(error));
});

app.get('/api/v1/songs', (request, response) => {
  database('songs').select()
    .then((songs) => {
      if (!songs.length) {
        response.status(404).json({ error: 'There are no songs here' });
      } else {
        response.status(200).json(songs);
      }
    })
    .catch(error => response.status(500).json(error));
});

app.get('/api/v1/genres/:id', (request, response) => {
  database('genres').where('id', request.params.id).select()
  .then((genre) => {
    if (!genre.length) {
      response.status(404).send({ error: 'That\'s not a genre' });
    } else {
      response.status(200).json(genre);
    }
  })
  .catch(error => response.status(500).json(error));
});

app.get('/api/v1/genres/:id/songs', (request, response) => {
  database('songs').where('genre_id', request.params.id).select()
    .then((songs) => {
      if (!songs.length) {
        response.status(404).json({ error: 'There are no songs here. This could be either due to an incorrect genre id, or that the specified genre doesn\'t contain songs yet.' });
      } else {
        response.status(200).json(songs);
      }
    })
    .catch(error => response.status(500).json(error));
});

app.get('/api/v1/songs/:id', (request, response) => {
  database('songs').where('id', request.params.id).select()
    .then((song) => {
      if (!song.length) {
        response.status(404).json({ error: 'There are no songs that match this ID.' });
      } else {
        response.status(200).json(song);
      }
    })
    .catch(error => response.status(500).json(error));
});

app.post('/api/v1/genres', checkAuth, (request, response) => {
  const genre = request.body;

  if (!genre.genre || !genre.link || !genre.description) {
    response.status(400).json({ error: 'Make sure you have a genre, link, and description in your Genre post request.' });
  } else {
    database('genres').insert(genre, 'id')
    .then((ids) => {
      response.status(201).json({ id: ids[0] });
    })
    .catch(error => response.status(500).json(error));
  }
});

app.post('/api/v1/genres/:id/songs', (request, response) => {
  const { id } = request.params;
  const songInfo = request.body;
  songInfo.genre_id = id;

  if (!songInfo.title || !songInfo.artist || !songInfo.service || !songInfo.video) {
    response.status(400).json({ error: 'Make sure you have a title, artist, service, and video URL specified in your POST request.' });
  } else {
    database('songs').insert(songInfo, 'id')
    .then(song => response.status(201).json({ id: song[0] }))
    .catch(error => response.status(500).json(error));
  }
});

app.delete('/api/v1/genres/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('songs').where('genre_id', id).del()
    .then(() => database('genres').where('id', id).del())
      .then(() => response.sendStatus(204))
      .catch(error => response.status(500).json(error));
});

app.delete('/api/v1/songs/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('songs').where('id', id).del()
    .then(() => response.sendStatus(204))
    .catch(error => response.status(500).json(error));
});

app.patch('/api/v1/genres/:id', checkAuth, (request, response) => {
  const genre = request.body;
  const { id } = request.params;

  if (genre.id) {
    response.status(403).json({ error: 'You may not edit an existing genre ID.' });
  } else {
    database('genres').where('id', id).update(genre)
    .then(() => response.sendStatus(201))
    .catch(error => response.status(500).json(error));
  }
});

app.patch('/api/v1/songs/:id', checkAuth, (request, response) => {
  const song = request.body;
  const { id } = request.params;

  if (song.id || song.genre_id) {
    response.status(403).json({ error: 'You may not edit an existing song\'s IDs.' });
  } else {
    database('songs').where('id', id).update(song)
    .then(() => response.sendStatus(201))
    .catch(error => response.status(500).json(error));
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
