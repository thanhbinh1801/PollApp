import mongoose from 'mongoose';
import UserModel from '../models/user_models.js';

const VoteSchema = mongoose.Schema({
  poolId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  optionId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Vote = mongoose.model('Vote', VoteSchema);

export default Vote;