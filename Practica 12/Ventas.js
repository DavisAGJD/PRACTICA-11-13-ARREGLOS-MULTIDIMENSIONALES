class Ventas {
    constructor(matriz, meses, dias) {
        this.matriz = matriz;
        this.meses = meses;
        this.dias = dias;
    }

    // a) Encontrar la venta mínima
    encontrarVentaMinima() {
        let min = this.matriz[0][0];
        let mes = 0, dia = 0;

        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                if (this.matriz[i][j] < min) {
                    min = this.matriz[i][j];
                    mes = i;
                    dia = j;
                }
            }
        }
        return `Venta mínima: $${min}. Mes: ${this.meses[mes]}, Día: ${this.dias[dia]}`;
    }

    // b) Encontrar la venta máxima
    encontrarVentaMaxima() {
        let max = this.matriz[0][0];
        let mes = 0, dia = 0;

        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                if (this.matriz[i][j] > max) {
                    max = this.matriz[i][j];
                    mes = i;
                    dia = j;
                }
            }
        }
        return `Venta máxima: $${max}. Mes: ${this.meses[mes]}, Día: ${this.dias[dia]}`;
    }

    // c) Calcular la venta total
    calcularVentaTotal() {
        let total = 0;

        for (let i = 0; i < this.matriz.length; i++) {
            total += this.matriz[i].reduce((a, b) => a + b, 0);
        }
        return `Venta total: $${total}`;
    }

    // d) Venta por día (Lunes - Domingo)
    calcularVentaPorDia() {
        let ventasPorDia = new Array(7).fill(0);

        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                ventasPorDia[j] += this.matriz[i][j];
            }
        }

        let resultado = "";
        for (let i = 0; i < this.dias.length; i++) {
            resultado += `${this.dias[i]}: $${ventasPorDia[i]}.00<br>`;
        }
        return resultado;
    }
}

export default Ventas;
