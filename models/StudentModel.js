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
    warnings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warnings',
        default: null
    },

    subject_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        default: null
    },
    

    w_comments: String

});

const Student = mongoose.model('Student', StudentSchema);

export default Student;



