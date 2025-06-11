import mongoose from 'mongoose';

const PoolOptionsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true  
  }
}, { _id: true });

const creatorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }    
}, { _id: true });

const PoolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  options: {
    type: [PoolOptionsSchema],
    required: true
  },
  creator: {
    type: creatorSchema,
    required: true
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  },
  totalVotes: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true
});

const PoolModel = mongoose.model('Pool', PoolSchema);
export default PoolModel; 