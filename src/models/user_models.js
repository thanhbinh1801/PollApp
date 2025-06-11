import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required : true
    },
    age : {
      type : Number,
      min : 0
    },
    gender : {
      type : String,
      required : true
    },
    email : {
      type: String,
      required: true,
      unique : true
    },
    phone : {
      type : String,
      required : true,
      unique : true
    },
    username : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type: String
    },
    passwordResetToken : {
      type : String
    },
    passwordResetExpiration : {
      type : String
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps : true
  }
)

const UserModels = mongoose.model('User', UserSchema);
export default UserModels;