const express = require('express');
const router = express.Router();

const { Grade, Student } = require('../models/gradesAndStudents');
// Obtener todos los estudiantes
router.get('/api/students', async (req, res) => {
  try {
    const students = await Student.findAll({ include: Grade });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/api/students/:id/grades', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: Grade });
    if (student) {
      res.json(student.Grades);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Añadir un nuevo estudiante
router.post('/api/students', async (req, res) => {
  try {
    const { name, grades } = req.body;
    const newStudent = await Student.create({ name, Grades: grades });
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un estudiante existente
router.put('/api/students/:id', async (req, res) => {
  try {
    const { name, grades } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update({ name });
      if (grades) {
        await Grade.destroy({ where: { StudentId: req.params.id } });
        await Grade.bulkCreate(grades.map(grade => ({ ...grade, StudentId: req.params.id })));
      }
      res.json(await Student.findByPk(req.params.id, { include: Grade }));
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un estudiante por su ID
router.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.json({ message: 'Student deleted' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
