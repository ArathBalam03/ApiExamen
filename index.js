const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const studentController = require('./controllers/studentController');

const app = express();


app.use(cors()); 
app.use(express.json());


// Rutas
app.use(studentController);

// Ruta para la URL base
app.use(express.static('public'));

// Sincronización de la base de datos y luego iniciar el servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
    
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar modelos:', err);
  });
