import express from 'express';
import routers from './routers/routers.js';

const app = express();

app.use(express.json());

app.use(routers);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});