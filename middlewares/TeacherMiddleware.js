const validateTeacherRegistration = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Hello teacher, you need to fill out all the fields properly.'})
    }

    next();
};

export default validateTeacherRegistration; 