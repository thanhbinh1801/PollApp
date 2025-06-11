  import { OK, CREATED } from '../handler/success.reponse.js';

  export default class PoolController{
    constructor(PoolService) {
      this.PoolService = PoolService;
    }

    getAllPools = async (req, res, next) => {
      try{
        const { totalPools, pools, page, limit } = await this.PoolService.getAllPools(req);
        new OK({
          success: true,
          message: "Get all Poll successfully",
          metadata: {
            total: totalPools,
            page,
            limit,
            data: pools
          }
        }).send(res);
      } catch (error) {
        next(error);
      }
    }

    getPoolByID = async (req, res, next) => {
      try{
        const poolId = req.params.id;
        const pool = await this.PoolService.getPoolByID(poolId);
        new OK({
          success: true,
          message: "Get Poll by ID successfully",
          metadata: pool
        }).send(res);
      } catch (error) {
        next(error);
      }
    }

    createPool = async (req, res, next) => {
      try{
        const poolData = req.body;
        const newPool = await this.PoolService.createPool(poolData);
        new CREATED({
          success: true,
          message: "Create Poll successfully",
          metadata: newPool
        }).send(res);
      } catch (error) {
        next(error);
      }
    }

    updatePool = async (req, res, next) => {
      try{
        const poolId = req.params.id;
        const poolData = req.body;
        const updatedPool = await this.PoolService.updatePool(poolId, poolData);
        new OK({
          success: true,
          message: "Update Poll successfully",
          metadata: updatedPool
        }).send(res);
      } catch (error) {
        next(error);
      }
    } 

    deletePool = async (req, res, next) => {
      try{
        const poolId = req.params.id;
        await this.PoolService.deletePool(poolId);
        new OK({
          success: true,
          message: "Delete Poll successfully"
        }).send(res);
      } catch (error) {
        next(error);
      }
    }

    addOption = async (req, res, next) => {
      try{
        const poolId = req.params.poolId;
        const optionData = req.body;
        const newOption = await this.PoolService.addOption(poolId, optionData);
        new CREATED({
          success: true,
          message: "Add Option to Poll successfully",
          metadata: newOption
        }).send(res);
      } catch (error) {
        next(error);
      }
    }

    votePool = async (req, res, next) => {
      try{
        const poolId = req.params.poolId;
        const optionId = req.params.optionId;
        const userId = req.user.id;
        const vote = await this.PoolService.votePool(poolId, optionId, userId);
        new CREATED({
          success: true,
          message: "Vote added successfully",
          metadata: vote
        }).send(res);
      } catch (error) {
        next(error);
      }
    }

    removeVote = async (req, res, next) => {
      try{
        const poolId = req.params.poolId;
        const optionId = req.params.optionId;
        const userId = req.user.id;
        await this.PoolService.removeVote(poolId, optionId, userId);
        new OK({
          success: true,
          message: "Vote removed successfully"
        }).send(res);
      } catch (error) {
        next(error);
      }
    }
  }