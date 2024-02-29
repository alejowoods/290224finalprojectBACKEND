import express from 'express';
import registerTeacher from '../controllers/teacherController.js';

const authRouter = express.Router(); // cambiar en cada archivo

authRouter.post('/register', registerTeacher);

export default authRouter;
