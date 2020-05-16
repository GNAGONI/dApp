const decode = require('jwt-decode');

class AuthMiddleware {
  constructor() {
    this.authHeaderName = 'auth-token';
  }

  authenticate() {
    return (req, res, next) => {
      try {
        const authHeader = req.headers[this.authHeaderName];
        if (authHeader) {
          const token = authHeader;
          const user = decode(token);
          req.user = user;
          next();
        } else {
          res.sendStatus(401);
        }
      } catch (e) {
        res.sendStatus(401);
      }
    };
  }
}

module.exports = AuthMiddleware;
