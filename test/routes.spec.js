process.env.NODE_ENV = 'test';

const chai = require('chai');

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "should" }]*/
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const configuration = require('../knexfile').test;
const database = require('knex')(configuration);


chai.use(chaiHttp);

describe('Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done();
        });
      });
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => {
      done();
    });
  });

  it('should return all genres', (done) => {
    chai.request(server)
      .get('/api/v1/genres')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.a('object');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('genre');
        response.body[0].should.have.property('link');
        response.body[0].should.have.property('description');
        done();
      });
  });

  it('should return all songs', (done) => {
    chai.request(server)
      .get('/api/v1/songs')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.a('object');
        response.body.should.be.a('array');
        response.body.length.should.be.above(80);
        response.body[1].should.have.property('id');
        response.body[1].id.should.be.a('number');
        response.body[1].should.have.property('artist');
        response.body[1].artist.should.be.a('string');
        response.body[1].should.have.property('title');
        response.body[1].title.should.be.a('string');
        response.body[1].should.have.property('service');
        response.body[1].service.should.equal('youtube');
        response.body[1].should.have.property('video');
        response.body[1].video.should.be.a('string');
        response.body[1].should.have.property('genre_id');
        response.body[1].genre_id.should.be.a('number');
        done();
      });
  });

  it('should return a 404 for a non-existent route', (done) => {
    chai.request(server)
    .get('/api/v1/hats')
    .end((error, response) => {
      response.should.have.status(404);
      done();
    });
  });

  it('should return a specific genre', (done) => {
    chai.request(server)
      .get('/api/v1/genres/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(1);
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(2);
        response.body[0].should.have.property('genre');
        response.body[0].genre.should.equal('House');
        response.body[0].should.have.property('link');
        response.body[0].link.should.equal('house');
        response.body[0].should.have.property('description');
        response.body[0].description.should.equal('Are you saying boots and cats? Probably house');
        done();
      });
  });

  it('should return a 404 if a specific genre is not found', (done) => {
    chai.request(server)
      .get('/api/v1/genres/12345567')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('should return all of the songs from a genre', (done) => {
    chai.request(server)
      .get('/api/v1/genres/2/songs')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.a('object');
        response.body.should.be.a('array');
        response.body.length.should.equal(7);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(9);
        response.body[0].should.have.property('artist');
        response.body[0].artist.should.equal('Galantis');
        response.body[0].should.have.property('title');
        response.body[0].title.should.equal('Runaway (U & I)');
        response.body[0].should.have.property('service');
        response.body[0].service.should.equal('youtube');
        response.body[0].should.have.property('video');
        response.body[0].video.should.equal('https://www.youtube.com/watch?v=szj59j0hz_4&index=10&list=RDQM5ky4ylTWJhQ');
        response.body[0].should.have.property('genre_id');
        response.body[0].genre_id.should.equal(2);
        done();
      });
  });

  it('should return a 404 if a genre does not have any songs', (done) => {
    chai.request(server)
      .get('/api/v1/genres/12/songs')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('There are no songs here. This could be either due to an incorrect genre id, or that the specified genre doesn\'t contain songs yet.');
        done();
      });
  });

  it('should return a song by ID', (done) => {
    chai.request(server)
      .get('/api/v1/songs/10')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.a('object');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(10);
        response.body[0].should.have.property('artist');
        response.body[0].artist.should.equal('Disclosure');
        response.body[0].should.have.property('title');
        response.body[0].title.should.equal('You and Me, Flume Remix');
        response.body[0].should.have.property('service');
        response.body[0].service.should.equal('youtube');
        response.body[0].should.have.property('video');
        response.body[0].video.should.equal('https://www.youtube.com/watch?v=_zPlr-o-YEQ');
        response.body[0].should.have.property('genre_id');
        response.body[0].genre_id.should.equal(2);
        done();
      });
  });

  it('should return a 404 if a song with request param id does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/songs/1000345')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('There are no songs that match this ID.');
        done();
      });
  });

  it('should allow a new genre to be posted', (done) => {
    chai.request(server)
      .post('/api/v1/genres')
      .set('authorization', process.env.TOKEN)
      .send({
        genre: 'Jumpstyle',
        link: 'jumpstyle',
        description: 'Like hardstyle, but less hard',
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.should.be.a('object');
        response.body.should.have.property('id');
        const targetId = response.body.id;
        chai.request(server)
        .get(`/api/v1/genres/${targetId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('genre');
          res.body[0].genre.should.equal('Jumpstyle');
          res.body[0].should.have.property('link');
          res.body[0].link.should.equal('jumpstyle');
          res.body[0].should.have.property('description');
          res.body[0].description.should.equal('Like hardstyle, but less hard');

          done();
        });
      });
  });

  it('should return a status 400 if insufficient data is passed to a genre post request', (done) => {
    chai.request(server)
      .post('/api/v1/genres')
      .set('authorization', process.env.TOKEN)
      .send({
        genre: 'Jumpstyle',
        link: 'jumpstyle',
      })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.error.should.equal('Make sure you have a genre, link, and description in your Genre post request.');
        done();
      });
  });

  it('should allow a new song to be posted to a genre', (done) => {
    chai.request(server)
      .post('/api/v1/genres/11/songs')
      .set('authorization', process.env.TOKEN)
      .send({
        title: 'The Story So Far',
        artist: 'Gareth Emery',
        service: 'youtube',
        video: 'www.youtube.com',
      })
      .end((error, response) => {
        response.should.have.status(201);
        const targetId = response.body.id;

        chai.request(server)
          .get(`/api/v1/songs/${targetId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].title.should.equal('The Story So Far');
            res.body[0].artist.should.equal('Gareth Emery');
            res.body[0].service.should.equal('youtube');
            res.body[0].video.should.equal('www.youtube.com');
            res.body[0].genre_id.should.equal(11);
            done();
          });
      });
  });

  it('should return an error 400 if insufficient data is passed to a song post', (done) => {
    chai.request(server)
      .post('/api/v1/genres/11/songs')
      .set('authorization', process.env.TOKEN)
      .send({
        title: 'bogus',
        artist: 'bogus',
      })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.error.should.equal('Make sure you have a title, artist, service, and video URL specified in your POST request.');
        done();
      });
  });

  it('should allow a song to be deleted', (done) => {
    chai.request(server)
      .delete('/api/v1/songs/83')
      .set('authorization', process.env.TOKEN)
      .end((error, response) => {
        response.should.have.status(204);
        chai.request(server)
          .get('/api/v1/songs/83')
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
  });

  it('should allow a genre and all its songs to be deleted', (done) => {
    chai.request(server)
      .delete('/api/v1/genres/11')
      .set('authorization', process.env.TOKEN)
      .end((error, response) => {
        response.should.have.status(204);
        chai.request(server)
          .get('/api/v1/genres/11')
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
  });

  it('should allow a genre edit', (done) => {
    chai.request(server)
      .patch('/api/v1/genres/11')
      .set('authorization', process.env.TOKEN)
      .send({
        genre: 'BOOM',
      })
      .end((error, response) => {
        response.should.have.status(201);
        chai.request(server)
          .get('/api/v1/genres/11')
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].genre.should.equal('BOOM');
            done();
          });
      });
  });

  it('should return an error 403 if someone tries to edit an existing genre\'s ID', (done) => {
    chai.request(server)
      .patch('/api/v1/genres/11')
      .set('authorization', process.env.TOKEN)
      .send({
        id: 5,
      })
      .end((error, response) => {
        response.should.have.status(403);
        response.body.error.should.equal('You may not edit an existing genre ID.');
        done();
      });
  });

  it('should allow a song edit', (done) => {
    chai.request(server)
      .patch('/api/v1/songs/83')
      .set('authorization', process.env.TOKEN)
      .send({
        artist: 'BOOM',
      })
      .end((error, response) => {
        response.should.have.status(201);
        chai.request(server)
          .get('/api/v1/songs/83')
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].artist.should.equal('BOOM');
            done();
          });
      });
  });

  it('should return an error 403 if someone tries to edit a song\'s ID', (done) => {
    chai.request(server)
      .patch('/api/v1/songs/83')
      .set('authorization', process.env.TOKEN)
      .send({
        id: 5,
      })
      .end((error, response) => {
        response.should.have.status(403);
        response.body.error.should.equal('You may not edit an existing song\'s IDs.');
        done();
      });
  });

  it('should allow a GET request with query params', () => {

  });
});
