import WarningModel from '../models/WarningModel.js';
import StudentModel from '../models/StudentModel.js';

const addWarning = async (req, res) => {
    try {
        const { student_id, teacher_id, subject_id, warning_comments } = req.body;

        const newWarning = new WarningModel({
            student_id,
            teacher_id,
            subject_id,
            warning_comments
        });

        await newWarning.save();
        
        const student = await StudentModel.findById(student_id);
        if(student) {
            student.warning_ids.push(newWarning._id);
            await student.save();
        };
        
        res.status(201).json({ message: 'Warning added to the student!', newWarning });
    } catch (error) {
        console.error('Houston...! Error adding new warning:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};

const editWarning = async (req, res) => {
    try {
        const { warning_id, warning_comments } = req.body;
        const warning = await WarningModel.findById(warning_id);

        if(!warning) {
            return res.status(404).json({ message: 'Warning not found: either it is a good student or you made a mistake (normally number 2)' });
        } 

        warning.warning_comments = warning_comments; 

        await warning.save();

        res.status(200).json({ message: 'Warning updated', warning });

    } catch (error) {
        console.error('Houston...! Error updating warning:', error);
        res.status(500).json({ message: '(internal server error): GAME OVER! INSERT COIN AND TRY AGAIN' });
    }
};

const deleteWarning = async (req, res) => {
    try {
        const { warning_id } = req.params;

        const warning = await WarningModel.findByIdAndDelete(warning_id);

        if(!warning) {
            return res.status(404).json({ message: 'Warning not found: either it is a good student or you made a mistake (normally number 2)' });
        } 

        res.status(200).json({ message: 'Warning deleted' });

    } catch (error) {
        console.error('Houston...! Error deleting warning:', error);
        res.status(500).json({ message: '(internal server error): GAME OVER! INSERT COIN AND TRY AGAIN' });
    }
};

const getWarningsForStudent = async (req, res) => {
    try {
    
        const { studentID } = req.params;
        const warnings = await WarningModel.find({ student_id: studentID });

        const warningComments = warnings.map(warning => warning.warning_comments);

        res.status(200).json({ warningComments });

        
    } catch (error) {
        console.error('Houston...! Error fetching warnings for student:', error);
        res.status(500).json({ message: 'GAME OVER, MATE; INSERT COIN AND PLAY AGAIN: (internal server error)' });
    }
};

export {addWarning, editWarning, deleteWarning, getWarningsForStudent};