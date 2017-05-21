const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Routes', () => {
  it('should return all genres', (done) => {
    chai.request(server)
      .get('/api/v1/genres')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
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

  it('should return a 404 for a non-existent route', (done) => {
    chai.request(server)
      .get('/api/v1/hats')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('should return all songs', (done) => {
    chai.request(server)
      .get('/api/v1/songs')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[1].should.have.property('id');
        response.body[1].should.have.property('artist');
        response.body[1].should.have.property('title');
        response.body[1].should.have.property('service');
        response.body[1].service.should.equal('youtube');
        response.body[1].should.have.property('video');
        response.body[1].should.have.property('genre_id');
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
  
  it('should return all of the songs from a genre', (done) => {
    chai.request(server)
      .get('/api/v1/genres/2/songs')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.length.should.equal(7);
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('artist');
        response.body[0].should.have.property('title');
        response.body[0].should.have.property('service');
        response.body[0].should.have.property('video');
        response.body[0].should.have.property('genre_id');
        done();
      });
  });

  it('should return a song by ID', (done) => {
    chai.request(server)
      .get('/api/v1/songs/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(2);
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
  
  it('should allow a new genre to be posted', (done) => {
    chai.request(server)
      .post('/api/v1/genres')
      .send({
        genre: 'Jumpstyle',
        link: 'jumpstyle',
        description: 'Like hardstyle, but less hard',
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.have.property('id');
        let targetId = response.body.id;
        chai.request(server)
        .get(`/api/v1/genres/${targetId}`)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('genre');
          response.body[0].genre.should.equal('Jumpstyle');
          response.body[0].should.have.property('link');
          response.body[0].link.should.equal('jumpstyle');
          response.body[0].should.have.property('description');
          response.body[0].description.should.equal('Like hardstyle, but less hard');

          done();
        });
      });
  });

  it('should allow a new song to be posted', (done) => {
    chai.request(server)
      .post('/api/v1/genres/')
      .send({
        genre: 'Jumpstyle',
        link: 'jumpstyle',
        description: 'Like hardstyle, but less hard',
      })
      .end((error, response) => {
        response.should.have.status(201);
        const targetId = response.body.id;

        chai.request(server)
        .post(`/api/v1/genres/${targetId}/songs`)
        .send({
          artist: 'Ricardo',
          title: 'VdV',
          service: 'youtube',
          video: 'youtube.com',
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.have.property('id');

          const targetSong = response.body.id;

          chai.request(server)
          .get(`/api/v1/songs/${targetSong}`)
          .end((error, response) => {
            response.should.have.status(200);
            response.body[0].should.have.property('id');
            response.body[0].should.have.property('artist');
            response.body[0].artist.should.equal('Ricardo');
            response.body[0].should.have.property('title');
            response.body[0].title.should.equal('VdV');
            response.body[0].should.have.property('service');
            response.body[0].service.should.equal('youtube');
            response.body[0].should.have.property('video');
            response.body[0].video.should.equal('youtube.com');
            done();
          });
        });
      });
  });

  it('should allow a song to be deleted', (done) => {
    chai.request(server)
      .post('/api/v1/genres')
      .send({
        genre: 'Jumpstyle',
        link: 'jumpstyle',
        description: 'Like hardstyle, but less hard',
      })
      .end((error, response) => {
        response.should.have.status(201);

        const targetId = response.body.id;

        chai.request(server)
        .post(`/api/v1/genres/${targetId}/songs`)
        .send({
          artist: 'Ricardo',
          title: 'VdV',
          service: 'youtube',
          video: 'youtube.com',
        })
        .end((error, response) => {
          response.should.have.status(201);

          const targetSong = response.body.id;

          chai.request(server)
          .delete(`/api/v1/songs/${targetSong}`)
          .end((error, response) => {
            response.should.have.status(204);

            chai.request(server)
            .get(`/api/v1/songs${targetSong}`)
            .end((error, response) => {
              response.should.have.status(404);
              done();
            });
          });
        });
      });
  });

  it('should allow a genre and all its songs to be deleted', (done) => {
    chai.request(server)
      .post('/api/v1/genres')
      .send({
        genre: 'Jumpstyle',
        link: 'jumpstyle',
        description: 'Like hardstyle, but less hard',
      })
      .end((error, response) => {
        response.should.have.status(201);

        const targetId = response.body.id;

        chai.request(server)
        .post(`/api/v1/genres/${targetId}/songs`)
        .send({
          artist: 'Ricardo',
          title: 'VdV',
          service: 'youtube',
          video: 'youtube.com',
        })
        .end((error, response) => {
          response.should.have.status(201);

          // const targetSong = response.body.id;

          chai.request(server)
          .delete(`/api/v1/genres/${targetId}`)
          .end((error, response) => {
            response.should.have.status(204);

            chai.request(server)
            .get(`/api/v1/genres/${targetId}`)
            .end((error, response) => {
              response.should.have.status(404);
              done();
            });
          });
        });
      });
  });

  it('should allow a genre edit', () => {
    
  });
  
  it('should allow a song edit', () => {
    
  });
});