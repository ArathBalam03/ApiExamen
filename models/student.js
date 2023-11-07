// student.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Grade = require("./grade");

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

module.exports = Student;
