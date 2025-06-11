import PoolRouter from './pool.route.js';
import UserRouter from './user.route.js';
import AuthRouter from './auth.route.js';

export default (app) => {
  const poolRouter = new PoolRouter();
  const userRouter = new UserRouter();
  const authRouter = new AuthRouter();
  app.use('/api/v1/pool', poolRouter.getRouter());
  app.use('/api/v1/user', userRouter.getRouter());
  app.use('/api/v1/auth', authRouter.getRouter());
};