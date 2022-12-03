const express = require('express');
const userRouter = express.Router();

const userCtrl = require('../controllers/userController');

userRouter.post('/signup',userCtrl.signup);
userRouter.post('/login',userCtrl.login);

module.exports=userRouter;