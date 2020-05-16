const express = require('express');
const tokenController = require('../controllers/tokenController');
const Validator = require('../validations/tokenValidation');

const tokenRouter = express.Router();
const validator = new Validator();

tokenRouter.get('/getAll', tokenController.getAll);
tokenRouter.post(
  '/create',
  validator.validate('createToken'),
  tokenController.createToken,
);
tokenRouter.get(
  '/getData',
  validator.validate('getData'),
  tokenController.getData,
);
tokenRouter.get(
  '/getBalance',
  validator.validate('getBalance'),
  tokenController.getBalance,
);
tokenRouter.post(
  '/sendTokens',
  validator.validate('sendTokens'),
  tokenController.sendTokens,
);
tokenRouter.get(
  '/getDataByProject',
  validator.validate('getDataByProject'),
  tokenController.getDataByProject,
);

module.exports = tokenRouter;
