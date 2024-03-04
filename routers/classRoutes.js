import express from 'express';
import { createClass, assignSubjectToClass } from '../controllers/ClassController.js';

const ClassRouter = express.Router();

ClassRouter.post('/create', createClass);
ClassRouter.put('/assignSubject/:classID', assignSubjectToClass);

export default ClassRouter;