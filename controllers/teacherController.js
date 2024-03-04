import TeacherModel from "../models/TeacherModel.js";
import SubjectModel from "../models/SubjectModel.js";
import ClassModel from "../models/ClassModel.js";


const getTeacherInfo = async (req, res) => {
    try {
        const teachers = await TeacherModel.find(); // Teacher representa la coleccion de datos y find() es un metodo de mongoose para buscar todos los datos
        res.status(200).json({ teachers });
    } catch (error) {
        console.error('Houston...! Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Houston, we have a problem...! (internal server error)' });
    }
};

const assignSubjectToClassAndTeacher = async (req, res) => {
    try {
        const { subjectName } = req.body; // Nombre del subject (asignatura)
        const { teacherID, classID } = req.params; // teacher and class id

        const teacher = await TeacherModel.findById(teacherID); // Buscamos al profesor por su id en la coleccion de profesores
        if(!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const classInstance = await ClassModel.findById(classID); 

        if(!classInstance) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const existingSubject = await SubjectModel.findOne({ subject_name: subjectName});
        if(existingSubject) {
            return res.status(400).json({ message: 'Subject already exists in the class, teacher!'})
        };

        const newSubject = new SubjectModel({ // Creamos un nuevo objeto de la coleccion de asignaturas

            subject_name: subjectName, 
            teacher_id: teacherID, 
            class_id: classID
        }); 

        await newSubject.save(); // Guardamos el nuevo objeto en la coleccion de asignaturas
        teacher.subject_ids.push(newSubject._id); // new subject to the T's subject_ids array
        classInstance.subject_ids.push(newSubject._id); // new subject to the class's subject_ids array
        await teacher.save(); // Guardamos el nuevo objeto en la coleccion de profesores
        await classInstance.save(); 
        res.status(201).json({ message: 'New subject added to the class!', newSubject });
        

    } catch (error) {
        console.error('Houston...! Error adding new subject:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};

const deleteSubjectFromClassAndTeacher = async (req, res) => {
    try {
        const { teacherID, classID, subjectID } = req.params;

        const deleteSubject = await SubjectModel.findByIdAndDelete(subjectID);
        if(!deleteSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const subjectTeacher = await TeacherModel.findById(teacherID);
        if(subjectTeacher) {
            subjectTeacher.subject_ids.pull(subjectID);
            await subjectTeacher.save();
        }

        const classInstance = await ClassModel.findById(classID); // Buscamos la clase por el id del profesor
        if(classInstance) {
            classInstance.subject_ids.pull(subjectID);
            await classInstance.save();
        }

        res.status(200).json({ message: 'Subject deleted from the class and teacher', subjectID });

    } catch (error) {
        console.error('Houston...! Error deleting subject:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};

const getSubjectsForTeacher = async (req, res) => {
    try {
        const { teacherID } = req.params;

        const teacher = await TeacherModel.findById(teacherID);

        if(!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const subjects = await SubjectModel.find({ teacher_id: teacherID }).populate('class_id', 'class_name');
        res.status(200).json({ subjects });
        
    } catch (error) {
        console.error('Houston...! Error fetching subjects for teacher:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};

export { getTeacherInfo, assignSubjectToClassAndTeacher, deleteSubjectFromClassAndTeacher, getSubjectsForTeacher  };