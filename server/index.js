import express from 'express';
import routers from './routers/routers.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});