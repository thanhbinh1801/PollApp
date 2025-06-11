import {ConflictRequestError, BadRequestError, NotFoundError } from '../handler/error.reponse.js';

export default class PoolService {
  constructor(poolModel, voteModel) {
    this.poolModel = poolModel;
    this.voteModel = voteModel;
  }

  async getAllPools(req) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalPools = await this.poolModel.countDocuments();
    const pools = await this.poolModel.find().skip((page - 1) * limit).limit(limit)
    if(!pools){
      throw new NotFoundError('No pools found');
    }
    return { totalPools, pools , page, limit };
  }

  async getPoolByID(poolId) {
    if(!poolId){
      throw new BadRequestError('Pool ID is required');
    }
    const pool = await this.poolModel.findById(poolId).lean();
    if(!pool){
      throw new NotFoundError(`Pool with ID ${poolId} not found`);
    }

    const vote = await this.voteModel.find({ poolId : poolId })
    .populate('userId', 'username')
    .lean();

    const voteGroupByOption = vote.reduce((acc, vote) => {
      const optionId = vote.optionId.toString();

      if (!acc[optionId]) {
        acc[optionId] = {
          users: [],
          countVote: 0
        };
      }

      acc[optionId].users.push({
        id: vote.userId._id,
        username: vote.userId.username,
      });

      acc[optionId].countVote += 1;

      return acc;
    }, {});

    pool.options = pool.options.map(opt => ({
      ...opt,
      userVote: voteGroupByOption[opt._id.toString()] || []
    }));

    return pool;
  }

  async createPool(poolData){
    if(!poolData){
      throw new BadRequestError('Pool data is required');
    }
    const newPool = await this.poolModel.create(poolData);
    if(!newPool){
      throw new ConflictRequestError('Pool already exists');
    }
    return newPool;
  }

  async updatePool(poolId, poolData) {
    if(!poolId){
      throw new BadRequestError('Pool ID is required');
    }
    if(!poolData){
      throw new BadRequestError('Pool data is required');
    }
    const updatePool = await this.poolModel.findByIdAndUpdate(poolId, poolData, { new: true });
    if(!updatePool){
      throw new NotFoundError(`Pool with ID ${poolId} not found`);
    }
    return updatePool;    
  }

  async deletePool(poolId) {
    if(!poolId){
      throw new BadRequestError('Pool ID is required');
    } 
    const deletedPool = await this.poolModel.findByIdAndDelete(poolId);
    if(!deletedPool){
      throw new NotFoundError(`Pool with ID ${poolId} not found`);
    }
    return deletedPool;
  } 

  async addOption(poolId, optionData){
    if(!poolId){
      throw new BadRequestError('Pool ID is required');
    }
    if(!optionData){
      throw new BadRequestError('Option data is required');
    }
    const pool = await this.poolModel.findById(poolId);
    if(!pool){
      throw new NotFoundError(`Pool with ID ${poolId} not found`);
    }
    pool.options.push(optionData);
    await pool.save();
    return pool;
  }

  async votePool(poolId, optionId, userId){
    if(!poolId || !optionId || !userId){
      throw new BadRequestError('Pool ID, Option ID and User ID are required');
    }
    const pool = await this.poolModel.findById(poolId);
    if(!pool){
      throw new NotFoundError(`Pool with ID ${poolId} not found`);
    }
    const option = pool.options.find(opt => opt._id.toString() === optionId);
    if(!option){
      throw new NotFoundError(`Option with ID ${optionId} not found in pool ${poolId}`);
    }
    const existingVote = await this.voteModel.findOne({poolId, userId});
    if(existingVote){
      throw new ConflictRequestError(`User ${userId} has already voted in pool ${poolId}`);
    }
    const vote = await this.voteModel.create({poolId, optionId, userId});
    pool.totalVotes += 1;
    await pool.save();
    return vote;
  }

  async removeVote(poolId, optionId, userId) {
    if(!poolId || !optionId || !userId){
      throw new BadRequestError('Pool ID, Option ID and User ID are required');
    }
    const pool = await this.poolModel.findById(poolId);
    if(!pool){
      throw new NotFoundError(`Pool with ID ${poolId} not found`);
    }
    const option = pool.options.find(opt => opt._id.toString() === optionId);
    if(!option){
      throw new NotFoundError(`Option with ID ${optionId} not found in pool ${poolId}`);
    }
    const vote = await this.voteModel.findOneAndDelete({poolId, optionId, userId});
    if(!vote){
      throw new NotFoundError(`Vote not found for user ${userId} in pool ${poolId}`);
    }
    pool.totalVotes -= 1;
    await pool.save();
    return vote;
  }
}