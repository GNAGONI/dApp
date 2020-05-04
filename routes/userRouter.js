const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/getAll', userController.getAll);

module.exports = userRouter;
