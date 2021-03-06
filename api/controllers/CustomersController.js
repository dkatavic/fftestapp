/**
 * CustomersController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
  create: function (req, res) {
    var params = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_date: req.body.birth_date,
    };

    if (!params.first_name) {
      return res.status(400).json({
        message: 'Missing first_name parameter'
      });
    }
    if (!params.last_name) {
      return res.status(400).json({
        message: 'Missing last_name parameter'
      });
    }
    if (!params.birth_date) {
      return res.status(400).json({
        message: 'Missing birth_date parameter'
      });
    }

    CustomersService.create(params)
    .then((customer) => {
      return res.status(201).json(customer);
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.statusCode || 400).json({
        message: err.message
      });
    });
  },
  
  edit: function (req, res) {
    var params = {
      id: req.params.id,
      newValues: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
      }
    };

    if (!params.id) {
      return res.status(400).json({
        message: 'Missing id parameter'
      });
    }

    CustomersService.edit(params)
    .then((customer) => {
      return res.json(customer);
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.statusCode || 400).json({
        message: err.message
      });
    });
  },
  
  delete: function (req, res) {
    var params = {
      id: req.params.id,
    };

    if (!params.id) {
      return res.status(400).json({
        message: 'Missing id parameter'
      });
    }

    CustomersService.delete(params)
    .then((customer) => {
      return res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.statusCode || 400).json({
        message: err.message
      });
    });
  },

  get: function(req, res) {
    var params = {
      id: req.params.id,
    };

    if (!params.id) {
      return res.status(400).json({
        message: 'Missing id parameter'
      });
    }
    
    CustomersService.get(params)
    .then((customer) => {
      return res.status(200).json(customer);
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.statusCode || 400).json({
        message: err.message
      });
    });
  },
  
  list: function (req, res) {
    var params = {
      sortBy: req.query.sortBy,
    };
    
    CustomersService.list(params)
    .then((customers) => {
      return res.status(200).json(customers);
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.statusCode || 400).json({
        message: err.message
      });
    });
  }
};

