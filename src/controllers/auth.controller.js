import { OK, CREATED } from '../handler/success.reponse.js';

export default class AuthController {
  constructor(AuthService) {
    this.authService = AuthService;
  }

  login = async (req, res, next) => {
    try {
      const data = {
        username: req.body.username,
        password: req.body.password
      };
      const token = await this.authService.Login(data);
      console.log("Setting cookie...");
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, 
      });
      console.log("Sending response...");
      new OK({  
        message: "Login successful",
        metadata: { accessToken: token.accessToken }
      }).send(res);
    } catch( error ){
      next(error);
    }
  }

  register = async (req, res, next) => {
    try {
      const data = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
      };
      const user = await this.authService.Register(data);
      new CREATED({
        message: "User registered successfully"
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  refreshToken = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      const token = await this.authService.RefreshToken(refreshToken);
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, 
      });
      new OK({
        message: "Token refreshed successfully",
        metadata: { accessToken: token.accessToken }
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

 logout = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(" ")[1];

      res.clearCookie('refreshToken', {
        httpOnly:true,
      });
      new OK({
        message: "Logout successful"
      }).send(res);
    } catch(error){
      next(error);
    }
  }
}

