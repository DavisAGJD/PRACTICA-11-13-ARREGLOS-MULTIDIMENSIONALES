import Calificaciones from "./Calificaciones.js";

// Inicializar la matriz de calificaciones
let matrizCalificaciones = [
    [5.5, 8.6, 10],
    [8.0, 5.5, 10],
    [9.0, 4.1, 7.8],
    [10, 2.2, 8.1],
    [7.0, 9.2, 7.1],
    [9.0, 4.0, 6.0],
    [6.5, 5.0, 5.0],
    [4.0, 7.0, 4.0],
    [8.0, 8.0, 9.0],
    [10, 9.0, 9.2],
    [5.0, 10, 8.4],
    [9.0, 4.6, 7.5]
];

// Crear una instancia de la clase Calificaciones
let calificaciones = new Calificaciones(matrizCalificaciones);

// Función para mostrar los resultados
document.getElementById('calcularBtn').addEventListener('click', () => {
    const promediosPorAlumno = calificaciones.calcularPromedioPorAlumno();
    const promedioMasAlto = calificaciones.obtenerPromedioMasAlto();
    const promedioMasBajo = calificaciones.obtenerPromedioMasBajo();
    const reprobados = calificaciones.contarReprobados();
    const distribucion = calificaciones.calcularDistribucion();

    const resultadosDiv = document.getElementById('output');
    resultadosDiv.innerHTML = `
        <p><strong>Promedios por Alumno:</strong> ${promediosPorAlumno.join(', ')}</p>
        <p><strong>Promedio más alto:</strong> ${promedioMasAlto}</p>
        <p><strong>Promedio más bajo:</strong> ${promedioMasBajo}</p>
        <p><strong>Parciales reprobados:</strong> ${reprobados}</p>
        <p><strong>Distribución de calificaciones:</strong></p>
        <ul>
            ${Object.entries(distribucion).map(([rango, cantidad]) => `<li>${rango}: ${cantidad} alumnos</li>`).join('')}
        </ul>
    `;
});

// Función para cargar la tabla de calificaciones
function cargarTabla() {
    const tbody = document.querySelector('#calificacionesTable tbody');
    tbody.innerHTML = '';  // Limpiar la tabla antes de cargar

    matrizCalificaciones.forEach((fila, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>Alumno ${i + 1}</td>` + fila.map(nota => `<td>${nota}</td>`).join('');
        tbody.appendChild(tr);
    });
}

// Función para habilitar la edición de las calificaciones
function habilitarEdicion() {
    const tbody = document.querySelector('#calificacionesTable tbody');
    tbody.innerHTML = '';  // Limpiar la tabla antes de cargar los inputs

    matrizCalificaciones.forEach((fila, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>Alumno ${i + 1}</td>` + fila.map((nota, j) => `<td><input type="number" value="${nota}" data-i="${i}" data-j="${j}" /></td>`).join('');
        tbody.appendChild(tr);
    });

    document.getElementById('guardarBtn').style.display = 'inline';
    document.getElementById('editarBtn').style.display = 'none';
}

// Función para guardar los cambios en las calificaciones
function guardarCambios() {
    const inputs = document.querySelectorAll('#calificacionesTable input');

    inputs.forEach(input => {
        const i = input.dataset.i;
        const j = input.dataset.j;
        matrizCalificaciones[i][j] = parseFloat(input.value);
    });

    // Actualizar la instancia de calificaciones con los nuevos valores
    calificaciones = new Calificaciones(matrizCalificaciones);

    // Volver a cargar la tabla con los nuevos valores
    cargarTabla();

    document.getElementById('guardarBtn').style.display = 'none';
    document.getElementById('editarBtn').style.display = 'inline';
}

// Cargar la tabla al inicio
window.onload = cargarTabla;

// Agregar eventos a los botones
document.getElementById('editarBtn').addEventListener('click', habilitarEdicion);
document.getElementById('guardarBtn').addEventListener('click', guardarCambios);