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


  /**
   * `CustomersController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `CustomersController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },


  /**
   * `CustomersController.list()`
   */
  list: function (req, res) {
    return res.json({
      todo: 'list() is not implemented yet!'
    });
  }
};

