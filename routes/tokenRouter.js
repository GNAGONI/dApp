const express = require('express');
const tokenController = require('../controllers/tokenController.js');

const tokenRouter = express.Router();

tokenRouter.post(
  '/create',
  tokenController.validate('createToken'),
  tokenController.createToken,
);

module.exports = tokenRouter;
