// CustomersService.test.js

var expect = require('chai').expect;
var faker = require('faker');
var moment = require('moment');

describe('CustomersService', function() {

  before(function() {
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

      CustomersService.edit({
        id: customerToEdit.id,
        newValues: {
          first_name: newfirstName
        }
      })
      .then((editedCustomers) => {
        expect(editedCustomers[0].first_name).to.equal(newfirstName);
        return Customers.findOne({ id: customerToEdit.id }); 
      })
      .then((customerInst) => {
        expect(customerInst.first_name).to.equal(newfirstName);
        done();
      }).catch(done);

    });

  });

  describe('delete', function() {

    it('Should delete customer');

  });

});
