import express from 'express';
import { createCourse, editCourse, deleteCourse, getCoursesForTeacher } from './teacher.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const router = express.Router();

router.post('/createCourse',  createCourse);

router.put('/editCourse/:id', [ validateJwt ], editCourse);

router.delete('/deleteCourse/:id', [ validateJwt ], deleteCourse);

router.get('/ViewCourses', [ validateJwt ], getCoursesForTeacher)

export default router;
