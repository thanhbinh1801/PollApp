import { Router } from 'express'
import userController from '../controllers/user.controller.js';
import userService from '../services/user.service.js';
import User from '../models/user_models.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import Validate from '../middlewares/validate.js';
import AuthValidator from '../validators/Auth.validate.js';

class UserRouter {
  constructor() {
    this.router = Router();
    this.userController = new userController( new userService(User));
    this.authValidator = new AuthValidator();
    this.setupRoutes();

  }
  setupRoutes() {
    this.router.get('/me', Validate(this.authValidator.checkAuth), asyncHandler(this.userController.getMe));
    this.router.get('/', Validate(this.authValidator.checkAuth), asyncHandler(this.authValidator.checkAdmin), asyncHandler(this.userController.getAllUsers));
    this.router.get('/:id', Validate(this.authValidator.checkAuth), asyncHandler(this.authValidator.checkAdmin), asyncHandler(this.userController.getUserByID));
    this.router.put('/:id', Validate(this.authValidator.checkAuth), asyncHandler(this.userController.updateUser));
    this.router.delete('/:id', Validate(this.authValidator.checkAuth), asyncHandler(this.authValidator.checkAdmin), asyncHandler(this.userController.deleteUser));
  }
  getRouter() {
    return this.router;
  }
}

export default UserRouter;