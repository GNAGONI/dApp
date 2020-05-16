const express = require('express');
const Controller = require('../controllers');

class UserRouter {
  constructor() {
    const controller = new Controller();
    this.userController = controller.getUserController();
    this.userRouter = express.Router();
    this.userRouter.get('/getAll', this.userController.getAll());
  }

  getUserRouter() {
    return this.userRouter;
  }
}

module.exports = UserRouter;
