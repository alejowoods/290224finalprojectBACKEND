import SubjectModel from "../models/SubjectModel.js";

const addSubject = async (req, res) => {
    try {
        const { subject_name, teacher_id, student_ids } = req.body;

        const newSubject = new SubjectModel({
            subject_name,
            teacher_id,
            student_ids
        });

        await newSubject.save();
        res.status(201).json({ message: 'YEY! YOU MADE IT! New subject added to the class!', newSubject });
    } catch (error) {
        console.log('Houston...! Error adding new subject:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};


export default addSubject;

