class Calificaciones {
    constructor(matrizCalificaciones) {
        this.matrizCalificaciones = matrizCalificaciones;
    }

    // a) Calcular el promedio de cada alumno
    calcularPromedioPorAlumno() {
        return this.matrizCalificaciones.map(fila => {
            const suma = fila.reduce((acum, nota) => acum + nota, 0);
            return (suma / fila.length).toFixed(2);
        });
    }

    // b) Obtener el promedio más alto
    obtenerPromedioMasAlto() {
        const promedios = this.calcularPromedioPorAlumno();
        return Math.max(...promedios);
    }

    // c) Obtener el promedio más bajo
    obtenerPromedioMasBajo() {
        const promedios = this.calcularPromedioPorAlumno();
        return Math.min(...promedios);
    }

    // d) Contar cuántos parciales fueron reprobados (menores a 7.0)
    contarReprobados() {
        let reprobados = 0;
        this.matrizCalificaciones.forEach(fila => {
            reprobados += fila.filter(nota => nota < 7.0).length;
        });
        return reprobados;
    }

    // e) Distribución de las calificaciones finales
    calcularDistribucion() {
        const promedios = this.calcularPromedioPorAlumno();
        const distribucion = {
            "0-4.9": 0,
            "5.0-5.9": 0,
            "6.0-6.9": 0,
            "7.0-7.9": 0,
            "8.0-8.9": 0,
            "9.0-10": 0
        };

        promedios.forEach(promedio => {
            if (promedio < 5.0) distribucion["0-4.9"]++;
            else if (promedio < 6.0) distribucion["5.0-5.9"]++;
            else if (promedio < 7.0) distribucion["6.0-6.9"]++;
            else if (promedio < 8.0) distribucion["7.0-7.9"]++;
            else if (promedio < 9.0) distribucion["8.0-8.9"]++;
            else distribucion["9.0-10"]++;
        });

        return distribucion;
    }
}

export default Calificaciones;