const { Country,Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });

});

//////////

describe('Activity Model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Activity.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Activity.create({ name: 'Tenis' });
      });
      it('should throw an error if difficulty is other than 1, 2, 3, 4 or 5', (done) => {
        Activity.create({ name: 'Tenis', difficulty: '6' })
          .then(() => done(new Error('It requires a valid difficulty')))
          .catch(() => done());
      })
      it('should work when its a valid info', () => {
        Activity.create({ name: 'Tenis', difficulty: '2' ,season:'Verano',countries:['Argentina','Brazil']});
      });
    });
  });
})
