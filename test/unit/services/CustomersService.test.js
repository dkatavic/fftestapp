// CustomersService.test.js

var expect = require('chai').expect;

describe('CustomersService', function() {

  describe('listCustomers', function() {

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

  describe('createCustomer', function() {

    it('Should create customer');

  });

  describe('editCustomer', function() {

    it('Should edit customer');

  });

  describe('deleteCustomer', function() {

    it('Should delete customer');

  });

});
