import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({ // mongoose schema es un objeto que define la estructura de los documentos que se guardan en una colección de MongoDB.new es un método que crea un nuevo esquema de mongoose.
    class_name: {
        type: String,
        required: true
    },
    subject_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    }],
    students: [{ // esto es un array de objetos
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
}); 

const ClassModel = mongoose.model('Classes', ClassSchema); 

export default ClassModel; 

