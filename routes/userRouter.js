const express = require('express');
const userController = require('../controllers/userController');

class UserRouter {
  constructor() {
    this.userRouter = express.Router();
    this.userRouter.get('/getAll', userController.getAll);
  }

  getUserRouter() {
    return this.userRouter;
  }
}

module.exports = UserRouter;
