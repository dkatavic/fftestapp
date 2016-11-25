// CustomersController.test.js

var expect = require('chai').expect;
var request = require('supertest');
var faker = require('faker');
var moment = require('moment');

describe('CustomersController', function() {

  before(function() {
    return Customers.destroy({}).then(() => {});
  });

  describe('GET /customers', function() {

    var tests = [{
      sortBy: 'first_name'
    },{
      sortBy: 'last_name'
    },{
      sortBy: 'created_at'
    }];

    it('Should list all customers');

    tests.forEach((test) => {
      it(`Should list all customers sorted by ${test.sortBy}`);
    });

  });

  describe('POST /customer', function() {

    var customerToCreate;

    before((done) => {
      var birthDayFormat = sails.config.app_data.customersBirthdayFormat;
      var birthDay = moment(faker.date.past()).format(birthDayFormat);

      customerToCreate = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birth_date: birthDay
      };
      done();
    });

    it('Shold create customer', (done) => {

      request(sails.hooks.http.app)
        .post('/customer')
        .send({
          first_name: customerToCreate.first_name,
          last_name: customerToCreate.last_name,
          birth_date: customerToCreate.birth_date
        })
        .expect(201)
        .end(function(err, data) {
          if (err) {
            return done(err);
          }
          expect(data.body.id).to.be.a('number');
          expect(data.body.first_name).to.equal(customerToCreate.first_name);
          expect(data.body.last_name).to.equal(customerToCreate.last_name);
          expect(data.body.birth_date).to.equal(customerToCreate.birth_date);
          done();
        });

    });

  });

  describe('DELETE /customer/:id', function() {

    it('Should delete customer');

  });

  describe('PUT /customer/:id', function() {

    it('Should edit customer');

  });

  describe('GET /customer/:id', function() {

    it('Should get customer with a joke');

  });

});
