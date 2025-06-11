import { AuthFailureError } from '../handler/error.reponse.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
const secret_key = process.env.JWT_secret_key;

export default class AuthUtils {
  static genAccessToken(user) {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, secret_key, { expiresIn: '1h' });
  }

  static genRefreshToken(user) {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, secret_key, { expiresIn: '30d' });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, secret_key);
    } catch (error) {
      throw new AuthFailureError("Invalid or expired token");
    }
  }
}
