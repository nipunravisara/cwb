import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import database from './utils/database';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.listen(process.env.PORT, () => {
  routes(app);
  database();
  // eslint-disable-next-line no-console
  console.log(`✅ Server is up and running on port ${process.env.PORT}`);
});
