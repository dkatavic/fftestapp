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
      sortBy: 'birth_date'
    }];
    var customers = [];

    before(() => {
      let birthDayFormat = sails.config.app_data.customersBirthdayFormat;
      let promises;

      for (let i = 0; i < 10; i++) {
        let birthDay = moment(faker.date.past()).format(birthDayFormat);
        customers.push({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          birth_date: birthDay
        });
      }
      
      promises = customers.map(el => Customers.create(el));

      return Promise.all(promises);
    });

    it('Should list all customers', (done) => {

      request(sails.hooks.http.app)
        .get(`/customers`)
        .expect(200)
        .end(function(err, data) {
          if (err) {
            return done(err);
          }
          expect(data.body.length).to.equal(customers.length);
          done();
        });

    });

    tests.forEach((test) => {
      it(`Should list all customers sorted by ${test.sortBy}`, (done) => {

        request(sails.hooks.http.app)
        .get(`/customers`)
        .query({ sortBy: test.sortBy })
        .expect(200)
        .end(function(err, data) {
          if (err) {
            return done(err);
          }
          expect(data.body.length).to.equal(customers.length);
          done();
        });

      });
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

    var customerToDelete;

    before((done) => {
      var birthDayFormat = sails.config.app_data.customersBirthdayFormat;
      var birthDay = moment(faker.date.past()).format(birthDayFormat);

      customerToDelete = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birth_date: birthDay
      };
      Customers.create(customerToDelete)
      .then((_cust) => {
        customerToDelete.id = _cust.id;
        done();
      }).catch(done);
    });

    it('Should delete customer', (done) => {

      request(sails.hooks.http.app)
        .delete(`/customer/${customerToDelete.id}`)
        .expect(204)
        .end(done);

    });

  });

  describe('PUT /customer/:id', function() {

    var customerToEdit;

    before((done) => {
      var birthDayFormat = sails.config.app_data.customersBirthdayFormat;
      var birthDay = moment(faker.date.past()).format(birthDayFormat);

      customerToEdit = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birth_date: birthDay
      };
      Customers.create(customerToEdit)
      .then((_cust) => {
        customerToEdit.id = _cust.id;
        done();
      }).catch(done);
    });

    it('Should edit customer', (done) => {

      var newfirstName = faker.name.firstName();

      request(sails.hooks.http.app)
        .put(`/customer/${customerToEdit.id}`)
        .send({
          first_name: newfirstName
        })
        .expect(200)
        .end(function(err, data) {
          if (err) {
            return done(err);
          }
          expect(data.body.first_name).to.equal(newfirstName);
          done();
        });

    });

  });

  describe('GET /customer/:id', function() {

    var customerToCreate;

    before((done) => {
      var birthDayFormat = sails.config.app_data.customersBirthdayFormat;
      var birthDay = moment(faker.date.past()).format(birthDayFormat);

      customerToCreate = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birth_date: birthDay
      };
      Customers.create(customerToCreate)
      .then((_cust) => {
        customerToCreate.id = _cust.id;
        done();
      }).catch(done);
    });

    it('Should get customer with a joke', (done) => {

      request(sails.hooks.http.app)
        .get(`/customer/${customerToCreate.id}`)
        .expect(200)
        .end(function(err, data) {
          if (err) {
            return done(err);
          }
          expect(data.body.id).to.equal(customerToCreate.id);
          expect(data.body.first_name).to.equal(customerToCreate.first_name);
          expect(data.body.last_name).to.equal(customerToCreate.last_name);
          expect(data.body.birth_date).to.equal(customerToCreate.birth_date);
          expect(data.body.joke).to.be.a('String');
          done();
        });

    });

  });

});
