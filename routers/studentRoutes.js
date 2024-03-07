import express from 'express';
import {addStudent, getStudentsInfo, getStudentsBySubjectAndClass, editStudent, deleteStudent, addStudentsToSubjectAndClass, addStudentsToClass, deleteStudentFromSubject} from '../controllers/StudentController.js';

const studentRouter = express.Router();

studentRouter.post('/add', addStudent);
studentRouter.get('/info', getStudentsInfo);    
studentRouter.get('/:classID/:subjectID', getStudentsBySubjectAndClass);

studentRouter.put('/update/:id', editStudent);
studentRouter.delete('/delete/:id', deleteStudent);
studentRouter.put('/addStudentsToSubjectAndClass', addStudentsToSubjectAndClass);
studentRouter.put('/addStudentsToClass', addStudentsToClass);
studentRouter.delete('/deleteStudentFromSubject', deleteStudentFromSubject);




export default studentRouter;