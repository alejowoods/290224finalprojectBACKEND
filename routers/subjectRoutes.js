import express from 'express';
import {addSubject, addStudentsToSubject} from '../controllers/SubjectController.js';

const subjectRouter = express.Router(); 

subjectRouter.post('/add', addSubject); 
subjectRouter.put('/addStudents', addStudentsToSubject); 


export default subjectRouter; 