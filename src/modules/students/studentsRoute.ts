import express from 'express'
import { studentsControllers } from './studentsController'

const router = express.Router()

router.post('/create-student', studentsControllers.createStudents)

router.get('/', studentsControllers.getAllStudents)

router.get('/:studentId', studentsControllers.getSingleStudents)

router.delete('/:studentId', studentsControllers.deleteAStudent)

export const studentsRoutes = router;