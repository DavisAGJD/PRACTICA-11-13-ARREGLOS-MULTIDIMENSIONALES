import Ventas from './ventas.js';

// Referencias a los nombres de los días y meses
const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre"];

// Inicializar la matriz de ventas (añadiendo los valores de sábado y domingo)
let matrizVentas = [
    [5, 16, 10, 12, 24, 30, 20],
    [40, 55, 10, 11, 18, 25, 35],
    [15, 41, 78, 14, 51, 62, 17],
    [35, 22, 81, 15, 12, 29, 9],
    [50, 12, 71, 10, 20, 33, 44],
    [70, 60, 50, 36, 25, 40, 55],
    [50, 70, 40, 11, 18, 32, 21],
    [20, 40, 32, 13, 20, 19, 8],
    [50, 3, 24, 15, 82, 17, 26],
    [40, 46, 15, 46, 22, 28, 33]
];

// Crear una instancia de la clase Ventas
let ventas = new Ventas(matrizVentas, meses, diasSemana);

// Función para cargar la matriz de ventas en la tabla HTML
function cargarMatrizVentas() {
    const tbody = document.querySelector('#salesTable tbody');
    tbody.innerHTML = '';  // Limpiar la tabla si ya tiene contenido

    matrizVentas.forEach((fila, i) => {
        const tr = document.createElement('tr');
        const mesTd = document.createElement('td');
        mesTd.textContent = meses[i]; // Agregar el nombre del mes
        tr.appendChild(mesTd);

        fila.forEach((venta, j) => {
            const td = document.createElement('td');
            td.textContent = venta;
            td.setAttribute('data-i', i);
            td.setAttribute('data-j', j);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// Función para habilitar la edición de la tabla
function habilitarEdicion() {
    const tbody = document.querySelector('#salesTable tbody');
    tbody.innerHTML = '';

    matrizVentas.forEach((fila, i) => {
        const tr = document.createElement('tr');
        const mesTd = document.createElement('td');
        mesTd.textContent = meses[i];
        tr.appendChild(mesTd);

        fila.forEach((venta, j) => {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.value = venta;
            input.dataset.i = i;
            input.dataset.j = j;

            td.appendChild(input);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    const agregarVentasBtn = document.getElementById('agregarVentasBtn');
    agregarVentasBtn.textContent = 'Guardar Cambios';
    agregarVentasBtn.removeEventListener('click', habilitarEdicion);
    agregarVentasBtn.addEventListener('click', guardarCambios);
}

// Función para guardar los nuevos valores
function guardarCambios() {
    const inputs = document.querySelectorAll('#salesTable input');

    inputs.forEach(input => {
        const i = input.dataset.i;
        const j = input.dataset.j;
        matrizVentas[i][j] = parseInt(input.value);
    });

    ventas = new Ventas(matrizVentas, meses, diasSemana); // Actualizar la instancia de Ventas

    cargarMatrizVentas(); // Recargar la tabla con los nuevos valores

    const agregarVentasBtn = document.getElementById('agregarVentasBtn');
    agregarVentasBtn.textContent = 'Agregar Ventas';
    agregarVentasBtn.removeEventListener('click', guardarCambios);
    agregarVentasBtn.addEventListener('click', habilitarEdicion);
}

// Ejecutar al cargar la página
window.onload = function () {
    cargarMatrizVentas();
};

// Agregar eventos a los botones
document.getElementById('minSaleBtn').addEventListener('click', () => {
    const resultado = ventas.encontrarVentaMinima();
    document.getElementById('output').innerHTML = resultado;
});

document.getElementById('maxSaleBtn').addEventListener('click', () => {
    const resultado = ventas.encontrarVentaMaxima();
    document.getElementById('output').innerHTML = resultado;
});

document.getElementById('totalSaleBtn').addEventListener('click', () => {
    const resultado = ventas.calcularVentaTotal();
    document.getElementById('output').innerHTML = resultado;
});

document.getElementById('daySalesBtn').addEventListener('click', () => {
    const resultado = ventas.calcularVentaPorDia();
    document.getElementById('output').innerHTML = resultado;
});

document.getElementById('agregarVentasBtn').addEventListener('click', habilitarEdicion);
