// CustomersService.test.js

var expect = require('chai').expect;
var faker = require('faker');

describe('CustomersService', function() {

  beforeEach(function() {
    return Customers.destroy({}).then(() => {});
  });

  describe('list', function() {

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

  describe('create', function() {

    var customerToCreate = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      birth_date: faker.date.past()
    }

    it('Should create customer', (done) => {

      CustomersService.create(customerToCreate)
      .then((createdCustomer) => {
        expect(createdCustomer.first_name).to.equal(customerToCreate.first_name);
        expect(createdCustomer.last_name).to.equal(customerToCreate.last_name);
        expect(createdCustomer.id).to.exist;
        return Customers.findOne(createdCustomer.id);
      })
      .then((customerInst) => {
        expect(customerInst.first_name).to.equal(customerToCreate.first_name);
        expect(customerInst.last_name).to.equal(customerToCreate.last_name);
        done();
      }).catch(done);

    });

  });

  describe('edit', function() {

    it('Should edit customer');

  });

  describe('delete', function() {

    it('Should delete customer');

  });

});
