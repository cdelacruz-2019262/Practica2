import express from 'express';
import { asignCourse, viewCourses, editProfile, deleteProfile } from '../student/student.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const router = express.Router();

router.post('/courses/:courseId/assign', [ validateJwt ], asignCourse);
router.get('/courses', [ validateJwt ], viewCourses);
router.put('/profile', [ validateJwt ], editProfile);
router.delete('/deleteProfile/:id', [ validateJwt ], deleteProfile);

export default router;