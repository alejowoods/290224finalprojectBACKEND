import express from 'express';
import addStudent from '../controllers/StudentController.js';

const studentRouter = express.Router();

studentRouter.post('/add', addStudent);

export default studentRouter;