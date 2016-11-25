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

    it('Should list all customers', () => {

      return CustomersService.list()
      .then((_customers) => {
        expect(_customers.length).to.equal(customers.length);
      });

    });

    tests.forEach((test) => {

      it(`Should list all customers sorted by ${test.sortBy}`, () => {

        var sortKey = test.sortBy;

        return CustomersService.list({ sortBy: sortKey })
        .then((_customers) => {
          let prevValue = "";
          expect(_customers.length).to.equal(customers.length);
          _customers.forEach((cust) => {
            expect(cust[sortKey]).to.be.at.least(prevValue);
            prevValue = cust[sortKey];
          });
        });

      });

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

    it('Should delete customer', function(done) {

      CustomersService.delete({
        id: customerToDelete.id
      })
      .then(() =>  Customers.findOne({ id: customerToDelete.id }))
      .then((customerInst) => {
        expect(customerInst).to.not.exist;
        done();
      }).catch(done);

    });

  });

  describe('get', function() {

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

      Customers.get({ id: customerToCreate.id })
      .then((_customer) => {
        var nameRegExp;
        expect(_customer.id).to.equal(customerToCreate.id);
        expect(_customer.joke).to.be.a('String');
        nameRegExp = new RegExp(_customer.first_name, "i");
        expect(_customer.joke).to.match(nameRegExp);
        done();
      }).catch(done);

    });

  });

});
