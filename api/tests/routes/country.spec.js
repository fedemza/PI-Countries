/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const supertest = require("supertest");
var request = require('supertest');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    //.then(() => Country.create(pokemon))
    );
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
 
});

describe("GET /countries/:idPais", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/countries/ARG")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});



describe("GET /wrong page", function() {
  it("it should has status code 404", function(done) {
    supertest(app)
      .get("/country")
      .expect(404)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("POST /activity", function() {
  it('should respond with status 200', function(done) {
    request(app)
      .post('/activity')
      .send({"name":"Basquet","duration":"35 mins","difficulty":"4","season":'Verano',"countries":['Argentina','Brazil']})
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);

      });
      done();
  });
});


