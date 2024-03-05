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

const editWarning = async (req, res) => {

    try {
        const warningInstance = await WarningModel.findById(req.params.warningID);

        if(!warningInstance) {
            return res.status(404).json({ message: 'Warning not found' });
        }

        const { warning_comments } = req.body;

        warningInstance.warning_comments = warning_comments;
        await warningInstance.save();

        res.status(200).json({ message: 'Warning updated', warningInstance });

    } catch (error) {
        console.error('Houston...! Error updating warning:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }

};

export default addWarning;