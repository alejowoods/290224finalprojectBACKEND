import express from 'express';
import createClass from '../controllers/ClassController.js';

const ClassRouter = express.Router();

ClassRouter.post('/create', createClass);

export default ClassRouter;