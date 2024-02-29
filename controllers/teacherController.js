import TeacherModel from "../models/TeacherModel.js";
import SubjectModel from "../models/SubjectModel.js";


const getTeacherInfo = async (req, res) => {
    try {
        const teachers = await TeacherModel.find(); // Teacher representa la coleccion de datos y find() es un metodo de mongoose para buscar todos los datos
        res.status(200).json({ teachers });
    } catch (error) {
        console.error('Houston...! Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Houston, we have a problem...! (internal server error)' });
    }
};

const assignSubject = async (req, res) => {
    try {
        const { subjectName } = req.body; // Nombre del subject (asignatura)
        const { teacherId } = req.params; // Id del profesor

        const teacher = await TeacherModel.findById(teacherId); // Buscamos al profesor por su id en la coleccion de profesores
        if(!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const newSubject = new SubjectModel({ // Creamos un nuevo objeto de la coleccion de asignaturas

            subject_name: subjectName, 
            teacherId: teacherId 
        }); 
        await newSubject.save(); // Guardamos el nuevo objeto en la coleccion de asignaturas
        res.status(201).json({ message: 'New subject added to the class!', newSubject });

    } catch (error) {
        console.error('Houston...! Error adding new subject:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};

export { getTeacherInfo, assignSubject };