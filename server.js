const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const config = dotenv.config()['parsed'];

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.set('port', process.env.PORT || 3000);
app.set('secretKey', config.CLIENT_SECRET);
app.locals.title = 'EDM Server';

console.log(config.USERNAME);
// I don't think my .env file is hooked up, this statement is causing server to crash 
if (!config.CLIENT_SECRET || !config.USERNAME || !config.PASSWORD) {
  throw new Error('Make sure you have a CLIENT_SECRET, USERNAME, and PASSWORD in your .env file');
}

const checkAuth = (request, response, next) => {
  const token = request.body.token || request.param('token') || request.headers.authorization;

  if (token) {
    jwt.verify(token, app.get('secretKey'), (error, decoded) => {
      if (error) {
        return response.status(403).send({
          success: false,
          message: 'Invalid authorization token.',
        });
      }
      request.decoded = decoded;
      next();
    });
  } else {
    return response.status(403).send({
      succes: false,
      message: 'You must be authorized to hit this endpoint',
    });
  }
};

app.post('/api/v1/authenticate', (request, response) => {
  const user = request.body;

  if (user.username !== config.USERNAME || user.password !== config.PASSWORD) {
    response.status(403).send({
      success: false,
      message: 'Whoops, these credentials aren\'t valid',
    });
  } else {
    const token = jwt.sign(user, app.get('secretKey'), {
      expiresIn: 172800,
    });

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
    .then(songs => response.status(200).json(songs))
    .catch(error => response.status(500).json(error));
});

app.get('/api/v1/genres/:id', (request, response) => {
  // if (!request.params.id) {
  //   return response.sendStatus(404);
  // }
  database('genres').where('id', request.params.id).select()
  .then(genre => response.status(200).json(genre))
  .catch(error => response.status(404).json(error));
});

app.get('/api/v1/genres/:id/songs', (request, response) => {
  database('songs').where('genre_id', request.params.id).select()
    .then(songs => response.status(200).json(songs))
    .catch(error => console.error(error));
});

app.get('/api/v1/songs/:id', (request, response) => {
  database('songs').where('id', request.params.id).select()
    .then(song => response.status(200).json(song))
    .catch(error => console.error(error));
});

app.post('/api/v1/genres', checkAuth, (request, response) => {
  const genre = request.body;
  database('genres').insert(genre, 'id')
    .then(ids => {
      response.status(201).json({ id: ids[0] })
    })
    .catch(error => console.error('error: ', error));
});

app.post('/api/v1/genres/:id/songs', checkAuth, (request, response) => {
  const { id } = request.params;
  const songInfo = request.body;
  songInfo.genre_id = id;

  database('songs').insert(songInfo, 'id')
    .then(song => response.status(201).json({ id: song[0] }))
    .catch(error => console.error('error: ', error));
});

app.delete('/api/v1/genres/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('songs').where('genre_id', id).del()
    .then(() => {
      return database('genres').where('id', id).del()
    })
      .then(rows => response.sendStatus(204))
      .catch(error => response.sendStatus(500));
});

app.delete('/api/v1/songs/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('songs').where('id', id).del()
    .then(rows => response.sendStatus(204))
    .catch(error => {
      response.sendStatus(500)
    });
});

app.patch('/api/v1/genres/:id', checkAuth, (request, response) => {
  const genre = request.body;
  const { id } = request.params;

  database('genres').where('id', id).update(genre)
    .then(() => response.sendStatus(200))
    .catch(error => response.sendStatus(500))
});

app.patch('/api/v1/songs/:id', checkAuth, (request, response) => {
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
