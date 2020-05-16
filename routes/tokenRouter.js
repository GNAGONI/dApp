const express = require('express');
const tokenController = require('../controllers/tokenController');
const Validator = require('../validations/tokenValidation');

class TokenRouter {
  constructor() {
    this.tokenRouter = express.Router();
    this.validator = new Validator();
    this.tokenRouter.get('/getAll', tokenController.getAll);
    this.tokenRouter.post(
      '/create',
      this.validator.validate('createToken'),
      tokenController.createToken,
    );
    this.tokenRouter.get(
      '/getData',
      this.validator.validate('getData'),
      tokenController.getData,
    );
    this.tokenRouter.get(
      '/getBalance',
      this.validator.validate('getBalance'),
      tokenController.getBalance,
    );
    this.tokenRouter.post(
      '/sendTokens',
      this.validator.validate('sendTokens'),
      tokenController.sendTokens,
    );
    this.tokenRouter.get(
      '/getDataByProject',
      this.validator.validate('getDataByProject'),
      tokenController.getDataByProject,
    );
  }

  getTokenRouter() {
    return this.tokenRouter;
  }
}

module.exports = TokenRouter;
