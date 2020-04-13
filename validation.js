const errors = require('restify-errors');
const Joi = require('@hapi/joi');

const validId = function(data, res, next) {
  if(!data.match('/^[0-9a-fA-F]{24}$/')){
    return next(
      new errors.NotFoundError('data not found')
    );
  }
}

const login = function(data) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });

  return schema.validate(data);
}

const register = function(data) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password')
  });

  return schema.validate(data);
}

const forgot = function(data) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  });

  return schema.validate(data);
}

module.exports = {
  validId: validId,
  login: login,
  register: register,
  forgot: forgot
}