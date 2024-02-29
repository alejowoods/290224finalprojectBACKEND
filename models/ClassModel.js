import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({ // mongoose schema es un objeto que define la estructura de los documentos que se guardan en una colección de MongoDB.new es un método que crea un nuevo esquema de mongoose.
    class_name: {
        type: String,
        required: true
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId, // mongoose.Schema.Types.ObjectId es un tipo de dato que se utiliza para referenciar un documento en otra colección.
        ref: 'Subject', 
        /* required: true */ // cambiar a true cuando se creen las asginaturas
    },
    students: [{ // esto es un array de objetos
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
}); 

const ClassModel = mongoose.model('Classes', ClassSchema); 
// mongoose.model es un método que crea un modelo de mongoose. Un modelo es una clase que se utiliza para comunicarse con una colección de MongoDB.
// moongose.model recibe dos argumentos: el nombre del modelo y el esquema que se utilizará para crear los documentos de la colección.
// en este caso, class es el nombre del modelo, el cual se toma de la colección de MongoDB que se utilizará para guardar los documentos de la colección.
// en otras palabras, class es el nombre de la coleccion. 

export default ClassModel; 

