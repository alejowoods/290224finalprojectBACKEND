import express from 'express';
import {addStudent, getStudentsInfo, getStudentsBySubjectAndClass, editStudent, deleteStudent} from '../controllers/StudentController.js';

const studentRouter = express.Router();

studentRouter.post('/add', addStudent);
studentRouter.get('/info', getStudentsInfo);    
studentRouter.get('/:classID/:subjectID', getStudentsBySubjectAndClass);
studentRouter.put('/update/:id', editStudent);
studentRouter.delete('/delete/:id', deleteStudent);


export default studentRouter;