import SubjectModel from "../models/SubjectModel.js";
import TeacherModel from "../models/TeacherModel.js";
import StudentModel from "../models/StudentModel.js";


const addSubject = async (req, res) => {
    try {
        const { subject_name, teacher_id, class_id, student_ids } = req.body;

        const newSubject = new SubjectModel({
            subject_name,
            teacher_id,
            class_id,
            student_ids
        });

        await newSubject.save();
        res.status(201).json({ message: 'YEY! YOU MADE IT! New subject added to the class!', newSubject });
    } catch (error) {
        console.log('Houston...! Error adding new subject:', error);
        res.status(500).json({ message: 'NOT YOUR FAULT, MATE (internal server error)' });
    }
};

const getStudentsForSubject = async (req, res) => {
    try {
        const { teacherID, classID, subjectID } = req.params;

        const teacher = await TeacherModel.findById(teacherID); 

        if(!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const subjectInstance = await SubjectModel.findById(subjectID);
        console.log('Checking subjectInstance:', subjectInstance);

        if(!subjectInstance || !subjectInstance.teacher_id.equals(teacherID) || !subjectInstance.class_id.equals(classID)) {
            return res.status(404).json({ message: 'Subject not found for this teacher and class' });
        };

        let studentsList;
        try {
            studentsList = await StudentModel.find({ class_id: classID, subject_ids: subjectID });
            console.log("🚀 ~ getStudentsForSubject ~ studentsList:", studentsList);
            
        } catch (error) {
            console.error('IS THERE ANYONE ALIVE OUT THERE?:', error);
        }

        /* const studentsList = await StudentModel.find({ class_id: classID, subject_ids: subjectID });
        console.log("🚀 ~ getStudentsForSubject ~ studentsList:", studentsList) */ // CALLING FOR REINFORCEMENTS; THE CAVALRY IS ON ITS WAY.NURIA OR STEPHAN ARE COMING! 

        res.status(200).json({ studentsList }); 

    } catch (error) {
        console.error('Houston...! Error fetching students for subject:', error);
        res.status(500).json({ message: '(internal server error): SH*T HAPPENS, MATE: TAKE A DEEP BREATH AND TRY AGAIN. CALL NURIA OR STHEPI' });
        
    }
};

const addStudentToSubject = async (req, res) => { // AQUI ESTÁN MIS PROBLEMAS	
    const {id} = req.params; 
    const {studentId} = req.body; 
    console.log(studentId,"HELLO" )
    try {
        const student = await StudentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const subject = await SubjectModel.findOneAndUpdate({ _id: id }, { $addToSet: { student_ids: studentId } }, { new: true });

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.status(200).json({ message: 'Student added to subject', subject });

    } catch (error) {
        console.error('Houston...! Error adding student to subject:', error);
        res.status(500).json({ message: 'GAME OVER! INSERT COIN  AND TRY AGAIN (internal server error)' });
    }
}
export {addSubject, getStudentsForSubject, addStudentToSubject};


// , removeStudentFromSubject

