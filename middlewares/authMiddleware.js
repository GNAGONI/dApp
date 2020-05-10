const decode = require('jwt-decode');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['auth-token'];
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

module.exports = authenticate;
