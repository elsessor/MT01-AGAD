import {
  readAllStudents,
  writeAllStudents
} from '../datastore/studentStore.js';
import { v4 as uuidv4 } from 'uuid';

export async function createStudent(req, res, next) {
  try {
    const students = await readAllStudents();
    const newStudent = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    };
    students.push(newStudent);
    await writeAllStudents(students);
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
}

export async function listStudents(req, res, next) {
  try {
    const students = await readAllStudents();
    res.json(students);
  } catch (err) {
    next(err);
  }
}

export async function getStudentById(req, res, next) {
  try {
    const students = await readAllStudents();
    const student = students.find(s => s.id === req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
}

export async function updateStudent(req, res, next) {
  try {
    const students = await readAllStudents();
    const index = students.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const existing = students[index];
    const updated = {
      ...existing,
      name: req.body.name ?? existing.name,
      email: req.body.email ?? existing.email,
      age: req.body.age ?? existing.age
    };
    students[index] = updated;
    await writeAllStudents(students);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const students = await readAllStudents();
    const index = students.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const [removed] = students.splice(index, 1);
    await writeAllStudents(students);
    res.json({ deleted: removed.id });
  } catch (err) {
    next(err);
  }
}