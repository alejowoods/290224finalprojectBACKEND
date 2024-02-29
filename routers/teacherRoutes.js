import express from 'express';
import getTeacherInfo from '../controllers/teacherController.js';

const teacherRouter = express.Router();

teacherRouter.get('/', getTeacherInfo);

export default teacherRouter;