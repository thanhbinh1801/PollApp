import HashService from '../utils/HashService.js';
import { NotFoundError, BadRequestError } from '../handler/error.reponse.js';
import AuthUtils from '../utils/authUtils.js';

export default class AuthService {
  constructor(User) {
    this.UserModel = User;
  }

  async Login(data) {
    const user = await this.UserModel.findOne({username: data.username});
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (!HashService.verifyPW(data.password, user.password)) {
      throw new BadRequestError("Invalid password");
    }
    const accessToken = AuthUtils.genAccessToken(user);
    const refreshToken = AuthUtils.genRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async Register(data) {
    const userExist = await this.UserModel.findOne({username: data.username});
    if (userExist) {
      throw new BadRequestError("Username already exists");
    }
    const hashedPW = HashService.hashPW(data.password);
    const newUser = new this.UserModel({
      username: data.username,
      password: hashedPW,
      name: data.name,
      age: data.age,
      gender: data.gender,
      email: data.email,
      phone: data.phone
    });
    await newUser.save();
    const {password, ...userData} = newUser.toObject();
    return userData;
  }
  
  async RefreshToken(refreshToken) {
    const payload = AuthUtils.verifyToken(refreshToken);
    console.log("Payload from refresh token:", payload);
    const user = payload;
    const accessToken = AuthUtils.genAccessToken(user);
    const newRefreshToken = AuthUtils.genRefreshToken(user);
    return { accessToken, refreshToken: newRefreshToken };
  }
}