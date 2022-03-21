import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import UserRouter from './router/UserRouter.js';
import ShortenerRouter from './router/ShortenerRouter.js';
import ShortenerController from './controller/ShortenerController.js';
import AuthMiddleware from './middleware/auth.middleware.js';

const app = express();
const { DATABASE_URL, PORT } = process.env;

const shortenerController = new ShortenerController();

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Database connected...');
  })
  .catch((error) => {
    console.error(`Error to connect to database: ${error}`);
  });

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to my shortener API' });
});
app.get('/:hash', shortenerController.redirect);
app.use(AuthMiddleware);

app.use(UserRouter);
app.use(ShortenerRouter);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
