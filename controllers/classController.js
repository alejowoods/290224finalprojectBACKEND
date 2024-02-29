import Classes from "../models/ClassModel.js";

const createClass = async (req, res) => {
    try {
        const { class_name, subject_id, students } = req.body;

        const newClass = new Classes({ 
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

const getAllClasses = async (req, res) => {
    try {
        const classes = await Classes.find();
        res.status(200).json(classes);
    } catch (error) {
        console.error('WILSOOOOOOOOOOOOOOON!, there is a mistake', error);
        res.status(500).json({ message: `I'M SORRY WILSON! (internal server error)` });
    }
};

const getSingleClass = async (req, res) => {
    try {
        const { id } = req.params;
        const singleClass = await Classes.findById(id);
        res.status(200).json(singleClass);
    } catch (error) {
        console.error('WILSOOOOOOOOOOOOOOON!, there is a mistake', error);
        res.status(500).json({ message: `I'M SORRY WILSON! (internal server error)` });
    }
};

export default createClass;