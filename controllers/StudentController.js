import Student from '../models/StudentModel.js';
import Class from '../models/ClassModel.js';
import Subject from '../models/SubjectModel.js';
import WarningModel from '../models/WarningModel.js';

const addStudent = async (req, res) => {
    try {
        const {name, class_id, contact_person, cp_email, warning_ids, subject_ids } = req.body;

        const newStudent = new Student({
            name,
            class_id,
            contact_person,
            cp_email,
            warning_ids,
            subject_ids

        });

        await newStudent.save();

        res.status(201).json({ message: 'YEY! YOU MADE IT! New student added to the class!', newStudent });

    } catch (error) {
        console.error('Houston...! Error adding new student:', error);
        res.status(500).json({ message: 'Houston, we have a problem...! (internal server error)' });
    }
};

const editStudent = async (req, res) => {
    try {
        const { name, class_id, contact_person, cp_email, warning_ids, subject_ids } = req.body;
        const { id } = req.params;
        console.log('student_id:', id);
        const student = await Student.findById(id);
        console.log('student_id:', student);

        if(!student) {
            return res.status(404).json({ message: 'Student not found: either it is a good student or you made a mistake (normally number 2)' });
        }

        student.name = name;
        student.class_id = class_id;
        student.contact_person = contact_person;
        student.cp_email = cp_email;
        student.warning_ids = warning_ids;
        student.subject_ids = subject_ids;

        await student.save();

        res.status(200).json({ message: 'Student updated', student });


    } catch (error) {
        console.error('Houston...! Error updating student:', error);
        res.status(500).json({ message: 'GAME OVER! INSERT COIN  AND TRY AGAIN (internal server error)' });
    
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { student_id } = req.params;

        const student = await Student.findByIdAndDelete(student_id);

        if(!student) {
            return res.status(404).json({ message: 'Student not found: either it is a good student or you made a mistake (normally number 2)' });
        }

        res.status(200).json({ message: 'Student deleted', student });

    } catch (error) {
        console.error('Houston...! Error deleting student:', error);
        res.status(500).json({ message: 'GAME OVER! INSERT COIN  AND TRY AGAIN (internal server error)' });
    }
};

const getStudentsInfo = async (req, res) => {
    try {
        const students = await Student.find().populate('class_id').populate('warning_ids').populate('subject_ids');
        res.status(200).json({ students });
    } catch (error) {
        console.error('Houston...! Error fetching students:', error);
        res.status(500).json({ message: 'GAME OVER, MATE; INSERT COIN AND PLAY AGAIN: (internal server error)' });
    }
}; 

const addStudentsToClass = async (req, res) => {
    
        const { classID, studentIDs } = req.body;
        try {
            
            const classInstance = await Class.findById(classID);
            if (!classInstance) {
                return res.status(404).json({ message: 'Class not found' });
            }
            
            studentIDs.forEach(studentID => {
                if (!classInstance.students.includes(studentID)) {
                    classInstance.students.push(studentID);
                }
            });
    
            await classInstance.save();
            res.status(200).json({ message: 'Students added to class', classInstance });
    
        } catch (error) {
            console.error('Houston...! Error adding students to class:', error);
            res.status(500).json({ message: 'GAME OVER, MATE; INSERT COIN AND PLAY AGAIN: (internal server error)' });
        }
};

const addStudentsToSubjectAndClass = async (req, res) => {
    const { classID, subjectID, studentIDs } = req.body;
    try {
        const classInstance = await Class.findById(classID);
        if (!classInstance) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const subjectInstance = await Subject.findById(subjectID);
        if (!subjectInstance) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        const existingSubject = classInstance.subject_ids.includes(subjectID);
        if (existingSubject) {
            return res.status(400).json({ message: 'Subject already assigned to this class' });
        }
        classInstance.subject_ids.push(subjectID);
        await classInstance.save();
        const students = await Student.find({ class_id: classID });
        const studentIds = students.map(student => student._id);
        subjectInstance.student_ids.push(...studentIds);
        await subjectInstance.save();
        await Student.updateMany(
            { _id: { $in: studentIds } },
            { $push: { subject_ids: subjectID } }
        );
        res.status(200).json({ message: 'Subject assigned to class', classInstance });
    } catch (error) {
        console.error('Houston...! Error assigning subject to class:', error);
        res.status(500).json({ message: 'GAME OVER! INSERT COIN  AND TRY AGAIN (internal server error)' });
    }

};

const getStudentsBySubjectAndClass = async (req, res) => {

    const { classID, subjectID } = req.params;
    try {
        const students = await Student.find({ 
            class_id: classID, 
            subject_ids: { $in: [subjectID] } 
        })
        .populate('class_id') // why without .populate('warning_ids')
        .populate('subject_ids');
        res.status(200).json({ students }); 
    } catch (error) {
        console.error('Houston...! Error fetching students:', error);
        res.status(500).json({ message: 'GAME OVER, MATE; INSERT COIN AND PLAY AGAIN: (internal server error)' });
    }
};

const deleteStudentFromSubject = async (req, res) => {
    const { studentID, classID, subjectID } = req.body;
    try {
        const student = await Student.findById(studentID);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const subjectInstance = await Subject.findById(subjectID);
        if (!subjectInstance) {
            return res.status(404).json({ message: 'Subject not found' });
        } else {
            subjectInstance.student_ids = subjectInstance.student_ids.filter(student => student.toString() !== studentID);
            await subjectInstance.save();
        }

        student.subject_ids = student.subject_ids.filter(subject => subject.toString() !== subjectID);
        await student.save();
        
        res.status(200).json({ message: 'Student removed from subject', student });

    } catch (error) {
        console.error('Houston...! Error removing student from subject:', error);
        res.status(500).json({ message: 'GAME OVER! INSERT COIN  AND TRY AGAIN (internal server error)' });
    }
};

export {addStudent, 
    getStudentsInfo, 
    getStudentsBySubjectAndClass, 
    editStudent, 
    deleteStudent, 
    addStudentsToSubjectAndClass, 
    addStudentsToClass, 
    deleteStudentFromSubject
};