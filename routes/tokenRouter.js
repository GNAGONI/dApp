const express = require('express');
const Controller = require('../controllers');
const Validator = require('../validations/tokenValidation');

class TokenRouter {
  constructor() {
    const controller = new Controller();
    this.tokenController = controller.getTokenController();
    this.tokenRouter = express.Router();
    this.validator = new Validator();

    this.tokenRouter.get('/getAll', this.tokenController.getAll());
    this.tokenRouter.post(
      '/create',
      this.validator.validate('createToken'),
      this.tokenController.createToken(),
    );
    this.tokenRouter.get(
      '/getData',
      this.validator.validate('getData'),
      this.tokenController.getData(),
    );
    this.tokenRouter.get(
      '/getBalance',
      this.validator.validate('getBalance'),
      this.tokenController.getBalance(),
    );
    this.tokenRouter.post(
      '/sendTokens',
      this.validator.validate('sendTokens'),
      this.tokenController.sendTokens(),
    );
    this.tokenRouter.get(
      '/getDataByProject',
      this.validator.validate('getDataByProject'),
      this.tokenController.getDataByProject(),
    );
  }

  getTokenRouter() {
    return this.tokenRouter;
  }
}

module.exports = TokenRouter;
