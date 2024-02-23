import mongoose from 'mongoose';

// Definir el esquema para el modelo de maestro
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    ],
    role: {
        type: String,
        default: "Teacher"
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;