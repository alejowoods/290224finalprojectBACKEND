import express from 'express';
import addWarning from '../controllers/WarningController.js';

const warningRouter = express.Router();

warningRouter.post('/add', addWarning);

export default warningRouter;

