const AuthMiddleware = require('./authMiddleware');

class Middlewares {
  constructor() {
    this.authMiddleware = new AuthMiddleware();
  }

  getAuthMiddleware() {
    return this.authMiddleware;
  }
}

module.exports = Middlewares;
