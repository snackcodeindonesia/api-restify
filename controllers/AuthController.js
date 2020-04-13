const errors = require('restify-errors');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/User'); 
const {sendgrid} = require('../lib/email');
const { login, register, forgot } = require('../validation')


class AuthController{

	async login(req, res, next){
		if(!req.is('application/json')){
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
    }

    const {error} = await login(req.body)
    if (error) {
      return next(
				new errors.NotFoundError(error.details[0].message)
			);
    }
    
    res.send(202,req.body);
	}

	async register(req, res, next){
		if(!req.is('application/json')){
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
    }
    
    const {error} = await register(req.body);
    if (error) {
      return next(
				new errors.NotFoundError(error.details[0].message)
			);
    }

    const email = await User.findOne({email: req.body.email}).exec();
    if(email){
      return next(
				new errors.NotFoundError("This email already exist")
			);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      createdAt: Date.now()
    }); 	

    await user.save(function(err) {
      if(err){
        return next(
          new errors.InternalError(err.message)
        );
      }
    });

    //send mail
    await sendgrid(req.body.email);
    res.send(201, {
      status: true,
      message: "Register success, please check you email to activation account, thanks"
    });
  }
	
	async forgot(req, res, next){
    if(!req.is('application/json')){
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
    }

    const {error} = await forgot(req.body)
    if (error) {
      return next(
				new errors.NotFoundError(error.details[0].message)
			);
    }

    const email = await User.find({'email': req.body.email}).exec();
    if(!email){
      res.send(404, {
        status: false,
        message: "This email not already"
      });
    }

    res.send(200, {
      status: true,
      message : `Send email to ${req.body.email} success, Please check you email to create new password, thanks`
    });
	}
}

module.exports = new AuthController;