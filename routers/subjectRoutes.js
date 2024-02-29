import express from 'express';
import addSubject from '../controllers/SubjectController.js';

const subjectRouter = express.Router(); // asignamos la ruta subjectRouter a express.Router() para poder enrutar las peticiones HTTP

subjectRouter.post('/add', addSubject); // asignamos la ruta /add a la función addSubject

export default subjectRouter; 