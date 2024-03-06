import express from 'express';
import {addWarning, editWarning, deleteWarning, getWarningsForStudent} from '../controllers/WarningController.js';

const warningRouter = express.Router();

warningRouter.post('/add', addWarning);
warningRouter.put('/update/:id', editWarning); 
warningRouter.delete('/delete/:warning_id', deleteWarning);
warningRouter.get('/:studentID', getWarningsForStudent);

export default warningRouter;

