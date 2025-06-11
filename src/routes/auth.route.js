import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthService from '../services/auth.service.js';
import User from '../models/user_models.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import Validate from '../middlewares/validate.js';
import AuthValidator from '../validators/Auth.validate.js';
import UserValidator from '../validators/User.validate.js';

class AuthRouter {
  constructor(){
    this.router = Router();
    this.authService = new AuthService(User);
    this.authController = new AuthController(this.authService);
    this.AuthValidator = new AuthValidator();
    this.UserValidator = new UserValidator();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post('/login', 
      Validate(this.UserValidator.loginValidate),
      asyncHandler(this.authController.login)
    );

    this.router.post('/register', 
      Validate(this.UserValidator.registerValidate),
      asyncHandler(this.authController.register)
    );

    this.router.post('/logout', 
      Validate(this.AuthValidator.checkAuth),
      asyncHandler(this.authController.logout)
    );

    this.router.post('/refresh-token', 
      asyncHandler(this.authController.refreshToken)
    );
  }
  getRouter() {
    return this.router;
  }
}

export default AuthRouter;