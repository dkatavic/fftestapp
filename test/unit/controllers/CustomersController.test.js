// CustomersController.test.js

var expect = require('chai').expect;
var request = require('supertest');

describe('CustomersController', function() {

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

    it('Shold create customer');

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
