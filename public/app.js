// Modal de Listalm
const openStudentModalButton = document.querySelector('.custom-button');
const studentModal = document.getElementById('studentModal');
const closeStudentModalButton = document.querySelector('.close');


openStudentModalButton.addEventListener('click', function() {
    studentModal.style.display = 'block';

    
    fetch('http://localhost:3000/api/students')
        .then(response => response.json())
        .then(data => {
            console.log('Lista de estudiantes:', data);

            const studentListContainer = document.getElementById('studentList');
            studentListContainer.innerHTML = '';

            data.forEach(student => {
                const studentDiv = document.createElement('div');
                studentDiv.textContent = `ID: ${student.id}, Nombre: ${student.name}`;
                studentListContainer.appendChild(studentDiv);
            });
        })
        .catch(error => console.error('Error al obtener estudiantes:', error));
});


closeStudentModalButton.addEventListener('click', function() {
    studentModal.style.display = 'none';
});


window.addEventListener('click', function(event) {
    if (event.target === studentModal) {
        studentModal.style.display = 'none';
    }
});



//calificaciones del estudiante
async function obtenerCalificaciones(studentId) {
    try {
      const response = await fetch(`http://localhost:3000/api/students/${studentId}/grades`);
      if (response.ok) {
        const calificaciones = await response.json();
        return calificaciones;
      } else {
        console.error('Error al obtener calificaciones:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error de red:', error);
      return [];
    }
  }
  
  async function abrirModal() {
    const studentId = document.getElementById('studentIdInput').value;
    const calificaciones = await obtenerCalificaciones(studentId);
  
    if (calificaciones.length > 0) {
      document.getElementById('modal').style.display = 'block';
      const calificacionesDiv = document.getElementById('calificaciones');
      calificacionesDiv.innerHTML = '';
  
      calificaciones.forEach(calificacion => {
        const p = document.createElement('p');
        p.textContent = `Materia: ${calificacion.courseId} - Calificación: ${calificacion.score}`;
        calificacionesDiv.appendChild(p);
      });
    } else {
      alert('El estudiante no ha sido encontrado o no tiene calificaciones.');
    }
  }
  
  function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
  }
  
  const section3Button = document.querySelector('#section3 .custom-button');
  const section4Button = document.querySelector('#section4 .custom-button');
  const section5Button = document.querySelector('#section5 .custom-button');

  // Obtener y mostrar la lista de estudiantes
  

  // Obtener y mostrar las calificaciones de un estudiante
 

  // Añadir un nuevo estudiante
  section3Button.addEventListener('click', function() {
      const newStudentName = document.querySelector('#section3 input').value;
      fetch('http://localhost:3000/api/students', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newStudentName })
      })
      .then(response => response.json())
      .then(data => {
          alert('Estudiante añadido:', data);
          // Aquí podrías mostrar un mensaje de éxito o actualizar la lista de estudiantes en la interfaz
      })
      .catch(error => alert('Error al añadir estudiante:', error));
  });
  // Actualizar un estudiante
section4Button.addEventListener('click', function() {
    const studentId = document.querySelector('#section4 input[type="text"]:nth-of-type(1)').value;
    const updatedName = document.querySelector('#section4 input[type="text"]:nth-of-type(2)').value;

    fetch(`http://localhost:3000/api/students/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: updatedName })
    })
    .then(response => response.json())
    .then(data => {
        alert('Estudiante actualizado:', data);
        // Aquí podrías mostrar un mensaje de éxito o actualizar la información del estudiante en la interfaz
    })
    .catch(error => alert('Error al actualizar estudiante:', error));
});

// Eliminar un estudiante
section5Button.addEventListener('click', function() {
    const studentId = document.querySelector('#section5 input[type="text"]').value;

    fetch(`http://localhost:3000/api/students/${studentId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 200) {
            alert('Estudiante eliminado');
            // Aquí podrías mostrar un mensaje de éxito o actualizar la lista de estudiantes en la interfaz
        } else if (response.status === 404) {
            alert('Estudiante no encontrado');
            // Mostrar mensaje de error: 'Estudiante no encontrado'
        } else {
            alert('Error al eliminar estudiante');
            // Mostrar mensaje de error general
        }
    })
    .catch(error => alert('Error al eliminar estudiante:', error));
});


