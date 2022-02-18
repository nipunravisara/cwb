import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import database from './utils/database';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.listen(process.env.PORT, async () => {
  routes(app);
  await database();
  // eslint-disable-next-line no-console
  console.log(`✅ Server is up and running on port ${process.env.PORT}`);
});
