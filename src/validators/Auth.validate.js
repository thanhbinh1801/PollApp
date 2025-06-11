import  { AuthFailureError, BadRequestError } from '../handler/error.reponse.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_secret_key;

export default class AuthValidate {
  checkAuth = async (req, res, next) => {
    try{
      const bearer = req.headers.authorization;
      if(!bearer){
        throw new AuthFailureError('Authorization header is missing');
      }
      const token = bearer.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      console.log('Decoded token:', decoded);
      req.user = decoded;
      
      next();
    } 
    catch(error){
      next(error);
    }     
  }

  checkAdmin = async (req, res, next) => {
    try{
      if(req.user.role == 'admin'){
        next();
      }
      else{
        throw new AuthFailureError('You are not authorized to perform this action');
      }
    } catch(error){
      next(error);
    }
  }
}