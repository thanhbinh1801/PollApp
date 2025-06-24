import { OK, CREATED } from '../handler/success.reponse.js';

export default class UserController {
  constructor(userService){
    this.userService = userService;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      console.log("App rebuilt by CI/CD at " + new Date());
      new OK({
        message: "Users retrieved successfully",
        metadata: users
      }).send(res);
    } catch(error){
      next(error);
    }
  }

  getUserByID = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserByID(userId);
      new OK({
        message: "User retrieved successfully",
        metadata: user
      }).send(res);
    } catch(error){
      next(error);
    }
  }

  updateUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const data = req.body;
      const user = await this.userService.updateUser(userId, data);
      new OK({
        message: "User updated successfully",
        metadata: user
      }).send(res);
    } catch(error){
      next(error);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.deleteUser(userId);
      new OK({
        message: "User deleted successfully"
      }).send(res);
    } catch(error){
      next(error);
    }
  }

  getMe = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        console.log("User ID from token:", userId);
        const userData = await this.userService.getMe(userId);
        new OK({
            message: "Get user info successfully",
            metadata: userData
        }).send(res);
    } catch (error) {
        next(error);
    }
  }
}
