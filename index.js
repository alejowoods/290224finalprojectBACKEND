import express from 'express';
import connection from './db.js';

const app = express();
const port = 8000;


app.listen(8000, () => {
  console.log(`Hi Wilson! Wilson is running on port: ${port}`);
});
