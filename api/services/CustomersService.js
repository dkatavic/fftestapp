// CustomersService.js

var moment = require('moment');

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

    return Customers.update({ id: params.id }, params.newValues);
  },

  delete: (params) => {
    if (!params.id) {
      throw new Error("Missing params.id");
    }
    return Customers.destroy(params.id);
  }

};
