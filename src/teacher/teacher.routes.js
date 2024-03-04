import express from 'express';
import { createCourse, editCourse, erase, getCoursesForTeacher } from './teacher.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const router = express.Router();

router.post('/createCourse', [ validateJwt ],  createCourse);

router.put('/update/:id', [ validateJwt ], editCourse);

router.delete('/deleteCourse/:id', [ validateJwt ], erase);

router.post('/ViewCourses', [ validateJwt ], getCoursesForTeacher)

export default router;
