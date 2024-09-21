import Matriz from "./Matriz.js";

const practica11 = document.querySelector('.practica-11')


const matriz = new Matriz(5,10)
// Funciones para los botones


document.getElementById('generar-matriz').addEventListener('click', () => {
    matriz.generarMatrizAleatoria();
});

document.getElementById('insertar-matriz').addEventListener('click', () => {
    matriz.generarTablaConInputs();
});

document.getElementById('calculateBtn').addEventListener('click', () => {
    matriz.calcularDesdeInputs();
});