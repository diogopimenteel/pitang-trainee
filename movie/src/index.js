import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/index.js';

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/', (request, response) => {
  response.json({ message: 'Hello World' });
});

app.listen(PORT, () => {
  console.log(`Server Running PORT: ${PORT}`);
});
