import express from 'express';
import { getTeacherInfo, assignSubject } from '../controllers/teacherController.js';

const teacherRouter = express.Router();

teacherRouter.get('/info', getTeacherInfo);

teacherRouter.post('/:teacherID/assign-subject', assignSubject);

export default teacherRouter;