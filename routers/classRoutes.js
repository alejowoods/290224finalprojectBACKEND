import express from 'express';
import { createClass, assignSubjectToClass, addStudentsToClass } from '../controllers/ClassController.js';

const ClassRouter = express.Router();

ClassRouter.post('/create', createClass);
ClassRouter.put('/assignSubject/:classID', assignSubjectToClass);
ClassRouter.put('/addStudents', addStudentsToClass);


export default ClassRouter;