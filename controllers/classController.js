import ClassModel from "../models/ClassModel.js";
import SubjectModel from "../models/SubjectModel.js";

const createClass = async (req, res) => {
    try {
        const { class_name, subject_id, students } = req.body;

        const newClass = new ClassModel ({ 
            class_name, 
            subject_id, 
            students 
        });

        await newClass.save();

        res.status(201).json({ message: 'You nailed it! NEW CLASS CREATED!', newClass });

    } catch (error) {
        console.error('WILSOOOOOOOOOOOOOOON!, there is a mistake', error);
        res.status(500).json({ message: `I'M SORRY WILSON! (internal server error)` });
    }
};

const assignSubjectToClass = async (req, res) => {

    const classInstace = await ClassModel.findById(req.params.classID); // classID viene de la URL
    const subjectIds = classInstace.subject_ids; // subject_ids proviene de la coleccion de clases. fue declarado en el modelo de clases 

    try {
        const classInstance = await ClassModel.findById(req.params.classID);  
        const subject = await SubjectModel.findById(req.params.subjectID);

        if(!classInstance) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const existingSubject = await SubjectModel.findOne({ _id: { in: subjectIds } });
        if(existingSubject.length !== subjectIds.length) {
            return res.status(400).json({ message: 'Subject already assigned to the class!'})
        }

        await classInstance.save(); 

        res.status(200).json({ message: 'Subject assigned to the class! YOU MADE IT AGAIN! YOU ARE GREAT', classInstance });

    } catch (error) {
        console.error('Houston...! Error assigning subject to class:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};


export {createClass, assignSubjectToClass};