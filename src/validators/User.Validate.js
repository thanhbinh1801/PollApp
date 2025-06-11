import { BadRequestError, ConflictRequestError} from '../handler/error.reponse.js'; 
import UserModels from '../models/user_models.js';

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPhone = /^(09)[0-9]{8}$/;

export default class UserValidate {
  loginValidate = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequestError('Username and password are required');
    }
    next();
  }

  registerValidate  = async ( req, res, next ) =>{
    const user = req.body;
  
    if(!user.name || user.name.trim().length < 10) {
      throw new BadRequestError("Name must be at least 10 characters long");
    }
  
    if( user.age <= 0  || user.age >= 100 || Number.isNaN(user.age)){
      throw new BadRequestError("Age must be a number between 1 and 99");
    }
  
    if(user.gender !== "male" && user.gender !== "female"){
      throw new BadRequestError("Gender is invalid");
    }
  
    if (!regexEmail.test(user.email)) {
      throw new BadRequestError("Email is invalid");
    } else {
      let emailExists;
      if( user.id != ""){
        emailExists = await UserModels.findOne({email : user.email});
      } else {
        emailExists = await UserModels.findOne({email: user.email, id: { $ne: user.id}});
      }
      if (emailExists) {
        throw new ConflictRequestError("Email must be unique"); 
      }
    }
    
    if (!regexPhone.test(user.phone)) {
      throw new BadRequestError("Phone is invalid");
    } else {
      let phoneExists;
      if( user.id != ""){
        phoneExists = await UserModels.findOne({phone : user.phone});
      } else {
        phoneExists = await UserModels.findOne({phone: user.phone, id: { $ne: user.id}});
      }
      if (phoneExists) {
        throw new ConflictRequestError("Phone must be unique");
      }
    }
    next(); 
  }
}