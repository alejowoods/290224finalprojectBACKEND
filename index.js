import express from 'express';
import connection from './db.js';
import authRoutes from './routers/authRoutes.js';
import validateTeacherRegistration from './middlewares/TeacherMiddleware.js';
import teacherRouter from './routers/teacherRoutes.js';
import studentRouter from './routers/studentRoutes.js'; 
import subjectRouter from './routers/subjectRoutes.js'; 
import warningRouter from './routers/warningRoutes.js';

import ClassRouter from './routers/classRoutes.js'; // !!!	NEEDS TO BE CHANGED


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/auth', validateTeacherRegistration, authRoutes); // !!!
app.use('/teachers', teacherRouter);
app.use('/students', studentRouter); 
app.use('/subjects', subjectRouter); 
app.use('/warnings', warningRouter);

app.use('/classes', ClassRouter);


app.listen(port, () => {
    console.log(`Hi Wilson! Wilson is running on port: ${port}`);
});
