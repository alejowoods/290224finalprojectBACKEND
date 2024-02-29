import WarningModel from '../models/WarningModel.js';

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
        res.status(201).json({ message: 'Warning added to the student!', newWarning });

    } catch (error) {
        console.error('Houston...! Error adding new warning:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};

export default addWarning;