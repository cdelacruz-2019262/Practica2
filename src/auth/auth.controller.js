import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../student/student.model.js';
import Teacher from '../teacher/teacher.model.js';

//función para generar un token de autenticación
const generateAuthToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET);
};

//registrar usuario
export const registerStudent = async (req, res) => {
    try {
        let { username, password, name, surname, email } = req.body;
        // Verificar si el nombre de usuario ya existe para estudiantes
        let existingStudent = await Student.findOne({ username });
        if (existingStudent) {
            return res.status(400).send({ message: 'Username already exists' });
        }

        // Verificar si el nombre de usuario ya existe para maestros
        let existingTeacher = await Teacher.findOne({ username });
        if (existingTeacher) {
            return res.status(400).send({ message: 'Username already exists' });
        }
        // Registro de estudiante
        let hashedPassword = await bcrypt.hash(password, 10);
        let student = new Student({ username, password: hashedPassword, name, surname, email });
        await student.save();
        let token = generateAuthToken(student._id, 'STUDENT');
        return res.send({ message: `Registered successfully, can be logged with username ${student.username}`, token });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error registering' });
    }
};
//registrar maestro
export const registerTeacher = async (req, res) => {
    try {
        let { username, email, password, name, surname } = req.body;
        let existingStudent = await Student.findOne({ username });
        if (existingStudent) {
            return res.status(400).send({ message: 'username already exists in Student' });
        }

        let existingTeacher = await Teacher.findOne({ username });
        if (existingTeacher) {
            return res.status(400).send({ message: 'username already exists in Teacher' });
        }
        
        let hashedPassword = await bcrypt.hash(password, 10);
        let teacher = new Teacher({ username, email, password: hashedPassword, name, surname });
        await teacher.save();
        let token = generateAuthToken(teacher._id, 'TEACHER');
        return res.send({ message: `Registered successfully as teacher, can be logged with username ${teacher.username}`, token });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error registering teacher' });
    }
};


//inicio de sesion
export const login = async (req, res) => {
    try {
        //capturar los datos del formulario
        let { username, password } = req.body;

        // Buscar al usuario en la base de datos (puede ser maestro o estudiante)
        let user = await Teacher.findOne({ username }) || await Student.findOne({ username });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Verificar la contraseña
        let isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Determinar el rol del usuario
        let role = user instanceof Teacher ? 'TEACHER' : 'STUDENT';

        // Generar token de autenticación
        let token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);

        // Responder con un mensaje de éxito y el token
        res.json({ message: `Login successful, welcome ${username}`, token, role });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};
