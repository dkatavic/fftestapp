// CustomersService.js

var moment = require('moment');
var _ = require('lodash');
var request = require('request-promise');

module.exports = {

  create: (params) => {
    var birthDayFormat = sails.config.app_data.customersBirthdayFormat;

    if (!params.first_name) {
      throw new Error("Missing params.first_name");
    }
    if (!params.last_name) {
      throw new Error("Missing params.last_name");
    }
    if (!params.birth_date) {
      throw new Error("Missing params.birth_date");
    }
    if(!moment(params.birth_date, birthDayFormat, true).isValid()) {
      return Promise.reject({
        message: `Invalid birth data ${params.birth_date}, it should be in format ${birthDayFormat}`
      });
    }

    return Customers.create({
      first_name: params.first_name,
      last_name: params.last_name,
      birth_date: params.birth_date
    });
  },

  edit: (params) => {
    var newValues = {};
    if (!params.id) {
      throw new Error("Missing params.id");
    }
    if (!params.newValues) {
      throw new Error("Missing params.newValues");
    }
    if (Object.keys(params.newValues).length === 0) {
      return Promise.reject({
        message: "There should be at least 1 value in params.newValues"
      });
    }
    
    if (params.newValues.first_name) {
      newValues.first_name = params.newValues.first_name;
    }
    if (params.newValues.last_name) {
      newValues.last_name = params.newValues.last_name;
    }
    if (params.newValues.birth_date) {
      newValues.birth_date = params.newValues.birth_date;
    }

    return Customers.update({ id: params.id }, newValues)
    .then((customers) => customers[0]);
  },

  delete: (params) => {
    if (!params.id) {
      throw new Error("Missing params.id");
    }
    return Customers.destroy(params.id);
  },

  list: (params) => {
    return Customers.find()
    .then(customers => {
      if (!params || !params.sortBy) {
        return customers;
      }
      return _.sortBy(customers, params.sortBy);
    })
  },

  get: (params) => {
    var customer;

    if (!params.id) {
      throw new Error("Missing params.id");
    }

    return Customers.findOne(params.id)
    .then((_customer) => {
      customer = _customer;

      var reqOpts = {
        url: sails.config.app_data.jokeUrl,
        qs: {
          firstName: customer.first_name
        }
      };

      return request(reqOpts);
    })
    .then((jokeResp) => {
      var jokeData = JSON.parse(jokeResp);
      if (jokeData.type == "success") {
        customer.joke = jokeData.value.joke;
      }
      return customer;
    })
  }

};
