import Teacher from "../models/TeacherModel.js";
import registerTeacher from "./authController.js";


const getTeacherInfo = async (req, res) => {
    try {
        const teachers = await Teacher.find(); // Teacher representa la coleccion de datos y find() es un metodo de mongoose para buscar todos los datos
        res.status(200).json({ teachers });
    } catch (error) {
        console.error('Houston...! Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Houston, we have a problem...! (internal server error)' });
    }
};

export default getTeacherInfo;