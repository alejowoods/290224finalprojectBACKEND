import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
    subject_name: {
        type: String,
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    student_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }
});

const SubjectModel = mongoose.model('Subject', SubjectSchema); // esta es una callback function que toma dos argumentos: el nombre del modelo y el esquema que se utilizará para crear los documentos de la colección.

export default SubjectModel;