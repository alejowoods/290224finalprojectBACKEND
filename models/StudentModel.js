import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classes',
        /* required: true */
    },
    contact_person: {
        type: String,
        required: true
    },
    cp_email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'No way José, this is not a valid email address. Try again!'
        }
    },
    warning_ids:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warning',
        default: null
    }],

    subject_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        default: null
    }],
    


});

const Student = mongoose.model('Student', StudentSchema);

export default Student;



