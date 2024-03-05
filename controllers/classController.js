import ClassModel from "../models/ClassModel.js";
import SubjectModel from "../models/SubjectModel.js";
import studentModel from "../models/StudentModel.js";

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

    try {
        const classInstance = await ClassModel.findById(req.params.classID);
        const subjectInstance = await SubjectModel.findById(req.query.subjectID);

        if(!classInstance) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const existingSubject = classInstance.subject_ids.includes(req.query.subjectID); 
        if(existingSubject) {
            return res.status(400).json({ message: 'Subject already assigned to this class' });
        }

        if(!subjectInstance) {
            return res.status(404).json({ message: 'Subject not found' })
        }


        classInstance.subject_ids.push(req.query.subjectID);
        await classInstance.save();

        const students = await studentModel.find({ class_id: req.params.classID });
        const studentIds = students.map(student => student._id); // el map es para recorrer el array y obtener los ids de los estudiantes. El array se obtiene de la busqueda de los estudiantes que pertenecen a la clase

        subjectInstance.student_ids.push(...studentIds); // aqui se envian los ids de los estudiantes al array de student_ids del subject. El spread operator es para que no se envie un array de arrays
        await subjectInstance.save();

        await studentModel.updateMany({ // aqui se actualizan los ids de los subjects en los estudiantes
            _id: { $in: studentIds } }, 
            { $push: { subject_ids: req.query.subjectID } 
        }); 

        res.status(200).json({ message: 'Subject assigned to class', classInstance });

    } catch (error) {
        console.error('Houston...! Error assigning subject to class:', error);
        res.status(500).json({ message: 'GAME OVER! INSERT COIN  AND TRY AGAIN (internal server error)' });
    }
}
export {createClass, assignSubjectToClass};