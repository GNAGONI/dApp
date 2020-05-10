const express = require('express');
const tokenController = require('../controllers/tokenController');
const tokenValidation = require('../validations/tokenValidation');

const tokenRouter = express.Router();

tokenRouter.get('/getAll', tokenController.getAll);
tokenRouter.post(
  '/create',
  tokenValidation.validate('createToken'),
  tokenController.createToken,
);
tokenRouter.get(
  '/getData',
  tokenValidation.validate('getData'),
  tokenController.getData,
);
tokenRouter.get(
  '/getBalance',
  tokenValidation.validate('getBalance'),
  tokenController.getBalance,
);
tokenRouter.post(
  '/sendTokens',
  tokenValidation.validate('sendTokens'),
  tokenController.sendTokens,
);
tokenRouter.get(
  '/getDataByProject',
  tokenValidation.validate('getDataByProject'),
  tokenController.getDataByProject,
);

module.exports = tokenRouter;
