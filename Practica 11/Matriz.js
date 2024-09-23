class Matriz {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.matriz = [];
    }

    generarMatrizAleatoria() {
        this.matriz = [];
        for (let i = 0; i < this.filas; i++) {
            let fila = [];
            for (let j = 0; j < this.columnas; j++) {
                fila.push(Math.floor(Math.random() * 10) + 1); // Genera números entre 1 y 10
            }
            this.matriz.push(fila);
        }
        this.mostrarMatriz();
        this.mostrarResultados();
    }

    generarTablaConInputs() {
        const matrixTable = document.getElementById("matrix");
        matrixTable.innerHTML = "";

        for (let i = 0; i < this.filas; i++) {
            let filaHtml = "<tr>";
            for (let j = 0; j < this.columnas; j++) {
                filaHtml += `<td><input type="number" id="input-${i}-${j}" value="0" /></td>`;
            }
            filaHtml += "</tr>";
            matrixTable.innerHTML += filaHtml;
        }
        document.getElementById('calculateBtn').style.display = 'block';
    }

    obtenerValoresDesdeInputs() {
        this.matriz = [];
        for (let i = 0; i < this.filas; i++) {
            let fila = [];
            for (let j = 0; j < this.columnas; j++) {
                const valor = document.getElementById(`input-${i}-${j}`).value;
                fila.push(parseInt(valor)); 
            }
            this.matriz.push(fila);  
        }
    }
    

    // Recursivo: Calcular suma y promedio de una fila
    calcularSumaPromedioFilaRecursivo(fila, index = 0, suma = 0) {
        if (index >= fila.length) return { suma, promedio: suma / fila.length };  // Caso base.

        return this.calcularSumaPromedioFilaRecursivo(fila, index + 1, suma + fila[index]);  // Llamada recursiva.
    }

    // Recursivo: Calcular suma y promedio de filas
    calcularSumaPromedioFilas(fila = 0, sumaFilas = [], promedioFilas = []) {
        if (fila >= this.filas) return { sumaFilas, promedioFilas };  // Caso base.

        const { suma, promedio } = this.calcularSumaPromedioFilaRecursivo(this.matriz[fila]);
        sumaFilas.push(suma);
        promedioFilas.push(promedio);

        return this.calcularSumaPromedioFilas(fila + 1, sumaFilas, promedioFilas);  // Llamada recursiva.
    }

    // Recursivo: Calcular suma y promedio de una columna
    calcularSumaPromedioColumnas(columna = 0, sumaColumnas = new Array(this.columnas).fill(0)) {
        if (columna >= this.columnas) {
            const promedioColumnas = sumaColumnas.map(suma => suma / this.filas);
            return { sumaColumnas, promedioColumnas };  // Caso base.
        }

        this.matriz.forEach(fila => sumaColumnas[columna] += fila[columna]);

        return this.calcularSumaPromedioColumnas(columna + 1, sumaColumnas);  // Llamada recursiva.
    }

    mostrarMatriz() {
        const matrixTable = document.getElementById("matrix");
        matrixTable.innerHTML = "";

        this.matriz.forEach(fila => {
            let filaHtml = "<tr>";
            fila.forEach(num => {
                filaHtml += `<td>${num}</td>`;
            });
            filaHtml += "</tr>";
            matrixTable.innerHTML += filaHtml;
        });
    }

    mostrarResultados() {
        const { sumaFilas, promedioFilas } = this.calcularSumaPromedioFilas();
        const { sumaColumnas, promedioColumnas } = this.calcularSumaPromedioColumnas();
    
        // Limpiar los resultados anteriores
        const sumRowsEl = document.getElementById("sumrows");
        const avgRowsEl = document.getElementById("avgrows");
        const sumColsEl = document.getElementById("sumcols");
        const avgColsEl = document.getElementById("avgcols");
        
        sumRowsEl.innerHTML = "";
        avgRowsEl.innerHTML = "";
        sumColsEl.innerHTML = "";
        avgColsEl.innerHTML = "";
    
        // Mostrar sumas y promedios de filas de forma vertical
        for (let i = 0; i < sumaFilas.length; i++) {
            sumRowsEl.innerHTML += `<div>${sumaFilas[i]}</div>`;
            avgRowsEl.innerHTML += `<div>${promedioFilas[i].toFixed(2)}</div>`;
        }
    
        // Mostrar sumas y promedios de columnas de forma vertical
        for (let i = 0; i < sumaColumnas.length; i++) {
            sumColsEl.innerHTML += `<div>${sumaColumnas[i]}</div>`;
            avgColsEl.innerHTML += `<div>${promedioColumnas[i].toFixed(2)}</div>`;
        }
    }

    calcularDesdeInputs() {
        this.obtenerValoresDesdeInputs();  // Recursivo
        this.mostrarResultados();
    }
}

export default Matriz;
