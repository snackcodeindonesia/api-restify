const errors = require('restify-errors');
const User = require('../models/User'); 
const {validId} = require('../validation');
var _ = require('lodash');

class UsersController {

  get(req, res, next){
    User.find().then(data => {
      if(_.isEmpty(data)){
        return next(
          new errors.NotFoundError('User not result')
        );
      }

      res.send(201, {
        status: true,
        data: data
      });
    });
  }

  async getById(req, res, next){
    await validId(req.params.id);

    User.findById({_id: req.params.id})
    .then(data => {
      if(_.isEmpty(data)){
        return next(
          new errors.NotFoundError('User not found')
        );
      }
      
      res.send(201, {
        status: true,
        data: data
      });
    });
  }

  remove(req, res, next){
    User.findByIdAndDelete({_id: req.params.id}, {
      $set: {
        deletedAt: Date.now()
      }    
    }).then(data => {
      if(_.isEmpty(data)){
        return next(
          new errors.NotFoundError('Remove user failed')
        );
      }
      res.send(201, {
        status: true,
        message: `Remove user success`
      });
    });
  }
}

module.exports = new UsersController;