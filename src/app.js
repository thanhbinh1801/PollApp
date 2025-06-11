import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.route.js';
import instanceDatabase from './config/singleton_pattern.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './handler/error-handler.js';

dotenv.config();

instanceDatabase;
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

indexRouter(app);

app.use(errorHandler);

app.use('*', (req, res) =>{
  res.status(404).json({error: "Resource not found"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});