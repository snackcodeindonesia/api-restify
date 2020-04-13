const fs = require('fs');
const dotenv = require('dotenv').config();
const API = dotenv.parsed.API;

let controllers = {}
let controllers_path = process.cwd() + '/controllers';

fs.readdirSync(controllers_path).forEach(function (file) {
  if (file.indexOf('.js') != -1) {
    controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
  }
});

const server = function(route) {
  route.get('/', function(req, res) {
    res.send('Welcome to restify');
  });
  
  route.post(`${API}login`, controllers.AuthController.login);
  route.post(`${API}register`, controllers.AuthController.register);
  route.post(`${API}forgot`, controllers.AuthController.forgot);

  route.get(`${API}users`, controllers.UsersController.get);
  route.get(`${API}users/:id`, controllers.UsersController.getById);
  route.del(`${API}users/:id`, controllers.UsersController.remove);
}

module.exports = server;

