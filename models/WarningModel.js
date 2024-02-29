import mongoose from "mongoose";

const WarningSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    warning_date: {
        type: Date,
        default: Date.now
    },
    warning_comments: {
        type: String,
        required: true
    }
});

const WarningModel = mongoose.model('Warning', WarningSchema);

export default WarningModel;