import TeacherModel from "../models/TeacherModel.js";

const registerTeacher = async (req, res) => {
    try {
        const { name, first_name, email, subjects, password } = req.body; // Destructuring the request body
        const teacher = new TeacherModel({ name, first_name, email, subjects, password }); 
        await teacher.save();
        res.status(201).json({message: 'New teacher registered, JAY!', teacher});
    } catch (error) {
        console.error('Houston...!', error);
        res.status(500).json({ message: 'Houston, we have a problem...! (internal server error)' });
    }
};

export default registerTeacher;