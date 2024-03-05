import express from 'express';
import {addSubject, getStudentsForSubject, addStudentToSubject} from '../controllers/SubjectController.js';

const subjectRouter = express.Router(); // asignamos la ruta subjectRouter a express.Router() para poder enrutar las peticiones HTTP

subjectRouter.post('/add', addSubject); 
subjectRouter.get('/:teacherID/:classID/getStudentsForSubject/:subjectID', getStudentsForSubject); 
subjectRouter.put('/:id/addStudent', addStudentToSubject); // aqui se añade un estudiante a un subject id


export default subjectRouter; 