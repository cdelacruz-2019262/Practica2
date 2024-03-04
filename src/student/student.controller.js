import Student from '../student/student.model.js';
import Course from '../auth/course.model.js';

export const asignCourse = async (req, res) => {
    try { 
        const student = await Student.findById(req.user.id).populate('courses');
        
        if (student.courses.length >= 3) {
            return res.status(400).json({ message: 'Already assigned to the maximum number of courses.' });
        }

        if (student.courses.some(course => course._id.toString() === req.params.courseId)) {
            return res.status(400).json({ message: 'Already assigned to this course.' });
        }

        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        student.courses.push(course);
        await student.save();

        res.status(200).json({ message: 'Course assigned successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error assigning the course.' });
        console.log('Contenido de req.student:', req.student)
    }
};

// Controlador para ver los cursos disponibles
export const viewCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los cursos.' });
    }
};

export const editProfile = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedStudent = await Student.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        //Validar la actualización
        if (!updatedStudent) return res.status(401).send({ message: 'Student not found and not updated' })
        //Respondo al usuario
        return res.send({ message: 'Updated student', updatedStudent })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating account' })
    }
};

// Eliminar al estudiante
export const deleteStudent = async (req, res) => {
    try {
        //obtener id
        let { id } = req.params
        let deletedStudent = await Student.findOneAndDelete({ _id: id })
        //verificacion
        if (!deletedStudent) return res.status(404).send({ message: 'Student not found and not deleted' })
        return res.send({ message: `Student whit name ${deletedStudent.name} deleted successfully` })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: `error deleting Student` })
    }
}