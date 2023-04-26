class Avion {
    #numeroAsientos;
    #capacidadMaxima = 180;

    constructor() {
        this.#numeroAsientos = this.#capacidadMaxima;
    }

    venderBilletes(billetes) {
        if (this.#numeroAsientos - billetes >= 0) {
            this.#numeroAsientos = this.#numeroAsientos - billetes;
        }
        else {
            throw new Error("No hay tantos billetes disponibles");
        }
    }

    devuelveBilletes(billetes) {
        if (this.#numeroAsientos + billetes <= this.#capacidadMaxima) {
            this.#numeroAsientos = this.#numeroAsientos + billetes;
        }
        else {
            throw new Error("No hay tantos billetes para devolver");
        }
    }

    cuantosAsientosQuedan() {
        return this.#numeroAsientos;
    }

}

export const miAvion = new Avion();