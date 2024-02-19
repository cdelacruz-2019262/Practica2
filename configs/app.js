import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from '../src/auth/auth.routes.js';
import teacherRoutes from '../src/teacher/teacher.routes.js';
import studentRoutes from '../src/student/student.routes.js'
import { connectDB } from './mongo.js';
import { validateJwt, errorHandler } from '../src/middlewares/validate-jwt.js';

// conexiones
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2056;

connectDB();

// Configurar middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Definir rutas
app.use('/auth', authRoutes);
app.use('/courses', teacherRoutes);
app.use('/student', studentRoutes);


// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Welcome to School Management System');
});

app.use(validateJwt);

app.use(errorHandler);


// Exportar la aplicación Express configurada
export default app;

