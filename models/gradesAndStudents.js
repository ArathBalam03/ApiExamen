const { DataTypes } = require('sequelize');
const sequelize = require('../db');
// const Student = require('./student');

const Grade = sequelize.define('Grade', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Student.hasMany(Grade);
Grade.belongsTo(Student);

module.exports = { Grade, Student };
