  import {Router} from 'express';
  import PoolController from '../controllers/pool.controllers.js';
  import PoolService from '../services/pool.service.js';
  import PoolModel from '../models/pool.models.js';
  import VoteModel from '../models/vote.models.js';
  import asyncHandler from '../middlewares/asyncHandler.js';
  import Validate from '../middlewares/validate.js';
  import AuthValidate from '../validators/Auth.validate.js';
  import PoolValidator from '../validators/Pool.validate.js';

  class PoolRouter {
    constructor(){
      this.router = Router();
      this.PoolService = new PoolService(PoolModel, VoteModel);
      this.PoolController = new PoolController(this.PoolService);
      this.PoolValidator = new PoolValidator();
      this.AuthValidate = new AuthValidate();
      this.setupRoutes();
    }

    setupRoutes(){  
      this.router.get( '/', Validate(this.AuthValidate.checkAuth), asyncHandler(this.PoolController.getAllPools));
      this.router.get('/:id', Validate(this.AuthValidate.checkAuth), asyncHandler(this.PoolController.getPoolByID));  
      this.router.post('/', Validate(this.AuthValidate.checkAuth), Validate(this.AuthValidate.checkAdmin), 
                            Validate(this.PoolValidator.checkAddPoll), asyncHandler(this.PoolController.createPool));
      this.router.put('/:id', Validate(this.AuthValidate.checkAuth), Validate(this.AuthValidate.checkAdmin),
                            Validate(this.PoolValidator.checkUpdatePoll), asyncHandler(this.PoolController.updatePool));
      this.router.delete('/:id', Validate(this.AuthValidate.checkAuth), Validate(this.AuthValidate.checkAdmin), 
                            asyncHandler(this.PoolController.deletePool));

      this.router.post('/:poolId/options',  Validate(this.AuthValidate.checkAuth), Validate(this.AuthValidate.checkAdmin),
                            Validate(this.PoolValidator.checkAddOption), asyncHandler(this.PoolController.addOption));
      this.router.post('/:poolId/vote/:optionId', Validate(this.AuthValidate.checkAuth), asyncHandler(this.PoolController.votePool));
      this.router.delete('/:poolId/vote/:optionId', Validate(this.AuthValidate.checkAuth), asyncHandler(this.PoolController.removeVote));
    }

    getRouter() {
      return this.router;
    }
  }
  export default PoolRouter;