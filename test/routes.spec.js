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
        response.body.length.should.equal(10);
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
});