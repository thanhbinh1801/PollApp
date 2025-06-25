import { NotFoundError } from '../handler/error.reponse.js';
import HashService from '../utils/HashService.js';

export default class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async getAllUsers() {
    const users = await this.UserModel.find({});
    if (!users || users.length === 0) {
      throw new NotFoundError("No users found");
    }
    const userData = users.map( user => {
      const{ password, ...rest} = user.toObject();
      return rest;
    })
    return userData;
  }

  async getUserByID(userId) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async updateUser(userId, data) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const dataUpdate = {
      username: data.username !== undefined ? data.username : user.username,
      name: data.name !== undefined ? data.name : user.name,
      age: data.age !== undefined ? data.age : user.age,
      gender: data.gender !== undefined ? data.gender : user.gender,
      email: data.email !== undefined ? data.email : user.email,
      phone: data.phone !== undefined ? data.phone : user.phone,
    };

    if (data.password !== undefined) {
      dataUpdate.password = await HashService.hashPW(data.password);
    } else {
      dataUpdate.password = user.password;
    }

    const updatedUser = await this.UserModel.findByIdAndUpdate(userId, dataUpdate, { new: true });
    if (!updatedUser) {
      throw new NotFoundError("User not found or update failed");
    }

    return updatedUser;
  }


  async deleteUser(userId) {
    const user = await this.UserModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async getMe(userId) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    const {password, ...userData} = user.toObject();
    return userData;
  }
}