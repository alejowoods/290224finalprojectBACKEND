import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({ // new is a keyword to create a new instance of a class
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },

            message: 'No way José, this is not a valid email address. Try again!'
        }
    },

    password: { type: String, 
        required: true },
    subject_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

export default TeacherModel;