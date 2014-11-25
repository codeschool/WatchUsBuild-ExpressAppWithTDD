var request = require('supertest');
var app = require('./app');

describe('Requests to the root path', function() {

  it('Returns a 200 status code', function(done) {

    request(app)
      .get('/')
      .expect(200, done);

  });

  it('Returns a HTML format', function(done) {

    request(app)
      .get('/')
      .expect('Content-Type', /html/, done);
  });

  it('Returns an index file with Cities', function(done) {

    request(app)
      .get('/')
      .expect(/cities/i, done);

  });

});

describe('Listing cities on /cities', function(){

  it('Returns 200 status code', function(done){

    request(app)
      .get('/cities')
      .expect(200, done);

  });

  it('Returns JSON format', function(done) {

    request(app)
      .get('/cities')
      .expect('Content-Type', /json/, done);

  });

  it('Returns initial cities', function(done) {

    request(app)
      .get('/cities')
      .expect(JSON.stringify(['Lotopia', 'Caspiana', 'Indigo']), done);
  });
});


