const TokenController = require('./tokenController');
const UserController = require('./userController');

class Controllers {
  constructor() {
    this.tokenController = new TokenController();
    this.userController = new UserController();
  }

  getTokenController() {
    return this.tokenController;
  }

  getUserController() {
    return this.userController;
  }
}

module.exports = Controllers;
