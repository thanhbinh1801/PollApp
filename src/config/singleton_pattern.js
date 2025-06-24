import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectString = process.env.MONGO_URL;

class Database {
  constructor() {
    this.Connect();
  }

  async Connect (type = 'mongodb'){
    try{
      mongoose.set('debug', true);
      
      await mongoose.connect(connectString , {
        useNewUrlParser : true,
        useUnifiedTopology : true,
      }); 
      console.log("Connected to mongodb successfully!");
    }
    catch ( error) {
      console.error( " fail to connect to mongodb ", error.message);
    }
  }

  static getInstance() {
    if(!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();
export default instanceDatabase;