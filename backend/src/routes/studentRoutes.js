import { Router } from 'express';
import {
  createStudent,
  listStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';
import { validateStudentCreate, validateStudentUpdate } from '../middlewares/validateStudent.js';

const router = Router();

router.post('/', validateStudentCreate, createStudent);
router.get('/', listStudents);
router.get('/:id', getStudentById);
router.put('/:id', validateStudentUpdate, updateStudent);
router.delete('/:id', deleteStudent);

export default router;


