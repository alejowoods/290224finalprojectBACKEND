import Student from '../models/StudentModel.js';

const addStudent = async (req, res) => {
    try {
        const {name, class_id, contact_person, cp_email, warning_ids, subject_ids } = req.body;

        const newStudent = new Student({
            name,
            class_id,
            contact_person,
            cp_email,
            warning_ids,
            subject_ids

        });

        await newStudent.save();

        res.status(201).json({ message: 'YEY! YOU MADE IT! New student added to the class!', newStudent });

    } catch (error) {
        console.error('Houston...! Error adding new student:', error);
        res.status(500).json({ message: 'Houston, we have a problem...! (internal server error)' });
    }
};




export default addStudent;