const express = require('express');
const expressLocale = require('express-locale');
const { jwt } = require('./../utils/auth');

const emailController = require('./../controllers/emailController');
const loginController = require('./../controllers/loginController');
const userController = require('./../controllers/user/userController');

const userRouter = express.Router();

/**
  Publicly available user routes
**/

userRouter.route('/register')
  .post(
    userController.register,
    emailController.sendRegistrationEmail,
    userController.returnUser
  );

userRouter.route('/verify/:verificationToken')
  .post(
    userController.verify,
    emailController.sendWelcomeEmail,
    userController.returnSuccess
  );

userRouter.route('/login')
  .post(
    loginController.localLogin,
    jwt.returnToken({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    })
  );

userRouter.route('/request-reset')
  .post(
    userController.generateResetToken,
    emailController.sendForgotPasswordEmail,
    userController.returnSuccess
  );

userRouter.route('/reset/:resetToken')
  .post(
    userController.reset,
    userController.returnSuccess
  );

userRouter.route('/locale')
  .get(
    expressLocale(),
    userController.getLocaleInfo,
    userController.returnLocaleInfo
  );

/**
  User routes that require an access token
**/

userRouter.use(
  jwt.authenticate({
    publicKey: process.env.FIREBASE_PUBLIC_KEY
  })
);

userRouter.route('/')
  .get(
    userController.loadUser,
    userController.returnUser
  );

userRouter.route('/change-password')
  .post(
    userController.loadUser,
    userController.changePassword,
    userController.returnSuccess
  );

module.exports = userRouter;
