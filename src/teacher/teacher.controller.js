import Course from '../auth/course.model.js';
import Student from '../student/student.model.js';
import Teacher from './teacher.model.js';

//Crear un nuevo curso
export const createCourse = async (req, res) => {
    try {
        //Crear un nuevo curso
        /*const newCourse = await Course.create({
            name: req.body.name,
            description: req.body.description,
            teacher: req.user.id
        });*/
        let data = req.body
        let course = new Course(data)
        await course.save()
        res.status(201).send({ message: `Curso creado exitosamente` });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creando curso' });
    }
};

//editar curso
export const editCourse = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedCourse = await Course.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedCourse) return res.status(401).send({ message: 'Course not found and not updated' })
        return res.send({ message: 'Updated course', updatedCourse})
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error al actualizar el curso' })
    }
}

//Eliminar un curso
export const erase = async (req, res) => {
    try {
        //obtener id
        let { id } = req.params
        let deletedCourse = await Course.findOneAndDelete({ _id: id })
        //verificacion
        if (!deletedCourse) return res.status(404).send({ message: 'Course not found and not deleted' })
        return res.send({ message: `Course whit name ${deletedCourse.name} deleted successfully` })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: `error deleting Course` })
    }
}


//obtener los cursos asociados a un maestro
export const getCoursesForTeacher = async (req, res) => {
    try {
        let { search } = req.body
        let teacher = await Course.find(
            {name: search} 
        )
        if(!teacher) return res.status(404).send({message: 'Courses found', course})

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error.' });
    }
};