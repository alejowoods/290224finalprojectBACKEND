import SubjectModel from "../models/SubjectModel.js";
import StudentModel from "../models/StudentModel.js";

const addSubject = async (req, res) => {
    try {
        const { subject_name, teacher_id, class_id, student_ids } = req.body;

        const newSubject = new SubjectModel({
            subject_name,
            teacher_id,
            class_id,
            student_ids
        });

        await newSubject.save();
        res.status(201).json({ message: 'YEY! YOU MADE IT! New subject added to the class!', newSubject });
    } catch (error) {
        console.log('Houston...! Error adding new subject:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};

const addStudentsToSubject = async (req, res) => {
    const { subjectID, studentIDs } = req.body;
    try {
        const subjectInstance = await SubjectModel.findById(subjectID);
        if (!subjectInstance) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        studentIDs.forEach(studentID => {
            if (!subjectInstance.student_ids.includes(studentID)) { // si el id del estudiante no esta en el array de student_ids del subject
                subjectInstance.student_ids.push(studentID); // se agrega el id del estudiante al array de student_ids del subject
            }
        });

        await subjectInstance.save();
        res.status(200).json({ message: 'Students added to subject', subjectInstance });

    } catch (error) {
        console.error('Houston...! Error adding students to subject:', error);
        res.status(500).json({ message: 'GAME OVER, MATE; INSERT COIN AND PLAY AGAIN: (internal server error)' });
    }
};


export {addSubject, addStudentsToSubject};
