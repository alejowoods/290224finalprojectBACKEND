import express from 'express';
import { getTeacherInfo, assignSubjectToClassAndTeacher, deleteSubjectFromClassAndTeacher, getSubjectsForTeacher } from '../controllers/teacherController.js';

const teacherRouter = express.Router();

teacherRouter.get('/info', getTeacherInfo);

teacherRouter.post('/:teacherID/assign-subject-teacher-class/:classID', assignSubjectToClassAndTeacher);  
teacherRouter.delete('/:teacherID/assign-subject-teacher-class/:classID/:subjectID', deleteSubjectFromClassAndTeacher);

teacherRouter.get('/:teacherID/subjects', getSubjectsForTeacher);

export default teacherRouter;