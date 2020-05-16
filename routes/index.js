const TokenRouter = require('./tokenRouter');
const UserRouter = require('./userRouter');

class Router {
  constructor() {
    this.tokenRouter = new TokenRouter();
    this.userRouter = new UserRouter();
  }

  getUserRouter() {
    return this.userRouter;
  }

  getTokenRouter() {
    return this.tokenRouter;
  }
}

module.exports = Router;
